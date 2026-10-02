import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { ProductCard } from './ProductCard';

interface CategoryPageProps {
  categoryName: string;
  allProducts: Product[];
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, color?: string, e?: React.MouseEvent) => void;
  onBuyNow: (product: Product, quantity: number, color?: string) => void;
  currentCurrency?: Currency;
  onSelectCategory: (cat: string) => void;
  categories: string[];
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categoryName,
  allProducts,
  onBack,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
  onSelectCategory,
  categories,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');

  const filtered = categoryName === 'All'
    ? allProducts
    : allProducts.filter(p => {
        const pCat = (p.category || '').toLowerCase().trim();
        const target = categoryName.toLowerCase().trim();
        return pCat === target || 
               pCat.replace(/\s+/g, '-') === target || 
               target.replace(/\s+/g, '-') === pCat ||
               pCat.replace(/-/g, ' ') === target.replace(/-/g, ' ');
      });

  const sortedProducts = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-3 pb-20 px-3.5 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Category Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-400 bg-blue-500/20 px-2.5 py-0.5 rounded-full inline-block">
              Category
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight capitalize">
              {categoryName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Browse top verified accessories in the {categoryName} lineup.
            </p>
          </div>

          {/* Quick Sort */}
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-900 border border-slate-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 cursor-pointer shadow-inner"
            >
              <option value="featured">Featured / Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold px-1">
            <span>Showing {sortedProducts.length} accessories in {categoryName}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {sortedProducts.map((prod, idx) => (
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
