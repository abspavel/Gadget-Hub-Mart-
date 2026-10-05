import { Product } from '../types';

/**
 * Converts any string into a clean, URL-safe slug.
 * Handles English, numbers, dashes, and gracefully sanitizes special characters.
 */
export function slugify(text: string): string {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    // Replace spaces and underscores with hyphens
    .replace(/[\s_]+/g, '-')
    // Remove unwanted punctuation except hyphens and alphanumeric characters (supports unicode for Bengali/others)
    .replace(/[^\w\u0980-\u09FF-]+/g, '')
    // Replace multiple consecutive hyphens with a single hyphen
    .replace(/--+/g, '-')
    // Trim hyphens from start and end
    .replace(/^-+|-+$/g, '');
}

/**
 * Returns the definitive URL slug for a product.
 * Produces clean, concise slugs (e.g. "airpods-pro-2nd-gen" or "gan-65w-fast-charger")
 * suitable for short sharing links like https://gadgethubmart.com/p/..
 */
export function getProductSlug(product: Partial<Product>): string {
  if (!product) return 'product';
  if (product.slug && product.slug.trim()) {
    return slugify(product.slug);
  }
  if (product.name && product.name.trim()) {
    // Generate concise slug from the first few key words (max 5 words, max 45 chars)
    const words = product.name.trim().split(/\s+/).slice(0, 5).join(' ');
    const fromName = slugify(words);
    if (fromName) return fromName;
  }
  if (product.id) {
    return slugify(product.id);
  }
  return 'product';
}

/**
 * Finds a product in the list by matching slug or id with fuzzy-friendly fallback.
 */
export function findProductBySlug(products: Product[], rawSlug: string): Product | undefined {
  if (!rawSlug || !Array.isArray(products) || products.length === 0) return undefined;
  
  const searchSlug = decodeURIComponent(rawSlug).toLowerCase().trim();
  const searchNormalized = slugify(searchSlug);

  // 1. Direct match with product.slug
  const byExplicitSlug = products.find(p => p.slug && slugify(p.slug) === searchNormalized);
  if (byExplicitSlug) return byExplicitSlug;

  // 2. Direct match with generated slug from product.name
  const byNameSlug = products.find(p => slugify(p.name) === searchNormalized);
  if (byNameSlug) return byNameSlug;

  // 3. Match with product.id
  const byId = products.find(p => p.id && (p.id.toLowerCase() === searchSlug || slugify(p.id) === searchNormalized));
  if (byId) return byId;

  // 4. Prefix match: slug starts with or matches closely (minimum 5 chars to avoid greedy collisions)
  if (searchNormalized.length >= 5) {
    const byPrefix = products.find(p => {
      const s = p.slug ? slugify(p.slug) : slugify(p.name);
      return s.startsWith(searchNormalized) || searchNormalized.startsWith(s);
    });
    if (byPrefix) return byPrefix;
  }

  return undefined;
}

/**
 * Enriches a list of products by ensuring each one has a valid, unique slug.
 */
export function ensureProductSlugs(products: Product[]): Product[] {
  if (!Array.isArray(products)) return [];
  const seen = new Set<string>();

  return products.map(prod => {
    let baseSlug = prod.slug ? slugify(prod.slug) : slugify(prod.name) || slugify(prod.id);
    if (!baseSlug) baseSlug = 'gadget';

    let uniqueSlug = baseSlug;
    let counter = 1;
    while (seen.has(uniqueSlug)) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }
    seen.add(uniqueSlug);

    return {
      ...prod,
      slug: uniqueSlug
    };
  });
}
