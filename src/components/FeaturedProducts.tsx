import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Product, Currency } from '../types';
import { ProductCard } from './ProductCard';

interface FeaturedProductsProps {
  products: Product[];
  currentCurrency?: Currency;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, color?: string, e?: React.MouseEvent) => void;
  onBuyNow: (product: Product, quantity: number, color?: string) => void;
  onViewAll: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
  onViewAll,
}) => {
  // Display exactly 6 featured products, backfilling from catalog if needed
  const featured = (() => {
    const list = products.filter((p) => p.isFeatured);
    if (list.length >= 6) return list.slice(0, 6);
    const remaining = products.filter((p) => !p.isFeatured);
    return [...list, ...remaining].slice(0, 6);
  })();

  return (
    <section id="featured" className="py-6 sm:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <h2 className="text-2xl sm:text-[28px] font-extrabold text-gray-950 tracking-tight">
            Featured Products
          </h2>
          <button
            onClick={onViewAll}
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 2 Columns on Mobile, 3 on Tablet, 6 on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {featured.map((product, idx) => (
            <ProductCard
              key={`${product.id}-${idx}`}
              product={product}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
