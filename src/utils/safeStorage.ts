/**
 * Safe Storage & IndexedDB persistence layer for Gadget Hub BD.
 * Prevents QuotaExceededError by gracefully falling back to IndexedDB
 * and stripping heavy base64 payloads from localStorage caches.
 */

const DB_NAME = 'GHM_STORE_DB';
const DB_VERSION = 1;
const STORE_NAME = 'keyval';

let dbPromise: Promise<IDBDatabase> | null = null;

function getIDB(): Promise<IDBDatabase> {
  if (typeof window === 'undefined' || !window.indexedDB) {
    return Promise.reject(new Error('IndexedDB not available'));
  }
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      try {
        const req = window.indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = () => {
          const db = req.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME);
          }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      } catch (err) {
        reject(err);
      }
    });
  }
  return dbPromise;
}

export async function idbGet<T = any>(key: string): Promise<T | null> {
  try {
    const db = await getIDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function idbSet(key: string, value: any): Promise<void> {
  try {
    const db = await getIDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('[IndexedDB] set error:', err);
  }
}

export async function idbDelete(key: string): Promise<void> {
  try {
    const db = await getIDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('[IndexedDB] delete error:', err);
  }
}

/**
 * Creates a lightweight version of products suitable for localStorage without blowing quota.
 * Trims oversized base64 images that exceed ~1KB, replacing them with a safe placeholder
 * or keeping external URLs.
 */
function createCompactProducts(prods: any[]): any[] {
  if (!Array.isArray(prods)) return prods;
  return prods.map((p) => {
    if (!p || typeof p !== 'object') return p;
    const cloned = { ...p };

    // Optimize primary image
    if (typeof cloned.image === 'string' && cloned.image.startsWith('data:') && cloned.image.length > 2000) {
      cloned.image = 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80';
    }

    // Optimize images array
    if (Array.isArray(cloned.images)) {
      cloned.images = cloned.images.map((img: string) => {
        if (typeof img === 'string' && img.startsWith('data:') && img.length > 2000) {
          return cloned.image || 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80';
        }
        return img;
      });
    }

    return cloned;
  });
}

/**
 * Safe localStorage wrapper that guarantees operations will not crash due to QuotaExceededError.
 * It also mirrors writes to IndexedDB for persistent large storage.
 */
export const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window === 'undefined') return null;
      return window.localStorage.getItem(key);
    } catch (e) {
      console.warn(`[safeStorage] getItem failed for key "${key}":`, e);
      return null;
    }
  },

  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;

    // Async backup to IndexedDB (virtually unlimited capacity)
    try {
      const parsed = JSON.parse(value);
      idbSet(key, parsed).catch(() => {});
    } catch {
      idbSet(key, value).catch(() => {});
    }

    try {
      window.localStorage.setItem(key, value);
    } catch (err: any) {
      console.warn(`[safeStorage] localStorage quota exceeded for key "${key}", applying compaction...`);

      // Handle products specifically by stripping oversized base64
      if (key === 'ghm_products') {
        try {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) {
            const compact = createCompactProducts(parsed);
            window.localStorage.setItem(key, JSON.stringify(compact));
            console.info(`[safeStorage] Compacted ${parsed.length} products saved to localStorage successfully.`);
            return;
          }
        } catch (innerErr) {
          console.warn('[safeStorage] Compact products fallback failed:', innerErr);
        }
      }

      // Handle banners or categories if they have oversized base64
      if (key === 'ghm_categories' || key === 'ghm_banners') {
        try {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) {
            const compact = parsed.map((item: any) => {
              if (item.imageUrl && item.imageUrl.startsWith('data:') && item.imageUrl.length > 2000) {
                return {
                  ...item,
                  imageUrl: '/og-image.jpeg'
                };
              }
              return item;
            });
            window.localStorage.setItem(key, JSON.stringify(compact));
            return;
          }
        } catch (e) {
          // ignore
        }
      }

      // If still failing, clean up non-critical cache keys to free up quota
      try {
        const nonCriticalKeys = ['ghm_cart', 'ghm_incomplete_orders', 'ghm_subscribers'];
        for (const k of nonCriticalKeys) {
          if (k !== key) {
            window.localStorage.removeItem(k);
          }
        }
        window.localStorage.setItem(key, value);
      } catch {
        console.warn(`[safeStorage] Unable to save to localStorage for key "${key}". Preserved in IndexedDB.`);
      }
    }
  },

  removeItem: (key: string): void => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(key);
    } catch (e) {}
    idbDelete(key).catch(() => {});
  }
};

/**
 * Resizes and compresses an image File or blob into an optimized JPEG Data URL.
 * Reduces 5-10MB mobile photos to ~40-80KB for super fast loading and low storage footprint.
 */
export function compressImage(
  file: File | Blob,
  maxDimension = 1000,
  quality = 0.75
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image element'));
      img.onload = () => {
        try {
          let { width, height } = img;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(reader.result as string);
            return;
          }

          // Use white background for transparent images when converting to JPEG
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          const compressed = canvas.toDataURL('image/jpeg', quality);
          resolve(compressed);
        } catch {
          resolve(reader.result as string);
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
