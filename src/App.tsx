import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { HeroSection } from './components/HeroSection';
import { ShopByCategory } from './components/ShopByCategory';
import { PromoDuoBanners } from './components/PromoDuoBanners';
import { FeaturedProducts } from './components/FeaturedProducts';
import { BestSellersAndBundle } from './components/BestSellersAndBundle';
import { TravelCollectionBanner } from './components/TravelCollectionBanner';
import { CustomerReviewsSlider } from './components/CustomerReviewsSlider';
import { ValuePropsAndNewsletter } from './components/ValuePropsAndNewsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ScrollToTop } from './components/ScrollToTop';
import { ProductCard } from './components/ProductCard';
import { safeStorage, idbGet } from './utils/safeStorage';

// Lazy-loaded Supabase client (removes 223 KB Supabase library from initial main thread)
const getSupabase = async () => {
  const mod = await import('./lib/supabase');
  return mod.supabase;
};

// Lazy-loaded modals for zero initial DOM cost
const TrackOrderModal = React.lazy(() => import('./components/TrackOrderModal').then(m => ({ default: m.TrackOrderModal })));
const HelpModal = React.lazy(() => import('./components/HelpModal').then(m => ({ default: m.HelpModal })));
const AuthModal = React.lazy(() => import('./components/AuthModal').then(m => ({ default: m.AuthModal })));

// Core shopping pages imported directly for 0ms instant zero-latency page transitions
import { ProductDetailPage } from './components/ProductDetailPage';
import { CategoryPage } from './components/CategoryPage';
import { CheckoutPage } from './components/CheckoutPage';
import { AllCategoriesPage } from './components/AllCategoriesPage';
import { SearchResultsPage } from './components/SearchResultsPage';

