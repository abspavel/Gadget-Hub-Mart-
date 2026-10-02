import React from 'react';
import { Sparkles } from 'lucide-react';
import { Product, Currency } from '../types';
import { ProductCard } from './ProductCard';

interface BestSellersPageProps {
  products: Product[];
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, color?: string, e?: React.MouseEvent) => void;
  onBuyNow: (product: Product, quantity: number, color?: string) => void;
  currentCurrency?: Currency;
}

export const BestSellersPage: React.FC<BestSellersPageProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
}) => {
  const bestSellers = products.filter(p => p.isBestSeller || (p.rating && p.rating >= 4.8));

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-3 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl flex items-center justify-between">
          <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-1.5 max-w-xl">
            <span className="bg-emerald-500/30 text-emerald-300 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Top Rated Favorites
            </span>
            <h1 className="text-xl sm:text-3xl font-black tracking-tight">
              Best Selling Gadgets & Bundles
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              The most popular customer-loved tech accessories with lightning-fast delivery across Bangladesh.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-gray-950">Top Best Sellers ({bestSellers.length} Items)</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {bestSellers.map((prod, idx) => (
              <ProductCard
                key={`${prod.id}-${idx}`}
                product={prod}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
