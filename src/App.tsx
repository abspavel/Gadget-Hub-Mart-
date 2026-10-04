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
import { TrackOrderModal } from './components/TrackOrderModal';
import { HelpModal } from './components/HelpModal';
import { AuthModal } from './components/AuthModal';
import { AdminPage } from './components/AdminPage';
import { AllCategoriesPage } from './components/AllCategoriesPage';
import { FeaturedProductsPage } from './components/FeaturedProductsPage';
import { AllProductsPage } from './components/AllProductsPage';
import { BestSellersPage } from './components/BestSellersPage';
import { SearchResultsPage } from './components/SearchResultsPage';
import { ScrollToTop } from './components/ScrollToTop';
import { ProductCard } from './components/ProductCard';
import { supabase } from './lib/supabase';
import { safeStorage, idbGet } from './utils/safeStorage';

import { ProductDetailPage } from './components/ProductDetailPage';
import { CategoryPage } from './components/CategoryPage';
import { CheckoutPage } from './components/CheckoutPage';

import { NewArrivalsPage } from './components/NewArrivalsPage';
import { BundlesPage } from './components/BundlesPage';
import { GiftCardsPage } from './components/GiftCardsPage';
import { TrackOrderPage } from './components/TrackOrderPage';
import { HelpCenterPage } from './components/HelpCenterPage';
import { ShippingReturnsPage } from './components/ShippingReturnsPage';
import { WarrantyPolicyPage } from './components/WarrantyPolicyPage';
import { ContactUsPage } from './components/ContactUsPage';
import { AboutUsPage } from './components/AboutUsPage';
import { CareersPage } from './components/CareersPage';
import { PressPage } from './components/PressPage';
import { AffiliatesPage } from './components/AffiliatesPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { SecurityPage } from './components/SecurityPage';
import { ProfilePage } from './components/ProfilePage';

import { ALL_PRODUCTS, CURRENCIES, CATEGORIES } from './data/products';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_BANNERS } from './data/initialData';
import { Product, CartItem, Currency, CategoryItem, CustomerUser } from './types';
import { getCurrentCustomer } from './utils/customerAuth';
import { trackPageView, trackAddToCart, trackViewContent } from './utils/pixel';
import { Check, ShoppingBag, Zap, ShieldAlert, ArrowRight } from 'lucide-react';

type ViewState =
  | 'home'
  | { type: 'product'; product: Product }
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

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = safeStorage.getItem('ghm_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return deduplicateProducts(parsed);
      }
    } catch (e) {}
    return deduplicateProducts(INITIAL_PRODUCTS);
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
  const [currentView, setCurrentView] = useState<ViewState>('home');
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
    fetchInitialData();
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
    const amount = price < 500 ? Math.round(price * 120) : Math.round(price);
    return `৳${amount.toLocaleString('en-US')}`;
  };

  // Add to cart from card or detail page
  const handleAddToCart = (product: Product, quantity = 1, color?: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    // Fire Meta Pixel AddToCart event
    const priceInBdt = product.price < 500 ? Math.round(product.price * 120) : Math.round(product.price);
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
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, quantity, selectedColor: color }];
      }
    });

    showToast(`Added "${product.name}" to cart`);
  };

  // Buy now shortcut
  const handleBuyNow = (product: Product, quantity = 1, color?: string) => {
    handleAddToCart(product, quantity, color);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleSelectProduct = (product: Product) => {
    // Fire Meta Pixel ViewContent event
    const priceInBdt = product.price < 500 ? Math.round(product.price * 120) : Math.round(product.price);
    trackViewContent({
      id: product.id,
      name: product.name,
      price: priceInBdt,
      category: product.category,
      currency: 'BDT'
    });

    setCurrentView({ type: 'product', product });
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleSelectCategory = (categoryName: string) => {
    setActiveCategory(categoryName);
    if (categoryName === 'All') {
      setCurrentView('home');
    } else {
      setCurrentView({ type: 'category', categoryName });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleSearchSubmit = (query: string) => {
    setCurrentView({ type: 'search', query });
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleNavigateSection = (sectionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
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

      {/* 3. Main Content Router */}
      <main className="flex-1">
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
            <TravelCollectionBanner onShopTravel={() => handleSelectCategory('Smart Accessories')} />

            {/* 7. Best Sellers & Bundle Section */}
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

            {/* 8. Customer Reviews & Newsletter */}
            <CustomerReviewsSlider />
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
                    await supabase.from('subscribers').upsert({ email });
                  } catch (e) {}
                } else {
                  showToast('Email already subscribed.');
                }
              }}
            />
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
          />
        )}

        {typeof currentView === 'object' && currentView.type === 'product' && (
          <ProductDetailPage
            product={currentView.product}
            allProducts={products}
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

              try {
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

              await supabase.from('incomplete_orders').upsert({
                id: inc.id,
                phone: inc.phone,
                customer_name: inc.customerName,
                address: inc.address,
                cart_summary: inc.cartSummary,
                total: inc.total
              });
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

        {currentView === 'shipping-returns' && (
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

      {/* Track Order Modal */}
      <TrackOrderModal
        isOpen={trackOrderOpen}
        onClose={() => setTrackOrderOpen(false)}
      />

      {/* Help / Support Modal */}
      <HelpModal
        isOpen={helpOpen}
        onClose={() => setHelpOpen(false)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={(name) => {
          showToast(`Welcome back, ${name}!`);
        }}
      />

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