// Secondary pages lazy-loaded to keep initial bundle ultra-lean
const AdminPage = React.lazy(() => import('./components/AdminPage').then(m => ({ default: m.AdminPage })));
const FeaturedProductsPage = React.lazy(() => import('./components/FeaturedProductsPage').then(m => ({ default: m.FeaturedProductsPage })));
const AllProductsPage = React.lazy(() => import('./components/AllProductsPage').then(m => ({ default: m.AllProductsPage })));
const BestSellersPage = React.lazy(() => import('./components/BestSellersPage').then(m => ({ default: m.BestSellersPage })));
const NewArrivalsPage = React.lazy(() => import('./components/NewArrivalsPage').then(m => ({ default: m.NewArrivalsPage })));
const BundlesPage = React.lazy(() => import('./components/BundlesPage').then(m => ({ default: m.BundlesPage })));
const ContactUsPage = React.lazy(() => import('./components/ContactUsPage').then(m => ({ default: m.ContactUsPage })));
const ProfilePage = React.lazy(() => import('./components/ProfilePage').then(m => ({ default: m.ProfilePage })));
const AboutUsPage = React.lazy(() => import('./components/AboutUsPage').then(m => ({ default: m.AboutUsPage })));
const CareersPage = React.lazy(() => import('./components/CareersPage').then(m => ({ default: m.CareersPage })));
const PressPage = React.lazy(() => import('./components/PressPage').then(m => ({ default: m.PressPage })));
const AffiliatesPage = React.lazy(() => import('./components/AffiliatesPage').then(m => ({ default: m.AffiliatesPage })));
const PrivacyPolicyPage = React.lazy(() => import('./components/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsOfServicePage = React.lazy(() => import('./components/TermsOfServicePage').then(m => ({ default: m.TermsOfServicePage })));
const SecurityPage = React.lazy(() => import('./components/SecurityPage').then(m => ({ default: m.SecurityPage })));
const WarrantyPolicyPage = React.lazy(() => import('./components/WarrantyPolicyPage').then(m => ({ default: m.WarrantyPolicyPage })));
const ShippingReturnsPage = React.lazy(() => import('./components/ShippingReturnsPage').then(m => ({ default: m.ShippingReturnsPage })));
const HelpCenterPage = React.lazy(() => import('./components/HelpCenterPage').then(m => ({ default: m.HelpCenterPage })));
const TrackOrderPage = React.lazy(() => import('./components/TrackOrderPage').then(m => ({ default: m.TrackOrderPage })));
const GiftCardsPage = React.lazy(() => import('./components/GiftCardsPage').then(m => ({ default: m.GiftCardsPage })));

import { ALL_PRODUCTS, CURRENCIES, CATEGORIES } from './data/products';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_BANNERS } from './data/initialData';
import { Product, CartItem, Currency, CategoryItem, CustomerUser } from './types';
const getCurrentCustomer = (): CustomerUser | null => {
  try {
    const raw = safeStorage.getItem('ghm_active_customer');
    if (!raw) return null;
    return JSON.parse(raw) as CustomerUser;
  } catch (e) {
    return null;
  }
};
import { trackPageView, trackAddToCart, trackViewContent } from './utils/pixel';
import { Check, ShoppingBag, Zap, ShieldAlert, ArrowRight } from 'lucide-react';
import { cleanTrackingParameters } from './utils/urlCleaner';
import { getProductSlug, findProductBySlug, ensureProductSlugs, slugify } from './utils/slug';
import { resolveShortLink } from './utils/shortLinks';
import { ProductNotFoundPage } from './components/ProductNotFoundPage';

export type ViewState =
  | 'home'
  | { type: 'product'; product: Product }
  | { type: '404'; attemptedSlug?: string }
  | { type: 'category'; categoryName: string }
  | { type: 'search'; query: string }
  | 'all-categories'
  | 'featured-products'
  | 'all-products'
  | 'best-sellers'
  | 'new-arrivals'
  | 'bundles'
  | 'gift-cards'
  | 'track-order'
  | 'help-center'
  | 'shipping-returns'
  | 'shipping-policy'
  | 'warranty-policy'
  | 'contact-us'
  | 'about-us'
  | 'careers'
  | 'press'
  | 'affiliates'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'security'
  | 'admin'
  | 'checkout'
  | 'profile';

const INITIAL_DEMO_ORDERS: any[] = [
  {
    id: 'GHM-892134',
    customerName: 'Md. Tanvir Ahmed',
    phone: '01711223344',
    email: 'tanvir@gmail.com',
    address: 'বাসা ১৮, রোড ৪, সেক্টর ৭, উত্তরা, ঢাকা',
    city: 'ঢাকা',
    thana: 'উত্তরা',
    deliveryZone: 'ঢাকার ভিতরে (৳৮০)',
    paymentMethod: 'ক্যাশ অন ডেলিভারি',
    items: [
      { productName: 'Baseus 65W GaN5 Pro Fast Charger', quantity: 1, price: 1850 }
    ],
    total: 1930,
    status: 'Pending',
    date: '2026-10-01'
  },
  {
    id: 'GHM-562941',
    customerName: 'Rahim Uddin',
    phone: '01899887766',
    email: 'rahim@yahoo.com',
    address: 'জিইসি মোড়, নাসিরাবাদ, চট্টগ্রাম',
    city: 'চট্টগ্রাম',
    thana: 'খুলশী',
    deliveryZone: 'ঢাকার বাইরে (৳১২০)',
    paymentMethod: 'ক্যাশ অন ডেলিভারি',
    items: [
      { productName: 'Anker PowerLine III USB-C Cable', quantity: 2, price: 650 }
    ],
    total: 1420,
    status: 'Processing',
    date: '2026-09-30'
  },
  {
    id: 'GHM-341908',
    customerName: 'Farhana Islam',
    phone: '01922334455',
    email: 'farhana@gmail.com',
    address: 'বাড়ি ৫, রোড ১১, ধানমন্ডি, ঢাকা',
    city: 'ঢাকা',
    thana: 'ধানমন্ডি',
    deliveryZone: 'ঢাকার ভিতরে (৳৮০)',
    paymentMethod: 'ক্যাশ অন ডেলিভারি',
    items: [
      { productName: 'Sony WH-1000XM5 Wireless Headphones', quantity: 1, price: 34500 }
    ],
    total: 34580,
    status: 'Delivered',
    date: '2026-09-28',
    steadfastTrackingCode: 'SF89214710',
    steadfastConsignmentId: 'CID-GHM-341908'
  }
];

// Safe deduplication helpers to ensure keys are always 100% unique
const deduplicateCategories = (cats: CategoryItem[]): CategoryItem[] => {
  const seen = new Set<string>();
  const out: CategoryItem[] = [];
  for (const c of cats) {
    if (!c || (!c.id && !c.label)) continue;
    const norm = (c.id || c.label || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '-');
    if (!seen.has(norm)) {
      seen.add(norm);
      out.push(c);
    }
  }
  return out;
};

const deduplicateProducts = (prods: Product[]): Product[] => {
  const seen = new Set<string>();
  const out: Product[] = [];
  for (const p of prods) {
    if (!p || !p.id) continue;
    const norm = p.id.toLowerCase().trim();
    if (!seen.has(norm)) {
      seen.add(norm);
      out.push(p);
    }
  }
  return out;
};

export const getPathForView = (view: ViewState): string => {
  if (view === 'home') return '/';
  if (typeof view === 'string') return `/${view}`;
  if (view.type === 'product') return `/p/${getProductSlug(view.product)}`;
  if (view.type === '404') return view.attemptedSlug ? `/p/${view.attemptedSlug}` : '/404';
  if (view.type === 'category') return `/category/${slugify(view.categoryName)}`;
  if (view.type === 'search') return `/search?q=${encodeURIComponent(view.query)}`;
  return '/';
};

export const resolveViewFromUrl = (prods: Product[]): ViewState => {
  if (typeof window === 'undefined') return 'home';

  // 1. Clean tracking parameters immediately (fbclid, aem, utm_*, etc.)
  cleanTrackingParameters();

  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const searchParams = new URLSearchParams(window.location.search);

  // 2. Marketing short links: /s/:code (e.g. /s/airpods -> /p/airpods-pro-2nd-gen)
  if (pathname.startsWith('/s/')) {
    const code = pathname.slice(3).trim();
    if (code) {
      const target = resolveShortLink(code, prods);
      if (target) {
        window.history.replaceState(null, '', target);
        if (target.startsWith('/p/')) {
          const targetSlug = target.slice(3).trim();
          const found = findProductBySlug(prods, targetSlug);
          if (found) return { type: 'product', product: found };
        }
        const cleanView = target.replace(/^\//, '');
        if (cleanView) return cleanView as ViewState;
      }
      return { type: '404', attemptedSlug: code };
    }
  }

  // 3. Product path-based routes: /p/:slug, /product/:slug, /products/:slug, /item/:slug
  let productSlug: string | null = null;
  if (pathname.startsWith('/p/')) {
    productSlug = pathname.slice(3).trim();
  } else if (pathname.startsWith('/product/')) {
    productSlug = pathname.slice(9).trim();
  } else if (pathname.startsWith('/products/')) {
    productSlug = pathname.slice(10).trim();
  } else if (pathname.startsWith('/item/')) {
    productSlug = pathname.slice(6).trim();
  }

  // 4. Query parameter fallback: /?p=slug, /?product=slug, /?id=123, /?productId=123, /?slug=slug
  if (!productSlug) {
    const queryProduct = searchParams.get('p') || searchParams.get('product') || searchParams.get('slug') || searchParams.get('id') || searchParams.get('productId') || searchParams.get('item');
    if (queryProduct) {
      productSlug = queryProduct.trim();
    }
  }

  if (productSlug) {
    const foundProduct = findProductBySlug(prods, productSlug);
    if (foundProduct) {
      const canonical = `/p/${getProductSlug(foundProduct)}`;
      if (window.location.pathname !== canonical) {
        window.history.replaceState(null, '', canonical);
      }
      return { type: 'product', product: foundProduct };
    } else {
      // Return 404 - will re-evaluate immediately if database loads product
      return { type: '404', attemptedSlug: productSlug };
    }
  }

  // 5. Category routes: /category/:name or /c/:name
  if (pathname.startsWith('/category/')) {
    const cat = decodeURIComponent(pathname.slice(10).trim());
    return { type: 'category', categoryName: cat };
  }
  if (pathname.startsWith('/c/')) {
    const cat = decodeURIComponent(pathname.slice(3).trim());
    return { type: 'category', categoryName: cat };
  }

  // 6. Search route: /search?q=...
  if (pathname === '/search') {
    const q = searchParams.get('q') || '';
    return { type: 'search', query: q };
  }

  // 7. Known named views
  const pathNoSlash = pathname.replace(/^\//, '');
  const knownViews = [
    'all-categories', 'featured-products', 'all-products', 'best-sellers',
    'new-arrivals', 'bundles', 'gift-cards', 'track-order', 'help-center',
    'shipping-returns', 'shipping-policy', 'warranty-policy', 'contact-us', 'about-us',
    'careers', 'press', 'affiliates', 'privacy-policy', 'terms-of-service',
    'security', 'admin', 'checkout', 'profile'
  ];
  if (knownViews.includes(pathNoSlash)) {
    return pathNoSlash as ViewState;
  }

  return 'home';
};

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = safeStorage.getItem('ghm_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return ensureProductSlugs(deduplicateProducts(parsed));
      }
    } catch (e) {}
    return ensureProductSlugs(deduplicateProducts(INITIAL_PRODUCTS));
  });

  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    try {
      const saved = safeStorage.getItem('ghm_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return deduplicateCategories(parsed);
      }
    } catch (e) {}
    return deduplicateCategories(INITIAL_CATEGORIES);
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentView, setCurrentView] = useState<ViewState>(() => {
    // Check initial products and URL
    const initialProds = (() => {
      try {
        const saved = safeStorage.getItem('ghm_products');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return ensureProductSlugs(deduplicateProducts(parsed));
        }
      } catch (e) {}
      return ensureProductSlugs(deduplicateProducts(INITIAL_PRODUCTS));
    })();
    return resolveViewFromUrl(initialProds);
  });
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categoriesList = ['All', ...categories.map(c => c.label || c.id)];

  // Admin Data State (with safeStorage persistence)
  const [orders, setOrders] = useState<any[]>(() => {
    try {
      const saved = safeStorage.getItem('ghm_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_DEMO_ORDERS;
  });

  const [incompleteOrders, setIncompleteOrders] = useState<any[]>([]);

  const [subscribers, setSubscribers] = useState<any[]>(() => {
    try {
      const saved = safeStorage.getItem('ghm_subscribers');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { id: '1', email: 'tanvir@gmail.com', date: '2026-09-25' },
      { id: '2', email: 'rahim@yahoo.com', date: '2026-09-28' },
      { id: '3', email: 'humairanourin32@gmail.com', date: '2026-10-01' }
    ];
  });

  const [banners, setBanners] = useState<any[]>(() => {
    try {
      const saved = safeStorage.getItem('ghm_banners');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_BANNERS;
  });

  const [coupons, setCoupons] = useState<any[]>(() => {
    try {
      const saved = safeStorage.getItem('ghm_coupons');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { id: '1', code: 'EID10', discountPercentage: 10, isActive: true },
      { id: '2', code: 'GADGET20', discountPercentage: 20, isActive: true },
      { id: '3', code: 'SAVE100', discountAmount: 100, isActive: true }
    ];
  });

  // Load Data from Supabase & IndexedDB on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      // IndexedDB fallback hydration
      try {
        const idbProds = await idbGet<Product[]>('ghm_products');
        if (idbProds && Array.isArray(idbProds) && idbProds.length > 0) {
          setProducts(prev => deduplicateProducts([...idbProds, ...prev]));
        }
      } catch (e) {}

      try {
        const supabase = await getSupabase();
        // 1. Categories Sync
        const { data: dbCategories } = await supabase
          .from('categories')
          .select('*')
          .order('created_at', { ascending: false });

        if (dbCategories && dbCategories.length > 0) {
          const loadedCats: CategoryItem[] = dbCategories.map((c: any) => ({
            id: c.id,
            label: c.label || c.name || c.id,
            imageUrl: c.image_url || c.imageUrl,
            description: c.description
          }));
          const dedupedCats = deduplicateCategories(loadedCats);
          setCategories(dedupedCats);
          safeStorage.setItem('ghm_categories', JSON.stringify(dedupedCats));
        }

        // 2. Products Sync
        const { data: dbProducts } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (dbProducts && dbProducts.length > 0) {
          const loadedProds: Product[] = dbProducts.map((p: any) => ({
            id: p.id,
            name: p.name,
            category: p.category,
            price: Number(p.price),
            originalPrice: p.original_price ? Number(p.original_price) : undefined,
            stockCount: p.stock_count ?? 50,
            rating: p.rating ? Number(p.rating) : 4.9,
            reviewCount: p.review_count ?? 15,
            imageUrl: p.image_url,
            images: p.images && Array.isArray(p.images) && p.images.length > 0 ? p.images : [p.image_url],
            colors: p.colors || ['Black'],
            shortDescription: p.short_description || p.description,
            fullDescription: p.full_description || p.description,
            description: p.short_description || p.description,
            warranty: p.warranty,
            features: p.features || ['Official gadget', 'High durability'],
            specs: p.specs || {},
            isFeatured: p.is_featured,
            isBestSeller: p.is_best_seller,
            isNewArrival: p.is_new_arrival,
            isBundle: p.is_bundle,
            isTravel: p.is_travel,
            sections: p.sections || ['All Products']
          }));
          const dedupedProds = deduplicateProducts(loadedProds);
          setProducts(dedupedProds);
          safeStorage.setItem('ghm_products', JSON.stringify(dedupedProds));
        }

        // 3. Banners Sync
        const { data: dbBanners } = await supabase
          .from('banners')
          .select('*')
          .order('created_at', { ascending: false });

        if (dbBanners && dbBanners.length > 0) {
          const loadedBanners = dbBanners.map((b: any) => ({
            id: b.id,
            title: b.title,
            subtitle: b.subtitle,
            imageUrl: b.image_url,
            type: b.type,
            isActive: b.is_active ?? true
          }));
          setBanners(loadedBanners);
          safeStorage.setItem('ghm_banners', JSON.stringify(loadedBanners));
        }
      } catch (err) {
        console.log('Initial data sync note:', err);
      }
    };

    const isProductUrl = typeof window !== 'undefined' && 
      (window.location.pathname.startsWith('/p/') || 
       window.location.pathname.startsWith('/product/') || 
       window.location.pathname.startsWith('/products/') || 
       window.location.pathname.startsWith('/item/') || 
       window.location.pathname.startsWith('/s/') ||
       window.location.search.includes('product=') || 
       window.location.search.includes('p=') || 
       window.location.search.includes('id='));

    if (isProductUrl) {
      // Run immediately with zero delay so shared products display instantly!
      fetchInitialData();
    } else if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const idleId = (window as any).requestIdleCallback(fetchInitialData, { timeout: 2500 });
      return () => (window as any).cancelIdleCallback?.(idleId);
    } else {
      const timer = setTimeout(fetchInitialData, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Meta Pixel PageView tracking on view/route changes
  useEffect(() => {
    const pageName = typeof currentView === 'string' ? currentView : currentView.type;
    trackPageView(pageName);
  }, [currentView]);

  // Modals & Drawers state
  const [cartOpen, setCartOpen] = useState(false);
  const [trackOrderOpen, setTrackOrderOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  // Customer Account & Profile state
  const [currentCustomer, setCurrentCustomer] = useState<CustomerUser | null>(() => getCurrentCustomer());

  // Currency (Optimized for Bangladesh)
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(CURRENCIES.BDT);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSelectCurrency = (code: 'USD' | 'EUR' | 'GBP' | 'BDT') => {
    setCurrentCurrency(CURRENCIES[code]);
    showToast(`Currency switched to ${code} (${CURRENCIES[code].symbol})`);
  };

  const formatPrice = (price: number) => {
    return `৳${Math.round(price || 0).toLocaleString('en-US')}`;
  };

  // Automatically adjust product stock when products are purchased, cancelled, or returned
  const adjustProductStock = (
    items: Array<{ productId?: string; productName: string; quantity: number }>,
    action: 'deduct' | 'restore'
  ) => {
    if (!items || items.length === 0) return;

    setProducts((prevProducts) => {
      let hasChanges = false;
      const updatedProducts = prevProducts.map((prod) => {
        const match = items.find(
          (it) =>
            (it.productId && it.productId === prod.id) ||
            (it.productName && it.productName.trim().toLowerCase() === prod.name.trim().toLowerCase())
        );

        if (match) {
          hasChanges = true;
          const currentStock = prod.stockCount ?? 50;
          const delta = match.quantity || 1;
          const newStock = action === 'deduct' ? Math.max(0, currentStock - delta) : currentStock + delta;

          // Asynchronously sync to Supabase database (with silent offline fallback)
          getSupabase()
            .then((supabase) => {
              Promise.resolve(
                supabase
                  .from('products')
                  .update({ stock_count: newStock })
                  .eq('id', prod.id)
              ).catch(() => {});
            })
            .catch(() => {});

          return { ...prod, stockCount: newStock };
        }
        return prod;
      });

      if (hasChanges) {
        safeStorage.setItem('ghm_products', JSON.stringify(updatedProducts));
      }
      return updatedProducts;
    });
  };

  // Add to cart from card or detail page
  const handleAddToCart = (product: Product, quantity = 1, color?: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    // Check available stock
    const currentStock = product.stockCount ?? 50;
    if (currentStock <= 0) {
      showToast(`দুঃখিত, "${product.name}" বর্তমানে স্টকে নেই!`);
      return;
    }
    
    // Fire Meta Pixel AddToCart event
    const priceInBdt = Math.round(product.price || 0);
    trackAddToCart({
      id: product.id,
      name: product.name,
      price: priceInBdt,
      quantity,
      currency: 'BDT'
    });

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color
      );
      if (existingIndex > -1) {
        const next = [...prev];
        const newTotal = next[existingIndex].quantity + quantity;
        if (newTotal > currentStock) {
          next[existingIndex].quantity = currentStock;
          showToast(`সর্বোচ্চ মজুদ স্টক (${currentStock} টি) কার্টে রয়েছে`);
          return next;
        }
        next[existingIndex].quantity = newTotal;
        return next;
      } else {
        const safeQty = Math.min(quantity, currentStock);
        return [...prev, { product, quantity: safeQty, selectedColor: color }];
      }
    });

    showToast(`Added "${product.name}" to cart`);
  };

  const navigateView = (view: ViewState, replace = false) => {
    setCurrentView(view);
    if (typeof window !== 'undefined') {
      const targetPath = getPathForView(view);
      if (replace) {
        window.history.replaceState(null, '', targetPath);
      } else if (window.location.pathname !== targetPath) {
        window.history.pushState(null, '', targetPath);
      }
    }
  };

  // Popstate listener for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const resolved = resolveViewFromUrl(products);
      setCurrentView(resolved);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [products]);

  // Re-resolve view when products array hydrates from database or if currently on 404 / direct slug
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const pathname = window.location.pathname;
    
    // Check if we are currently showing 404 or on a direct product / shortlink path
    const search = window.location.search;
    const isProductPath = pathname.startsWith('/p/') || 
      pathname.startsWith('/product/') || 
      pathname.startsWith('/products/') || 
      pathname.startsWith('/item/') || 
      pathname.startsWith('/s/') ||
      search.includes('p=') ||
      search.includes('product=') ||
      search.includes('id=');
    const isCurrently404 = typeof currentView === 'object' && currentView.type === '404';

    if (isProductPath || isCurrently404) {
      const resolved = resolveViewFromUrl(products);
      if (typeof resolved === 'object' && resolved.type === 'product') {
        setCurrentView(resolved);
      } else if (isCurrently404 && typeof resolved === 'object' && resolved.type === '404' && resolved.attemptedSlug) {
        // Attempt single product lookup from database if not found in initial memory
        const lookupSlug = resolved.attemptedSlug;
        const fetchDirectProduct = async () => {
          try {
            const supabase = await getSupabase();
            const { data } = await supabase
              .from('products')
              .select('*')
              .or(`id.eq.${lookupSlug},slug.eq.${lookupSlug}`)
              .limit(1);

            if (data && data.length > 0) {
              const p = data[0];
              const prodObj: Product = {
                id: p.id,
                name: p.name,
                category: p.category,
                price: Number(p.price),
                originalPrice: p.original_price ? Number(p.original_price) : undefined,
                stockCount: p.stock_count ?? 50,
                rating: p.rating ? Number(p.rating) : 4.9,
                reviewCount: p.review_count ?? 15,
                imageUrl: p.image_url,
                images: p.images && Array.isArray(p.images) && p.images.length > 0 ? p.images : [p.image_url],
                colors: p.colors || ['Black'],
                shortDescription: p.short_description || p.description,
                fullDescription: p.full_description || p.description,
                description: p.short_description || p.description,
                warranty: p.warranty,
                features: p.features || ['Official gadget', 'High durability'],
                specs: p.specs || {},
                isFeatured: p.is_featured,
                isBestSeller: p.is_best_seller,
                isNewArrival: p.is_new_arrival,
                isBundle: p.is_bundle,
                isTravel: p.is_travel,
                sections: p.sections || ['All Products']
              };
              setProducts(prev => deduplicateProducts([prodObj, ...prev]));
              setCurrentView({ type: 'product', product: prodObj });
              const canonical = `/p/${getProductSlug(prodObj)}`;
              if (window.location.pathname !== canonical) {
                window.history.replaceState(null, '', canonical);
              }
            }
          } catch (e) {
            // keep 404 if not found in database either
          }
        };
        fetchDirectProduct();
      }
    }
  }, [products]);

  // Buy now shortcut
  const handleBuyNow = (product: Product, quantity = 1, color?: string) => {
    handleAddToCart(product, quantity, color);
    navigateView('checkout');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number, color?: string) => {
    const prod = products.find((p) => p.id === productId);
    const maxStock = prod ? (prod.stockCount ?? 50) : 999;
    const safeQty = Math.min(Math.max(1, quantity), maxStock);
    if (quantity > maxStock) {
      showToast(`সর্বোচ্চ উপলব্ধ স্টক ${maxStock} টি`);
    }
    setCart((prev) =>
      prev.map((item) => {
        const matches = color ? (item.product.id === productId && item.selectedColor === color) : item.product.id === productId;
        return matches ? { ...item, quantity: safeQty } : item;
      })
    );
  };

  const handleRemoveFromCart = (productId: string, color?: string) => {
    setCart((prev) =>
      prev.filter((item) => {
        if (color) {
          return !(item.product.id === productId && item.selectedColor === color);
        }
        return item.product.id !== productId;
      })
    );
  };

  const handleSelectProduct = (product: Product) => {
    // Fire Meta Pixel ViewContent event
    const priceInBdt = Math.round(product.price || 0);
    trackViewContent({
      id: product.id,
      name: product.name,
      price: priceInBdt,
      category: product.category,
      currency: 'BDT'
    });

    navigateView({ type: 'product', product });
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleSelectCategory = (categoryName: string) => {
    setActiveCategory(categoryName);
    if (categoryName === 'All') {
      navigateView('home');
    } else {
      navigateView({ type: 'category', categoryName });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleSearchSubmit = (query: string) => {
    navigateView({ type: 'search', query });
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleNavigateSection = (sectionId: string) => {
    if (currentView !== 'home') {
      navigateView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'instant' });
      }, 50);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'instant' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Global ScrollToTop Component */}
      <ScrollToTop currentView={currentView} />
      
      {/* 1. Navbar (Hidden on Admin page) */}
      {currentView !== 'admin' && (
        <Navbar
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          onOpenCart={() => setCartOpen(true)}
          onOpenAuth={() => {
            setCurrentView('profile');
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
          onOpenProfile={() => {
            setCurrentView('profile');
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
          currentCustomer={currentCustomer}
          onSelectProduct={handleSelectProduct}
          onNavigateSection={handleNavigateSection}
          products={products}
          currentCurrency={currentCurrency}
          onSelectCurrency={handleSelectCurrency}
          onOpenTrackOrder={() => {
            setCurrentView('track-order');
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
          onOpenHelp={() => {
            setCurrentView('help-center');
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
          onOpenCategory={handleSelectCategory}
          categories={categories}
          onNavigateView={(view) => {
            setCurrentView(view as any);
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
        />
      )}

      {/* 2. Slim Global Search Bar (Hidden on Product Details page, Admin panel & Checkout page) */}
      {currentView !== 'admin' && currentView !== 'checkout' && !(typeof currentView === 'object' && currentView.type === 'product') && (
        <SearchBar
          products={products}
          onSearchSubmit={handleSearchSubmit}
          onSelectProduct={handleSelectProduct}
        />
      )}

      <main className="flex-1">
        <React.Suspense fallback={<div className="min-h-[40vh] flex items-center justify-center"><div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
        {currentView === 'home' && (
          <div className="space-y-4">
            {/* 1. Hero Section (Two Banners) */}
            <HeroSection
              onShopNow={() => handleNavigateSection('featured')}
              banners={banners}
            />

            {/* 2. Shop by Category */}
            <ShopByCategory
              onSelectCategory={handleSelectCategory}
              onViewAllCategories={() => {
                setCurrentView('all-categories');
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              }}
              activeCategory={activeCategory}
              categories={categories}
            />

            {/* 3. Featured Products */}
            <FeaturedProducts
              products={products}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onBuyNow={(prod, qty, col) => handleBuyNow(prod, qty, col)}
              onViewAll={() => {
                setCurrentView('featured-products');
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              }}
              currentCurrency={currentCurrency}
            />

            {/* 4. Promo Banners (Duo Banners) */}
            <PromoDuoBanners
              onShopCharging={() => handleSelectCategory('Charging')}
              onShopAudio={() => handleSelectCategory('Audio')}
            />

            {/* 5. All Products Section */}
            <div id="all-products" className="py-8 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl sm:text-[28px] font-black text-gray-950 tracking-tight">
                    All Products ({products.length})
                  </h2>
                  <button
                    onClick={() => {
                      setCurrentView('all-products');
                      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                    }}
                    className="group flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <span>সবগুলো দেখুন ({products.length})</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                  {products.slice(0, 24).map((prod, pIdx) => (
                    <ProductCard
                      key={`${prod.id}-${pIdx}`}
                      product={prod}
                      onSelectProduct={handleSelectProduct}
                      onAddToCart={handleAddToCart}
                      onBuyNow={handleBuyNow}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 6. Travel Collection / Banner */}
            <div>
              <TravelCollectionBanner onShopTravel={() => handleSelectCategory('Smart Accessories')} />
            </div>

            {/* 7. Best Sellers & Bundle Section */}
            <div>
              <BestSellersAndBundle
                products={products}
                onSelectProduct={handleSelectProduct}
                onAddToCart={handleAddToCart}
                onBuyNow={(prod, qty, col) => handleBuyNow(prod, qty, col)}
                onShopBundles={() => handleSelectCategory('Adapters & Hubs')}
                onViewAllBestSellers={() => {
                  setCurrentView('best-sellers');
                  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                }}
                currentCurrency={currentCurrency}
              />
            </div>

            {/* 8. Customer Reviews & Newsletter */}
            <div>
              <CustomerReviewsSlider />
            </div>
            <div>
              <ValuePropsAndNewsletter
              onSubscribe={async (email) => {
                const emailList = subscribers.map(s => typeof s === 'string' ? s : s.email);
                if (!emailList.includes(email)) {
                  const newSub = { id: Date.now().toString(), email, date: new Date().toLocaleDateString('en-CA') };
                  const nextSubs = [newSub, ...subscribers];
                  setSubscribers(nextSubs);
                  safeStorage.setItem('ghm_subscribers', JSON.stringify(nextSubs));
                  showToast('নিউজলেটারে সফলভাবে সাবস্ক্রাইব হয়েছে!');
                  try {
                    const supabase = await getSupabase();
                    await supabase.from('subscribers').upsert({ email });
                  } catch (e) {}
                } else {
                  showToast('Email already subscribed.');
                }
              }}
            />
            </div>
          </div>
        )}

        {currentView === 'all-categories' && (
          <AllCategoriesPage
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            onSelectCategory={handleSelectCategory}
            currentCurrency={currentCurrency}
            categories={categories}
          />
        )}

        {currentView === 'featured-products' && (
          <FeaturedProductsPage
            products={products}
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            currentCurrency={currentCurrency}
          />
        )}

        {currentView === 'all-products' && (
          <AllProductsPage
            products={products}
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            currentCurrency={currentCurrency}
          />
        )}

        {currentView === 'best-sellers' && (
          <BestSellersPage
            products={products}
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            currentCurrency={currentCurrency}
          />
        )}

        {currentView === 'admin' && (
          <AdminPage
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            products={products}
            onUpdateProducts={(prods) => {
              const dedup = deduplicateProducts(prods);
              setProducts(dedup);
              safeStorage.setItem('ghm_products', JSON.stringify(dedup));
            }}
            categories={categories}
            onUpdateCategories={(cats) => {
              const dedup = deduplicateCategories(cats);
              setCategories(dedup);
              safeStorage.setItem('ghm_categories', JSON.stringify(dedup));
            }}
            orders={orders}
            onUpdateOrders={(ords) => {
              setOrders(ords);
              safeStorage.setItem('ghm_orders', JSON.stringify(ords));
            }}
            incompleteOrders={incompleteOrders}
            subscribers={subscribers}
            banners={banners}
            onUpdateBanners={(bns) => {
              setBanners(bns);
              safeStorage.setItem('ghm_banners', JSON.stringify(bns));
            }}
            coupons={coupons}
            onUpdateCoupons={(cps) => {
              setCoupons(cps);
              safeStorage.setItem('ghm_coupons', JSON.stringify(cps));
            }}
            currentCurrency={currentCurrency}
            onAdjustStock={adjustProductStock}
          />
        )}

        {typeof currentView === 'object' && currentView.type === 'product' && (
          <ProductDetailPage
            product={currentView.product}
            allProducts={products}
            onBack={() => {
              navigateView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            currentCurrency={currentCurrency}
          />
        )}

        {typeof currentView === 'object' && currentView.type === '404' && (
          <ProductNotFoundPage
            attemptedSlug={currentView.attemptedSlug}
            onNavigateHome={() => {
              navigateView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            onSearch={handleSearchSubmit}
            recommendedProducts={products}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onBuyNow={(prod) => handleBuyNow(prod, 1)}
          />
        )}

        {typeof currentView === 'object' && currentView.type === 'category' && (
          <CategoryPage
            categoryName={currentView.categoryName}
            allProducts={products}
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onBuyNow={(prod) => {
              const defaultColor = prod.colors?.[0];
              const colorName = defaultColor ? (typeof defaultColor === 'string' ? defaultColor : defaultColor.name) : undefined;
              handleBuyNow(prod, 1, colorName);
            }}
            currentCurrency={currentCurrency}
            onSelectCategory={handleSelectCategory}
            categories={categoriesList}
          />
        )}

        {typeof currentView === 'object' && currentView.type === 'search' && (
          <SearchResultsPage
            query={currentView.query}
            products={products}
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onBuyNow={(prod) => handleBuyNow(prod, 1)}
            currentCurrency={currentCurrency}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage
            items={cart}
            currentCurrency={currentCurrency}
            coupons={coupons}
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            onRemoveItem={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onOrderSuccess={async (id, orderDetails) => {
              const newOrd = { 
                id, 
                ...orderDetails, 
                email: orderDetails.email || currentCustomer?.email || '',
                status: 'Pending' as const, 
                date: new Date().toLocaleDateString('en-CA') 
              };
              const updatedOrders = [newOrd, ...orders];
              setOrders(updatedOrders);
              safeStorage.setItem('ghm_orders', JSON.stringify(updatedOrders));
              showToast(`Order #${id} confirmed successfully!`);

              // Automatically deduct stock for bought items
              adjustProductStock(orderDetails.items, 'deduct');

              try {
                const supabase = await getSupabase();
                await supabase.from('orders').upsert({
                  id: newOrd.id,
                  customer_name: newOrd.customerName,
                  phone: newOrd.phone,
                  email: newOrd.email || null,
                  address: newOrd.address,
                  items: newOrd.items,
                  total: newOrd.total,
                  status: newOrd.status
                });
              } catch (e) {
                console.error(e);
              }
            }}
            onIncompleteOrder={async (details) => {
              const inc = { id: Date.now().toString(), ...details, date: new Date().toLocaleTimeString() };
              setIncompleteOrders(prev => [inc, ...prev.filter(x => x.phone !== details.phone)]);

              try {
                const supabase = await getSupabase();
                await supabase.from('incomplete_orders').upsert({
                  id: inc.id,
                  phone: inc.phone,
                  customer_name: inc.customerName,
                  address: inc.address,
                  cart_summary: inc.cartSummary,
                  total: inc.total
                });
              } catch (e) {}
            }}
            onClearCart={() => setCart([])}
          />
        )}

        {currentView === 'profile' && (
          <ProfilePage
            currentCustomer={currentCustomer}
            onCustomerChange={(cust) => setCurrentCustomer(cust)}
            orders={orders}
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            onNavigateHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            onNavigateAllProducts={() => {
              setCurrentView('all-products');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
          />
        )}

        {currentView === 'new-arrivals' && (
          <NewArrivalsPage
            products={products}
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            currentCurrency={currentCurrency}
          />
        )}

        {currentView === 'bundles' && (
          <BundlesPage
            products={products}
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            currentCurrency={currentCurrency}
          />
        )}

        {currentView === 'gift-cards' && (
          <GiftCardsPage
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            currentCurrency={currentCurrency}
          />
        )}

        {currentView === 'track-order' && (
          <TrackOrderPage
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            orders={orders}
          />
        )}

        {currentView === 'help-center' && (
          <HelpCenterPage
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            onNavigateContact={() => {
              setCurrentView('contact-us');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
          />
        )}

        {(currentView === 'shipping-returns' || currentView === 'shipping-policy') && (
          <ShippingReturnsPage
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
          />
        )}

        {currentView === 'warranty-policy' && (
          <WarrantyPolicyPage
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
          />
        )}

        {currentView === 'contact-us' && (
          <ContactUsPage
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
          />
        )}

        {currentView === 'about-us' && (
          <AboutUsPage
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
          />
        )}

        {currentView === 'careers' && (
          <CareersPage
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
          />
        )}

        {currentView === 'press' && (
          <PressPage
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
          />
        )}

        {currentView === 'affiliates' && (
          <AffiliatesPage
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
          />
        )}

        {currentView === 'privacy-policy' && (
          <PrivacyPolicyPage
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
          />
        )}

        {currentView === 'terms-of-service' && (
          <TermsOfServicePage
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
          />
        )}

        {currentView === 'security' && (
          <SecurityPage
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
          />
        )}
        </React.Suspense>
      </main>

      {/* 4. Footer (Hidden on Admin page) */}
      {currentView !== 'admin' && (
        <Footer
          onNavigateSection={handleNavigateSection}
          onNavigateView={(view) => {
            setCurrentView(view as any);
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
          onOpenTrackOrder={() => {
            setCurrentView('track-order');
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
          onOpenHelp={() => {
            setCurrentView('help-center');
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
          onOpenAdmin={() => {
            setCurrentView('admin');
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
        />
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          items={cart}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onProceedToCheckout={() => {
            setCartOpen(false);
            setCurrentView('checkout');
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
          currentCurrency={currentCurrency}
        />
      )}

      {/* Track Order Modal */}
      {trackOrderOpen && (
        <React.Suspense fallback={null}>
          <TrackOrderModal
            isOpen={trackOrderOpen}
            onClose={() => setTrackOrderOpen(false)}
          />
        </React.Suspense>
      )}

      {/* Help / Support Modal */}
      {helpOpen && (
        <React.Suspense fallback={null}>
          <HelpModal
            isOpen={helpOpen}
            onClose={() => setHelpOpen(false)}
          />
        </React.Suspense>
      )}

      {/* Auth Modal */}
      {authOpen && (
        <React.Suspense fallback={null}>
          <AuthModal
            isOpen={authOpen}
            onClose={() => setAuthOpen(false)}
            onSuccess={(name) => {
              showToast(`Welcome back, ${name}!`);
            }}
          />
        </React.Suspense>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0a192f] text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-bold flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
