import React from 'react';
import { Sparkles } from 'lucide-react';
import { Product, Currency } from '../types';
import { ProductCard } from './ProductCard';

interface AllProductsPageProps {
  products: Product[];
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, color?: string, e?: React.MouseEvent) => void;
  onBuyNow: (product: Product, quantity: number, color?: string) => void;
  currentCurrency?: Currency;
}

export const AllProductsPage: React.FC<AllProductsPageProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
}) => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-3 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 shadow-xl flex items-center justify-between">
          <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-1.5 max-w-xl">
            <span className="bg-blue-500/30 text-blue-300 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Complete Store Catalog
            </span>
            <h1 className="text-xl sm:text-3xl font-black tracking-tight">
              All Gadgets & Accessories
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Explore our full inventory of chargers, cables, audio gear, and smart smartphone holders.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-gray-950">All Products ({products.length})</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {products.map((prod, idx) => (
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
