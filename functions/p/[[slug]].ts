// Cloudflare Pages Function for Dynamic Product Open Graph Previews on gadgethubmart.com
import { INITIAL_PRODUCTS } from '../../src/data/initialData';
import { findProductBySlug, getProductSlug } from '../../src/utils/slug';

interface Env {
  VITE_SUPABASE_URL?: string;
  VITE_SUPABASE_ANON_KEY?: string;
}

export async function onRequest(context: { request: Request; params: { slug?: string | string[] }; env: Env; next: () => Promise<Response> }) {
  const { request, params, next } = context;
  const rawParam = params.slug;
  const slug = Array.isArray(rawParam) ? rawParam.join('/') : (rawParam || '');

  // Fetch the default static HTML response
  const response = await next();
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html') || !slug) {
    return response;
  }

  // 1. Try to find the product in local static catalog
  let product = findProductBySlug(INITIAL_PRODUCTS, slug);

  // 2. Fallback to Supabase REST lookup if available
  if (!product && context.env?.VITE_SUPABASE_URL && context.env?.VITE_SUPABASE_ANON_KEY) {
    try {
      const cleanSlug = encodeURIComponent(slug.trim());
      const res = await fetch(`${context.env.VITE_SUPABASE_URL}/rest/v1/products?or=(slug.eq.${cleanSlug},id.eq.${cleanSlug})&limit=1`, {
        headers: {
          apikey: context.env.VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${context.env.VITE_SUPABASE_ANON_KEY}`
        }
      });
      if (res.ok) {
        const rows: any = await res.json();
        if (rows && rows.length > 0) {
          const r = rows[0];
          product = {
            id: r.id,
            name: r.name,
            category: r.category,
            price: Number(r.price),
            stockCount: r.stock_count ?? 10,
            imageUrl: r.image_url,
            images: r.images || [r.image_url],
            colors: r.colors || ['Black'],
            shortDescription: r.short_description || r.description,
            fullDescription: r.full_description || r.description,
            description: r.short_description || r.description,
            features: r.features || [],
            rating: Number(r.rating || 4.9),
            reviewCount: Number(r.review_count || 15),
            specs: r.specs || {}
          };
        }
      }
    } catch (e) {
      // Supabase fetch failure fallback
    }
  }

  // If no product is matched, return original HTML
  if (!product) {
    return response;
  }

  const DOMAIN = 'https://gadgethubmart.com';
  const productTitle = `${product.name} | Gadget Hub Mart`;
  const productDesc = (product.shortDescription || product.description || 'Authentic tech gadget at Gadget Hub Mart. 100% genuine quality with cash on delivery across Bangladesh.').slice(0, 160);

  // Exact product image URL (Never a watch fallback)
  let rawImg = product.imageUrl || (product.images && product.images[0]) || '';
  let fullImageUrl = `${DOMAIN}/og-image.jpeg`;
  if (rawImg) {
    if (rawImg.startsWith('http://') || rawImg.startsWith('https://')) {
      fullImageUrl = rawImg;
    } else {
      fullImageUrl = `${DOMAIN}${rawImg.startsWith('/') ? '' : '/'}${rawImg}`;
    }
  }
  const canonicalUrl = `${DOMAIN}/p/${getProductSlug(product)}`;

  // Use Cloudflare HTMLRewriter to stream-replace meta tags without buffering
  // @ts-ignore Cloudflare runtime global HTMLRewriter
  if (typeof HTMLRewriter !== 'undefined') {
    // @ts-ignore
    return new HTMLRewriter()
      .on('title', {
        element(e: any) { e.setInnerContent(productTitle); }
      })
      .on('meta[name="description"]', {
        element(e: any) { e.setAttribute('content', productDesc); }
      })
      .on('meta[property="og:title"]', {
        element(e: any) { e.setAttribute('content', productTitle); }
      })
      .on('meta[property="og:description"]', {
        element(e: any) { e.setAttribute('content', productDesc); }
      })
      .on('meta[property="og:url"]', {
        element(e: any) { e.setAttribute('content', canonicalUrl); }
      })
      .on('meta[property="og:image"]', {
        element(e: any) { e.setAttribute('content', fullImageUrl); }
      })
      .on('meta[property="og:image:secure_url"]', {
        element(e: any) { e.setAttribute('content', fullImageUrl); }
      })
      .on('meta[name="twitter:title"]', {
        element(e: any) { e.setAttribute('content', productTitle); }
      })
      .on('meta[name="twitter:description"]', {
        element(e: any) { e.setAttribute('content', productDesc); }
      })
      .on('meta[name="twitter:image"]', {
        element(e: any) { e.setAttribute('content', fullImageUrl); }
      })
      .on('link[rel="canonical"]', {
        element(e: any) { e.setAttribute('href', canonicalUrl); }
      })
      .transform(response);
  }

  return response;
}
