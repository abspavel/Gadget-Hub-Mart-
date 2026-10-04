declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

export const FB_PIXEL_ID = '2258838221562135';

/**
 * Safe wrapper for Meta (Facebook) Pixel fbq call
 */
export const trackPixelEvent = (event: string, params?: Record<string, any>) => {
  try {
    if (typeof window === 'undefined') return;
    if (typeof window.fbq === 'function') {
      if (params) {
        window.fbq('track', event, params);
      } else {
        window.fbq('track', event);
      }
    } else {
      setTimeout(() => {
        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
          if (params) {
            window.fbq('track', event, params);
          } else {
            window.fbq('track', event);
          }
        }
      }, 250);
    }
  } catch (err) {
    console.debug('Pixel track error:', err);
  }
};

/**
 * Fires standard PageView event
 */
export const trackPageView = (pageName?: string) => {
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      if (pageName) {
        window.fbq('track', 'PageView', { page_name: pageName });
      } else {
        window.fbq('track', 'PageView');
      }
    }
  } catch (err) {
    console.debug('Pixel PageView error:', err);
  }
};

/**
 * Fires ViewContent event on Product Detail Page
 */
export const trackViewContent = (product: {
  id: string | number;
  name: string;
  price: number;
  category?: string;
  currency?: string;
}) => {
  trackPixelEvent('ViewContent', {
    content_name: product.name,
    content_ids: [String(product.id)],
    content_type: 'product',
    value: Math.round(product.price),
    currency: product.currency || 'BDT',
    content_category: product.category || 'Electronics & Gadgets',
  });
};

/**
 * Fires AddToCart event on Add to Cart / Buy Now click
 */
export const trackAddToCart = (product: {
  id: string | number;
  name: string;
  price: number;
  quantity?: number;
  currency?: string;
}) => {
  const qty = product.quantity || 1;
  trackPixelEvent('AddToCart', {
    content_name: product.name,
    content_ids: [String(product.id)],
    content_type: 'product',
    value: Math.round(product.price * qty),
    currency: product.currency || 'BDT',
    num_items: qty,
  });
};

/**
 * Fires Purchase event upon Order confirmation / Thank you page
 */
export const trackPurchase = (order: {
  orderId: string;
  value: number;
  currency?: string;
  items?: Array<{ id?: string | number; name?: string; price?: number; quantity?: number }>;
}) => {
  const content_ids = order.items && order.items.length > 0
    ? order.items.map(i => String(i.id || i.name))
    : [order.orderId];
  const content_name = order.items && order.items.length > 0
    ? order.items.map(i => i.name).filter(Boolean).join(', ')
    : `Order #${order.orderId}`;
  const num_items = order.items && order.items.length > 0
    ? order.items.reduce((sum, i) => sum + (i.quantity || 1), 0)
    : 1;

  trackPixelEvent('Purchase', {
    content_name,
    content_ids,
    content_type: 'product',
    value: Math.round(order.value),
    currency: order.currency || 'BDT',
    num_items,
    order_id: order.orderId,
  });
};
