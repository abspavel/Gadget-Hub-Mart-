import React from 'react';
import { ArrowRight } from 'lucide-react';
import { INITIAL_CATEGORIES as DEFAULT_CATEGORIES } from '../data/initialData';
import { CategoryItem } from '../types';

interface ShopByCategoryProps {
  onSelectCategory: (categoryId: string) => void;
  onViewAllCategories: () => void;
  activeCategory: string;
  categories?: CategoryItem[];
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({
  onSelectCategory,
  onViewAllCategories,
  activeCategory,
  categories = DEFAULT_CATEGORIES,
}) => {
  return (
    <section id="categories" className="py-5 sm:py-6 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">
            Shop by Category
          </h2>
          <button
            onClick={onViewAllCategories}
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Horizontal Slider with Smaller Compact Cards */}
        <div className="flex items-center gap-3 overflow-x-auto pb-3 scrollbar-none snap-x">
          {categories.filter(c => c.id !== 'All').map((cat, idx) => {
            const isSelected = activeCategory === cat.id || activeCategory === cat.label;
            return (
              <button
                key={`${cat.id}-${idx}`}
                onClick={() => onSelectCategory(cat.label || cat.id)}
                className={`group relative shrink-0 w-28 sm:w-34 h-28 sm:h-34 rounded-2xl overflow-hidden cursor-pointer focus:outline-none transition-all duration-300 snap-start shadow-xs hover:shadow-md ${
                  isSelected ? 'ring-3 ring-blue-600 scale-105' : 'hover:scale-102'
                }`}
              >
                {/* Full Card Image */}
                <img
                  src={cat.imageUrl}
                  alt={cat.label}
                  width="136"
                  height="136"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter brightness-90"
                  loading="lazy"
                  decoding="async"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content at Bottom */}
                <div className="absolute inset-x-0 bottom-0 p-2.5 text-left z-10">
                  <h3 className="text-white text-[11px] sm:text-xs font-bold tracking-tight line-clamp-1 group-hover:text-blue-300 transition-colors">
                    {cat.label}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
