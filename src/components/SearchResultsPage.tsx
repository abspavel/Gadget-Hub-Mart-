import React from 'react';
import { Sparkles, Search } from 'lucide-react';
import { Product, Currency } from '../types';
import { ProductCard } from './ProductCard';

interface SearchResultsPageProps {
  query: string;
  products: Product[];
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, color?: string, e?: React.MouseEvent) => void;
  onBuyNow?: (product: Product, quantity: number, color?: string) => void;
  currentCurrency?: Currency;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  query,
  products,
  onBack,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
}) => {
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-3 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl flex items-center justify-between">
          <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-1.5 max-w-xl">
            <span className="bg-blue-500/30 text-blue-300 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Search Results
            </span>
            <h1 className="text-xl sm:text-3xl font-black tracking-tight">
              "{query}"
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Found {filtered.length} products matching your search criteria.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-gray-950">Matching Products ({filtered.length})</h2>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {filtered.map((prod, idx) => (
                <ProductCard
                  key={`${prod.id}-${idx}`}
                  product={prod}
                  onSelectProduct={onSelectProduct}
                  onAddToCart={onAddToCart}
                  onBuyNow={onBuyNow ? onBuyNow : () => {}}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border-0 shadow-sm text-center space-y-3">
              <Search className="w-10 h-10 mx-auto text-gray-300" />
              <h3 className="text-base font-bold text-gray-900">No products found for "{query}"</h3>
              <p className="text-xs text-gray-500">Try searching with a different keyword or category.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
