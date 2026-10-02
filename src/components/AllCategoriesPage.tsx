import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { CATEGORIES as DEFAULT_CATEGORIES } from '../data/products';
import { Currency, CategoryItem } from '../types';

interface AllCategoriesPageProps {
  onBack: () => void;
  onSelectCategory: (categoryName: string) => void;
  currentCurrency: Currency;
  categories?: CategoryItem[];
}

export const AllCategoriesPage: React.FC<AllCategoriesPageProps> = ({
  onBack,
  onSelectCategory,
  currentCurrency,
  categories = DEFAULT_CATEGORIES,
}) => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-3 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Slim Stylish Promotional Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0a192f] via-blue-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl flex items-center justify-between">
          <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-1.5 max-w-xl">
            <span className="bg-blue-500/30 text-blue-300 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> All Categories Hub
            </span>
            <h1 className="text-xl sm:text-3xl font-black tracking-tight">
              Explore All Gadget Categories
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Browse our premium collection of fast chargers, audio gears, smart accessories and more.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-gray-950">Select a Category</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.filter(c => c.id !== 'All').map((cat, idx) => (
              <div
                key={`${cat.id}-${idx}`}
                onClick={() => onSelectCategory(cat.label || cat.id)}
                className="group relative h-44 sm:h-52 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-end p-4"
              >
                {/* Background Image */}
                <img
                  src={cat.imageUrl}
                  alt={cat.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter brightness-90"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Content */}
                <div className="relative z-10 space-y-1">
                  <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-wider">Collection</span>
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-sm sm:text-base font-extrabold tracking-tight group-hover:text-blue-300 transition-colors">
                      {cat.label}
                    </h3>
                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
