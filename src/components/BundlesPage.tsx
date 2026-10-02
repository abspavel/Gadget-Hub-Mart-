import React, { useState } from 'react';
import { ArrowLeft, PackageCheck, ShoppingBag, Zap, Check } from 'lucide-react';
import { Product, Currency } from '../types';
import { formatBdtPrice, ProductCard } from './ProductCard';

interface BundlesPageProps {
  products: Product[];
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, color?: string, e?: React.MouseEvent) => void;
  onBuyNow: (product: Product, quantity: number, color?: string) => void;
  currentCurrency?: Currency;
}

export const BundlesPage: React.FC<BundlesPageProps> = ({
  products,
  onBack,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
}) => {
  const [addedComboId, setAddedComboId] = useState<string | null>(null);

  const dynamicBundles = products.filter(p => p.isBundle);

  const bundleKits = [
    {
      id: 'bundle-desk-pro',
      title: 'Ultimate Desk Setup Combo',
      description: '65W GaN Fast Charger + 100W Braided Cable + Aluminum Laptop Stand',
      discountPrice: 4200,
      originalPrice: 5800,
      saveAmount: 1600,
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
      items: ['FlexaGear 65W GaN Charger', 'Pro 100W USB-C Cable (2M)', 'Ergonomic Laptop Riser Stand']
    },
    {
      id: 'bundle-audio-travel',
      title: 'Traveler Audio & Power Kit',
      description: 'Active Noise Cancelling Earbuds + 20,000mAh Power Bank + Hard Case',
      discountPrice: 5400,
      originalPrice: 7200,
      saveAmount: 1800,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      items: ['Hi-Fi ANC Wireless Earbuds', '20,000mAh 45W Fast Power Bank', 'Shockproof Travel Organizer']
    },
    {
      id: 'bundle-car-commute',
      title: 'Smart Commute Car Pack',
      description: 'Magnetic Fast Wireless Car Mount + Dual-port 45W Car Charger + USB-C Cable',
      discountPrice: 2800,
      originalPrice: 3800,
      saveAmount: 1000,
      imageUrl: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
      items: ['MagSafe 15W Auto-clamping Mount', 'Super Fast 45W Dual Car Adapter', 'Tangle-Free 1.2M Cable']
    }
  ];

  const handleComboAddToCart = (bundle: typeof bundleKits[0], e: React.MouseEvent) => {
    e.stopPropagation();
    const fallbackProd = products[0];
    const comboProd: Product = {
      id: bundle.id,
      name: bundle.title,
      category: 'Bundles & Deals',
      price: bundle.discountPrice,
      originalPrice: bundle.originalPrice,
      rating: 4.9,
      reviewCount: 42,
      imageUrl: bundle.imageUrl,
      description: bundle.description,
      specs: fallbackProd?.specs || { compatibility: 'Universal', material: 'Premium Kit', dimensions: 'Combo Box', warranty: '1 Year' },
      features: bundle.items
    };
    onAddToCart(comboProd, 1, 'Default', e);
    setAddedComboId(bundle.id);
    setTimeout(() => setAddedComboId(null), 1200);
  };

  const handleComboBuyNow = (bundle: typeof bundleKits[0]) => {
    const fallbackProd = products[0];
    const comboProd: Product = {
      id: bundle.id,
      name: bundle.title,
      category: 'Bundles & Deals',
      price: bundle.discountPrice,
      originalPrice: bundle.originalPrice,
      rating: 4.9,
      reviewCount: 42,
      imageUrl: bundle.imageUrl,
      description: bundle.description,
      specs: fallbackProd?.specs || { compatibility: 'Universal', material: 'Premium Kit', dimensions: 'Combo Box', warranty: '1 Year' },
      features: bundle.items
    };
    onBuyNow(comboProd, 1, 'Default');
  };

  return (
    <div className="min-h-screen bg-gray-50/60 pt-4 pb-20 px-3.5 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-blue-600 bg-white px-4 py-2 rounded-full border-0 shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>হোমে ফিরে যান</span>
          </button>
          <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full">
            স্পেশাল কম্বো অফার
          </span>
        </div>

        {/* Hero */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-xl space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
              <PackageCheck className="w-3.5 h-3.5 text-emerald-400" />
              Super Saver Combos
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Exclusive Bundles & Deals
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              একসাথে কিনুন আর সাশ্রয় করুন আকর্ষণীয় ছাড়! একাধিক গ্যাজেট কম্বো প্যাকেজে স্পেশাল ডিসকাউন্ট।
            </p>
          </div>
        </div>

        {/* Dynamic Bundles from Admin if any */}
        {dynamicBundles.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-base font-extrabold text-gray-900">স্টোরের কম্বো প্রোডাক্টস</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {dynamicBundles.map((b) => (
                <ProductCard
                  key={b.id}
                  product={b}
                  badgeText="COMBO"
                  onSelectProduct={onSelectProduct}
                  onAddToCart={onAddToCart}
                  onBuyNow={onBuyNow}
                />
              ))}
            </div>
          </div>
        )}

        {/* Curated Bundle Cards */}
        <div className="space-y-3">
          <h3 className="text-base font-extrabold text-gray-900">কিউরেটেড কম্বো প্যাকেজ</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {bundleKits.map((bundle) => {
              const isAdded = addedComboId === bundle.id;
              return (
                <div
                  key={bundle.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between border-0"
                >
                  <div>
                    {/* Strictly Square Visual with no colored border */}
                    <div className="relative aspect-square w-full rounded-xl bg-gray-50 overflow-hidden mb-3 border-0">
                      <img
                        src={bundle.imageUrl}
                        alt={bundle.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <span className="absolute top-2.5 right-2.5 bg-red-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-sm z-10">
                        SAVE {formatBdtPrice(bundle.saveAmount)}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                      {bundle.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                      {bundle.description}
                    </p>

                    <div className="space-y-1 mb-4 border-t border-gray-100 pt-2.5">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">প্যাকেজে অন্তর্ভুক্ত:</div>
                      {bundle.items.map((it, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{it}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-lg sm:text-xl font-black text-gray-950">
                        {formatBdtPrice(bundle.discountPrice)}
                      </span>
                      <span className="text-xs text-gray-400 line-through font-medium">
                        {formatBdtPrice(bundle.originalPrice)}
                      </span>
                    </div>

                    {/* Both Cart & Buy Buttons for every bundle */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={(e) => handleComboAddToCart(bundle, e)}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                          isAdded ? 'bg-emerald-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                        title="কার্টে যোগ করুন"
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>যোগ হয়েছে</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Cart</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleComboBuyNow(bundle)}
                        className="w-full py-2.5 bg-[#0a192f] hover:bg-blue-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
                        title="এখনই অর্ডার করুন"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>Buy</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
