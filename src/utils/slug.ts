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
 * If product.slug exists, use it; otherwise generate from product.name or fallback to product.id.
 */
export function getProductSlug(product: Partial<Product>): string {
  if (!product) return 'product';
  if (product.slug && product.slug.trim()) {
    return slugify(product.slug);
  }
  if (product.name && product.name.trim()) {
    const fromName = slugify(product.name);
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

  // 4. Fuzzy match: if slug contains a strong identifying fragment
  const byFragment = products.find(p => {
    const s = slugify(p.name);
    return s.includes(searchNormalized) || searchNormalized.includes(s);
  });
  if (byFragment) return byFragment;

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
