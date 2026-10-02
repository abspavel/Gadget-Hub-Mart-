import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Product, Currency } from '../types';
import { ProductCard } from './ProductCard';

interface NewArrivalsPageProps {
  products: Product[];
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, color?: string, e?: React.MouseEvent) => void;
  onBuyNow: (product: Product, quantity: number, color?: string) => void;
  currentCurrency?: Currency;
}

export const NewArrivalsPage: React.FC<NewArrivalsPageProps> = ({
  products,
  onBack,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
}) => {
  // Select products marked as new arrival, or most recently added
  const newArrivalList = products.filter(p => p.isNewArrival);
  const newProducts = newArrivalList.length > 0 ? newArrivalList : [...products].reverse().slice(0, 12);

  return (
    <div className="min-h-screen bg-gray-50/60 pt-4 pb-20 px-3.5 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-blue-600 bg-white px-4 py-2 rounded-full border border-gray-200/80 shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>হোমে ফিরে যান</span>
          </button>
          <span className="text-xs text-gray-500 font-medium">
            মোট {newProducts.length} টি নতুন গ্যাজেট
          </span>
        </div>

        {/* Hero Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-xl space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/20">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              New Launches 2026
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              New Arrivals
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              সর্বাধুনিক প্রযুক্তির নতুন লঞ্চ হওয়া প্রিমিয়াম গ্যাজেট ও অ্যাক্সেসরিজসমূহ।
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {newProducts.map((product, idx) => (
            <ProductCard
              key={`${product.id}-${idx}`}
              product={product}
              badgeText="NEW"
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
