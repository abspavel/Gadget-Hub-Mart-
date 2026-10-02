import React from 'react';
import { Sparkles } from 'lucide-react';
import { Product, Currency } from '../types';
import { ProductCard } from './ProductCard';

interface FeaturedProductsPageProps {
  products: Product[];
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, color?: string, e?: React.MouseEvent) => void;
  onBuyNow: (product: Product, quantity: number, color?: string) => void;
  currentCurrency?: Currency;
}

export const FeaturedProductsPage: React.FC<FeaturedProductsPageProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
}) => {
  const featured = products.filter(p => p.isFeatured || p.badge === 'Hot' || p.badge === 'New' || p.badge === 'Sale');

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-3 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl flex items-center justify-between">
          <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-1.5 max-w-xl">
            <span className="bg-blue-500/30 text-blue-300 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Curated Collection
            </span>
            <h1 className="text-xl sm:text-3xl font-black tracking-tight">
              Featured Tech & Gadgets
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Hand-picked high performance accessories tested and verified for supreme durability.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-gray-950">All Featured Items ({featured.length})</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {featured.map((prod, idx) => (
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
