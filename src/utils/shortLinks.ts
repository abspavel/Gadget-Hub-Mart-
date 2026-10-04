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
export const DEFAULT_SHORT_DOMAIN = 'https://gadget-hub-mart.mrmiahctg07.workers.dev';

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
 * 2. VITE_SHORT_DOMAIN or SHORT_DOMAIN environment variable
 * 3. Default Workers / Custom Domain (https://gadget-hub-mart.mrmiahctg07.workers.dev)
 */
export function getEffectiveShortDomain(): string {
  // 1. Saved custom domain from Admin Panel
  const saved = getSavedCustomDomain();
  if (saved) return normalizeDomain(saved);

  // 2. Vite environment variable
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      const envVal = import.meta.env.VITE_SHORT_DOMAIN || (import.meta.env as any).SHORT_DOMAIN;
      if (envVal && typeof envVal === 'string' && envVal.trim()) {
        return normalizeDomain(envVal.trim());
      }
    }
  } catch (e) {}

  // 3. Fallback to default custom domain
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
 * Builds a clean, single-line canonical product URL (e.g. https://gadget-hub-mart.mrmiahctg07.workers.dev/p/airpods-pro-2nd-gen).
 */
export function buildCanonicalProductUrl(slug: string, overrideDomain?: string): string {
  const base = overrideDomain ? normalizeDomain(overrideDomain) : getEffectiveShortDomain();
  const cleanSlug = slugify(slug);
  return `${base}/p/${cleanSlug}`;
}

// Default initial short links
const INITIAL_SHORT_LINKS: ShortLinkItem[] = [
  {
    code: 'airpods',
    targetPath: '/p/airpods-pro-2nd-gen',
    title: 'AirPods Pro 2nd Gen Promo',
    clicks: 142,
    createdAt: '2026-09-01'
  },
  {
    code: 'charger',
    targetPath: '/p/flexagear-65w-gan-charger',
    title: '65W GaN Fast Charger',
    clicks: 98,
    createdAt: '2026-09-05'
  },
  {
    code: 'powerbank',
    targetPath: '/p/powervolt-20000mah-power-bank',
    title: '20,000mAh Power Bank',
    clicks: 86,
    createdAt: '2026-09-10'
  },
  {
    code: 'cable',
    targetPath: '/p/anker-powerline-iii-usb-c-cable',
    title: 'Fast Charging Braided Cable',
    clicks: 64,
    createdAt: '2026-09-12'
  },
  {
    code: 'offer',
    targetPath: '/featured-products',
    title: 'Special Featured Offers',
    clicks: 215,
    createdAt: '2026-09-15'
  },
  {
    code: 'bundle',
    targetPath: '/bundles',
    title: 'Combo & Bundle Deals',
    clicks: 178,
    createdAt: '2026-09-18'
  }
];

/**
 * Retrieves all registered short links from safeStorage.
 */
export function getShortLinks(): ShortLinkItem[] {
  try {
    const raw = safeStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    // fallback
  }
  return INITIAL_SHORT_LINKS;
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
 * Searches:
 * 1. Registered short links table
 * 2. Exact match with any product's slug
 * 3. Partial keyword match with product names
 */
export function resolveShortLink(rawCode: string, products: Product[]): string | null {
  if (!rawCode) return null;
  const cleanCode = slugify(rawCode);

  // 1. Check registered short links
  const registered = getShortLinks();
  const match = registered.find(s => s.code.toLowerCase() === cleanCode.toLowerCase());
  if (match) {
    incrementShortLinkClick(match.code);
    return match.targetPath;
  }

  // 2. Check if the code directly matches a product slug
  if (Array.isArray(products) && products.length > 0) {
    const productBySlug = products.find(p => getProductSlug(p) === cleanCode);
    if (productBySlug) {
      return `/p/${getProductSlug(productBySlug)}`;
    }

    // 3. Check if the code matches product name keywords (e.g. 'airpods' matches 'AirPods Pro 2nd Gen')
    const productByKeyword = products.find(p => {
      const nameNorm = slugify(p.name);
      return nameNorm.includes(cleanCode) || cleanCode.includes(nameNorm);
    });
    if (productByKeyword) {
      return `/p/${getProductSlug(productByKeyword)}`;
    }
  }

  // Special common alias fallbacks
  if (cleanCode === 'airpods' || cleanCode === 'airpod') {
    return '/p/airpods-pro-2nd-gen';
  }

  return null;
}
