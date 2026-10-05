import { Product } from '../types';
import { getProductSlug } from './slug';

export const DOMAIN = 'https://gadgethubmart.com';
export const DEFAULT_OG_IMAGE = `${DOMAIN}/og-image.jpeg`;

export const DEFAULT_SEO = {
  title: 'Gadget Hub Mart | Official Online Gadget Store in Bangladesh | gadgethubmart.com',
  description: 'Shop authentic tech accessories at Gadget Hub Mart (gadgethubmart.com). Fast GaN chargers, wireless earbuds, smartwatches & power banks with express Cash on Delivery across Bangladesh.',
  url: DOMAIN,
  image: DEFAULT_OG_IMAGE,
  siteName: 'Gadget Hub Mart'
};

function setOrCreateMeta(selector: string, attrName: 'content' | 'href', attrValue: string, createTag: { tag: string; [key: string]: string }) {
  if (typeof document === 'undefined') return;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement(createTag.tag);
    Object.keys(createTag).forEach(k => {
      if (k !== 'tag') (el as HTMLElement).setAttribute(k, createTag[k]);
    });
    document.head.appendChild(el);
  }
  el.setAttribute(attrName, attrValue);
}

/**
 * Updates document title, OpenGraph tags, Twitter cards, and canonical URL
 */
export function updateProductSeo(product: Product) {
  if (typeof document === 'undefined' || !product) return;

  const slug = getProductSlug(product);
  const canonicalUrl = `${DOMAIN}/p/${slug}`;
  const title = `${product.name} | Gadget Hub Mart`;
  const desc = (product.shortDescription || product.description || DEFAULT_SEO.description).slice(0, 160);

  // Determine absolute product image URL (never use a watch placeholder for a non-watch product)
  let rawImage = product.imageUrl || (product.images && product.images[0]) || '';
  let fullImageUrl = DEFAULT_OG_IMAGE;
  if (rawImage) {
    if (rawImage.startsWith('http://') || rawImage.startsWith('https://')) {
      fullImageUrl = rawImage;
    } else {
      fullImageUrl = `${DOMAIN}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;
    }
  }

  // 1. Title & Meta Description
  document.title = title;
  setOrCreateMeta('meta[name="description"]', 'content', desc, { tag: 'meta', name: 'description' });

  // 2. Canonical URL
  setOrCreateMeta('link[rel="canonical"]', 'href', canonicalUrl, { tag: 'link', rel: 'canonical' });

  // 3. OpenGraph
  setOrCreateMeta('meta[property="og:title"]', 'content', title, { tag: 'meta', property: 'og:title' });
  setOrCreateMeta('meta[property="og:description"]', 'content', desc, { tag: 'meta', property: 'og:description' });
  setOrCreateMeta('meta[property="og:url"]', 'content', canonicalUrl, { tag: 'meta', property: 'og:url' });
  setOrCreateMeta('meta[property="og:image"]', 'content', fullImageUrl, { tag: 'meta', property: 'og:image' });
  setOrCreateMeta('meta[property="og:image:secure_url"]', 'content', fullImageUrl, { tag: 'meta', property: 'og:image:secure_url' });
  setOrCreateMeta('meta[property="og:type"]', 'content', 'product', { tag: 'meta', property: 'og:type' });

  // 4. Twitter / X Cards
  setOrCreateMeta('meta[name="twitter:title"]', 'content', title, { tag: 'meta', name: 'twitter:title' });
  setOrCreateMeta('meta[name="twitter:description"]', 'content', desc, { tag: 'meta', name: 'twitter:description' });
  setOrCreateMeta('meta[name="twitter:image"]', 'content', fullImageUrl, { tag: 'meta', name: 'twitter:image' });

  // 5. Schema.org Product JSON-LD
  try {
    let scriptTag = document.getElementById('schema-product-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'schema-product-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    const schemaData = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: product.name,
      image: [fullImageUrl],
      description: desc,
      sku: product.id,
      brand: {
        '@type': 'Brand',
        name: 'Gadget Hub Mart'
      },
      offers: {
        '@type': 'Offer',
        url: canonicalUrl,
        priceCurrency: 'BDT',
        price: product.price,
        availability: (product.stockCount ?? 1) > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: {
          '@type': 'Organization',
          name: 'Gadget Hub Mart'
        }
      }
    };
    scriptTag.textContent = JSON.stringify(schemaData);
  } catch (e) {
    // Ignore
  }
}

/**
 * Resets document title and metadata back to default store settings
 */
export function resetDefaultSeo() {
  if (typeof document === 'undefined') return;

  document.title = DEFAULT_SEO.title;
  setOrCreateMeta('meta[name="description"]', 'content', DEFAULT_SEO.description, { tag: 'meta', name: 'description' });
  setOrCreateMeta('link[rel="canonical"]', 'href', DEFAULT_SEO.url, { tag: 'link', rel: 'canonical' });

  setOrCreateMeta('meta[property="og:title"]', 'content', DEFAULT_SEO.title, { tag: 'meta', property: 'og:title' });
  setOrCreateMeta('meta[property="og:description"]', 'content', DEFAULT_SEO.description, { tag: 'meta', property: 'og:description' });
  setOrCreateMeta('meta[property="og:url"]', 'content', DEFAULT_SEO.url, { tag: 'meta', property: 'og:url' });
  setOrCreateMeta('meta[property="og:image"]', 'content', DEFAULT_SEO.image, { tag: 'meta', property: 'og:image' });
  setOrCreateMeta('meta[property="og:image:secure_url"]', 'content', DEFAULT_SEO.image, { tag: 'meta', property: 'og:image:secure_url' });
  setOrCreateMeta('meta[property="og:type"]', 'content', 'website', { tag: 'meta', property: 'og:type' });

  setOrCreateMeta('meta[name="twitter:title"]', 'content', DEFAULT_SEO.title, { tag: 'meta', name: 'twitter:title' });
  setOrCreateMeta('meta[name="twitter:description"]', 'content', DEFAULT_SEO.description, { tag: 'meta', name: 'twitter:description' });
  setOrCreateMeta('meta[name="twitter:image"]', 'content', DEFAULT_SEO.image, { tag: 'meta', name: 'twitter:image' });

  const scriptTag = document.getElementById('schema-product-jsonld');
  if (scriptTag) scriptTag.remove();
}
