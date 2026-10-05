import { safeStorage } from './safeStorage';
import { Product } from '../types';
import { getProductSlug, slugify } from './slug';

export interface ShortLinkItem {
  code: string;           // e.g. "airpods"
  targetPath: string;     // e.g. "/p/airpods-pro-2nd-gen" or product slug
  title?: string;         // e.g. "AirPods Pro 2nd Gen Short Link"
  clicks?: number;
  createdAt?: string;
}

const STORAGE_KEY = 'ghm_short_links';
export const CUSTOM_DOMAIN_STORAGE_KEY = 'ghm_custom_short_domain';
export const DEFAULT_SHORT_DOMAIN = 'https://gadgethubmart.com';

/**
 * Normalizes a domain by adding https if missing and stripping trailing slashes.
 */
export function normalizeDomain(domain: string): string {
  if (!domain) return '';
  let d = domain.trim();
  if (!d.startsWith('http://') && !d.startsWith('https://')) {
    d = `https://${d}`;
  }
  return d.replace(/\/+$/, '');
}

/**
 * Returns user-saved custom domain from safeStorage, if any.
 */
export function getSavedCustomDomain(): string {
  try {
    const raw = safeStorage.getItem(CUSTOM_DOMAIN_STORAGE_KEY);
    if (raw && raw.trim()) return raw.trim();
  } catch (e) {}
  return '';
}

/**
 * Saves custom short domain to safeStorage.
 */
export function setSavedCustomDomain(domain: string): void {
  try {
    const trimmed = domain.trim();
    if (!trimmed) {
      safeStorage.removeItem(CUSTOM_DOMAIN_STORAGE_KEY);
    } else {
      safeStorage.setItem(CUSTOM_DOMAIN_STORAGE_KEY, normalizeDomain(trimmed));
    }
  } catch (e) {}
}

/**
 * Returns the effective base domain for generating short links and canonical product URLs.
 * Priority:
 * 1. Saved custom domain in Admin Panel
 * 2. If running directly on gadgethubmart.com or production domain
 * 3. VITE_SHORT_DOMAIN or SHORT_DOMAIN environment variable
 * 4. Default official domain (https://gadgethubmart.com)
 */
export function getEffectiveShortDomain(): string {
  // 1. Saved custom domain from Admin Panel
  const saved = getSavedCustomDomain();
  if (saved) return normalizeDomain(saved);

  // 2. Running directly on custom domain
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    if (window.location.hostname.includes('gadgethubmart.com')) {
      return 'https://gadgethubmart.com';
    }
  }

  // 3. Vite environment variable
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      const envVal = import.meta.env.VITE_SHORT_DOMAIN || (import.meta.env as any).SHORT_DOMAIN;
      if (envVal && typeof envVal === 'string' && envVal.trim()) {
        return normalizeDomain(envVal.trim());
      }
    }
  } catch (e) {}

  // 4. Default official domain
  return DEFAULT_SHORT_DOMAIN;
}

/**
 * Builds a clean, single-line marketing short URL (e.g. https://gadget-hub-mart.mrmiahctg07.workers.dev/s/airpods).
 */
export function buildShortUrl(code: string, overrideDomain?: string): string {
  const base = overrideDomain ? normalizeDomain(overrideDomain) : getEffectiveShortDomain();
  const cleanCode = slugify(code);
  return `${base}/s/${cleanCode}`;
}

/**
 * Builds a clean, single-line canonical product URL strictly under https://gadgethubmart.com/p/:slug
 */
export function buildCanonicalProductUrl(slug: string, overrideDomain?: string): string {
  const base = overrideDomain ? normalizeDomain(overrideDomain) : 'https://gadgethubmart.com';
  const cleanSlug = slugify(slug);
  return `${base}/p/${cleanSlug}`;
}

// Initial short links defaults to empty so only user-created links exist
const INITIAL_SHORT_LINKS: ShortLinkItem[] = [];

/**
 * Retrieves all registered short links from safeStorage.
 */
export function getShortLinks(): ShortLinkItem[] {
  try {
    const raw = safeStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    // fallback
  }
  return INITIAL_SHORT_LINKS;
}

/**
 * Completely clears all registered short links.
 */
export function clearAllShortLinks(): ShortLinkItem[] {
  safeStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  return [];
}

/**
 * Saves or updates a short link.
 */
export function saveShortLink(item: Omit<ShortLinkItem, 'clicks' | 'createdAt'> & { clicks?: number; createdAt?: string }): ShortLinkItem[] {
  const current = getShortLinks();
  const cleanCode = slugify(item.code);
  let cleanTarget = item.targetPath.trim();
  if (!cleanTarget.startsWith('/')) {
    cleanTarget = `/${cleanTarget}`;
  }

  const existingIdx = current.findIndex(s => s.code.toLowerCase() === cleanCode.toLowerCase());
  const updatedItem: ShortLinkItem = {
    code: cleanCode,
    targetPath: cleanTarget,
    title: item.title || `${cleanCode} Marketing Link`,
    clicks: existingIdx >= 0 ? current[existingIdx].clicks : 0,
    createdAt: existingIdx >= 0 ? current[existingIdx].createdAt : new Date().toISOString().slice(0, 10)
  };

  let nextList: ShortLinkItem[];
  if (existingIdx >= 0) {
    nextList = [...current];
    nextList[existingIdx] = updatedItem;
  } else {
    nextList = [updatedItem, ...current];
  }

  safeStorage.setItem(STORAGE_KEY, JSON.stringify(nextList));
  return nextList;
}

/**
 * Deletes a short link by its code.
 */
export function deleteShortLink(code: string): ShortLinkItem[] {
  const current = getShortLinks();
  const nextList = current.filter(s => s.code.toLowerCase() !== code.toLowerCase().trim());
  safeStorage.setItem(STORAGE_KEY, JSON.stringify(nextList));
  return nextList;
}

/**
 * Increments click count for a short link.
 */
export function incrementShortLinkClick(code: string): void {
  try {
    const current = getShortLinks();
    const item = current.find(s => s.code.toLowerCase() === code.toLowerCase().trim());
    if (item) {
      item.clicks = (item.clicks || 0) + 1;
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    }
  } catch (e) {
    // Ignore
  }
}

/**
 * Resolves a short link code (e.g. "airpods") to its destination path.
 * ONLY resolves links that are explicitly registered/created.
 * Does NOT auto-generate or match unselected products in bulk.
 */
export function resolveShortLink(rawCode: string, _products?: Product[]): string | null {
  if (!rawCode) return null;
  const cleanCode = slugify(rawCode);

  // Check ONLY explicitly registered short links
  const registered = getShortLinks();
  const match = registered.find(s => s.code.toLowerCase() === cleanCode.toLowerCase());
  if (match) {
    incrementShortLinkClick(match.code);
    return match.targetPath;
  }

  return null;
}
