import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, ShieldCheck, Truck, RotateCcw, Check, Plus, Minus, Zap, ArrowLeft, Link2, Copy, Share2 } from 'lucide-react';
import { Product, Currency } from '../types';
import { formatBdtPrice, ProductCard } from './ProductCard';
import { trackViewContent } from '../utils/pixel';
import { getProductSlug } from '../utils/slug';
import { buildCanonicalProductUrl } from '../utils/shortLinks';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number, color?: string) => void;
  onBuyNow: (product: Product, quantity: number, color?: string) => void;
  currentCurrency?: Currency;
  onSelectProduct: (product: Product) => void;
  allProducts: Product[];
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  allProducts,
}) => {
  // Fire Meta Pixel ViewContent event on Product Detail Page
  useEffect(() => {
    const priceInBdt = Math.round(product.price || 0);
    trackViewContent({
      id: product.id,
      name: product.name,
      price: priceInBdt,
      category: product.category,
      currency: 'BDT'
    });
  }, [product.id, product.name, product.price, product.category]);
  // Collect 2-3 images
  const imageList = product.images && product.images.length > 0 
    ? product.images 
    : [product.imageUrl || 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80'];

  const activeImages = imageList.length >= 2 
    ? imageList 
    : [imageList[0], imageList[0], imageList[0]];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const initialColor = product.colors?.[0];
  const initialColorName = initialColor ? (typeof initialColor === 'string' ? initialColor : initialColor.name) : 'Black';
  
  const [selectedColor, setSelectedColor] = useState<string>(initialColorName);
  const [quantity, setQuantity] = useState(1);
  const [addedAnim, setAddedAnim] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedColor);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1500);
  };

  const handleBuy = () => {
    onBuyNow(product, quantity, selectedColor);
  };

  const handleCopyCleanLink = () => {
    const slug = getProductSlug(product);
    const cleanUrl = buildCanonicalProductUrl(slug);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(cleanUrl).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-3 pb-20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-4 animate-in fade-in duration-200">
        
        {/* Navigation & Clean Share Top Bar */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-blue-600 bg-white px-4 py-2 rounded-full border border-gray-200/80 shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>হোমে ফিরে যান</span>
          </button>

          <button
            onClick={handleCopyCleanLink}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 bg-white px-3.5 py-2 rounded-full border border-gray-200/80 shadow-2xs transition-all cursor-pointer active:scale-95"
            title="মার্কেটিং এর জন্য পরিষ্কার লিংক কপি করুন"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">ক্লিন লিংক কপি হয়েছে!</span>
              </>
            ) : (
              <>
                <Link2 className="w-3.5 h-3.5 text-blue-600" />
                <span>ক্লিন লিংক কপি করুন</span>
              </>
            )}
          </button>
        </div>

        {/* Main Product Section */}
        <div className="bg-white rounded-3xl border-0 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 p-4 sm:p-10">
          
          {/* Left: Multi-Image Gallery & Visual Display */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Main Active Image Preview (Square) */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center border-0 shadow-xs">
              {product.badge && !/স্টক|মজুদ|stock|ইন স্টক|৫০/i.test(product.badge) && (
                <span className="absolute top-4 left-4 z-10 bg-[#0a192f] text-white text-[10px] sm:text-xs font-black px-3.5 py-1.5 rounded-full shadow-md uppercase tracking-wider">
                  {product.badge}
                </span>
              )}
              <img
                src={activeImages[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl transition-all duration-300"
              />
            </div>

            {/* Thumbnail Selector (2-3 Images) */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {activeImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-blue-600 ring-2 ring-blue-600/30 scale-105' : 'border-gray-200 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>১০০% আসল ও প্রিমিয়াম কোয়ালিটি নিশ্চয়তা</span>
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-700">
                  {product.rating || 4.9} ({product.reviewCount || 15} রিভিউ)
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{product.category}</span>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Price Block (100% Bangladeshi Taka ৳) */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl sm:text-3xl font-black text-[#0a192f]">
                  {formatBdtPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-bold text-gray-400 line-through">
                    {formatBdtPrice(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              {/* Stock Status & Warranty Badge */}
              <div className="flex items-center gap-2.5 flex-wrap pt-0.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>
                    স্টক: {product.stockCount !== undefined ? `${product.stockCount} টি মজুদ আছে` : 'স্টকে আছে (ইন স্টক)'}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100/80">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>১০০% আসল ও অরিজিনাল পণ্য</span>
                </div>
              </div>

              {/* Short Description */}
              <div className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-1 bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-1">সংক্ষিপ্ত বিবরণ</span>
                {product.shortDescription || product.description}
              </div>

              {/* Color Options - Customer selects color */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold text-gray-900">
                    কালার নির্বাচন করুন: <span className="text-blue-600 font-black">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {product.colors.map((col, idx) => {
                      const colorName = typeof col === 'string' ? col : col.name;
                      const isSelected = selectedColor === colorName;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedColor(colorName)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                            isSelected 
                              ? 'bg-blue-600 text-white shadow-xs' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                          <span>{colorName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity selector */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-gray-900">পরিমাণ (Quantity)</label>
                <div className="inline-flex items-center rounded-xl bg-gray-100 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-12 text-center text-xs font-black text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Action Buttons: Cart & Buy */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAdd}
                  className={`w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                    addedAnim 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {addedAnim ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>কার্টে যোগ হয়েছে!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>কার্টে রাখুন (Add to Cart)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuy}
                  className="w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-98"
                >
                  <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>এখনই কিনুন (Buy Now)</span>
                </button>
              </div>

              {/* Delivery info */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-gray-600 font-medium">
                <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl">
                  <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>ঢাকায় ৮০৳ • ঢাকার বাইরে ১২০৳</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl">
                  <RotateCcw className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>৭ দিনের সহজ রিটার্ন</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ================= SECTION BELOW BUY NOW: BIG DESCRIPTION, FEATURES, WARRANTY ================= */}
        <div className="space-y-6 pt-4">
          
          {/* Big Detailed Description */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 space-y-3 shadow-2xs border border-gray-100">
            <h3 className="text-base sm:text-lg font-black text-gray-950 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span>প্রোডাক্টের বিস্তারিত বিবরণ (Full Description)</span>
            </h3>
            <div className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50/50 p-4 sm:p-5 rounded-2xl border border-gray-100/80">
              {product.fullDescription || product.description}
            </div>
          </div>

          {/* Specifications, Features & Warranty Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs border border-gray-100">
              <h3 className="text-base font-black text-gray-950 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <span>টেকনিক্যাল স্পেসিফিকেশন</span>
              </h3>
              <div className="divide-y divide-gray-100 text-xs">
                <div className="py-2.5 flex justify-between"><span className="text-gray-500 font-semibold">কম্প্যাটিবিলিটি</span><span className="font-bold text-gray-900">{product.specs?.compatibility || 'Universal'}</span></div>
                <div className="py-2.5 flex justify-between"><span className="text-gray-500 font-semibold">ম্যাটেরিয়াল</span><span className="font-bold text-gray-900">{product.specs?.material || 'Premium Alloy'}</span></div>
                <div className="py-2.5 flex justify-between"><span className="text-gray-500 font-semibold">ডাইমেনশন</span><span className="font-bold text-gray-900">{product.specs?.dimensions || 'Compact'}</span></div>
                <div className="py-2.5 flex justify-between"><span className="text-gray-500 font-semibold">কোয়ালিটি গ্রেড</span><span className="font-bold text-emerald-600">Official Brand Quality</span></div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs border border-gray-100">
              <h3 className="text-base font-black text-gray-950 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span>মূল ফিচারসমূহ (Key Features)</span>
              </h3>
              <ul className="space-y-2.5 text-xs">
                {(product.features && product.features.length > 0 ? product.features : ['High durability & premium finish', 'Fast charging and data support', 'Official brand authentic quality', 'Drop-tested and reliable design']).map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-gray-700 font-medium bg-gray-50/80 p-2.5 rounded-xl border border-gray-100/60">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-black text-xs">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-black text-gray-950">রিলেটেড প্রোডাক্টস ({product.category})</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  onSelectProduct={(p) => {
                    onSelectProduct(p);
                    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                  }}
                  onAddToCart={(p, qty, col, e) => onAddToCart(p, qty, col)}
                  onBuyNow={(p, qty, col) => onBuyNow(p, qty, col)}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
