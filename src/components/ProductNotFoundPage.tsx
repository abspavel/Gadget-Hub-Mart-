import React, { useState } from 'react';
import { Search, ArrowLeft, PackageX, ShoppingBag, Zap, Home } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductNotFoundPageProps {
  attemptedSlug?: string;
  onNavigateHome: () => void;
  onSearch: (query: string) => void;
  recommendedProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, color?: string, e?: React.MouseEvent) => void;
  onBuyNow: (product: Product, quantity: number, color?: string) => void;
}

export const ProductNotFoundPage: React.FC<ProductNotFoundPageProps> = ({
  attemptedSlug,
  onNavigateHome,
  onSearch,
  recommendedProducts,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <div className="min-h-[80vh] bg-slate-50/60 pt-8 pb-20 px-3.5 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-blue-600 bg-white px-4 py-2 rounded-full border border-gray-200/80 shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>হোমে ফিরে যান</span>
          </button>
        </div>

        {/* 404 Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center space-y-5 shadow-xs">
          <div className="w-20 h-20 rounded-3xl bg-rose-50 border border-rose-100 text-rose-500 mx-auto flex items-center justify-center ring-8 ring-rose-50/50">
            <PackageX className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold font-mono">
              HTTP 404 • Product Not Found
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              দুঃখিত, প্রোডাক্টটি খুঁজে পাওয়া যায়নি
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              আপনি যে প্রোডাক্টটির লিংকে ক্লিক করেছেন তা হয়তো স্টক শেষ হয়ে গেছে, সরানো হয়েছে অথবা লিংকটিতে ভুল রয়েছে।
            </p>
            {attemptedSlug && (
              <p className="text-xs font-mono text-slate-400 bg-slate-50 py-1.5 px-3 rounded-lg border border-slate-200/60 inline-block">
                রিকোয়েস্টেড পাথ: /p/{attemptedSlug}
              </p>
            )}
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto pt-2">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="কাঙ্ক্ষিত গ্যাজেটটি সার্চ করুন..."
                className="w-full text-xs pl-10 pr-24 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-2 bg-[#0a192f] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                খুঁজুন
              </button>
            </div>
          </form>

          {/* Quick Home Link */}
          <div className="pt-2">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>সকল ক্যাটাগরি ও অফার দেখতে হোমপেজে যান</span>
            </button>
          </div>
        </div>

        {/* Recommended Popular Gadgets */}
        {recommendedProducts.length > 0 && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  জনপ্রিয় কিছু গ্যাজেট দেখতে পারেন
                </h3>
                <p className="text-xs text-slate-500">
                  আমাদের সর্বাধিক বিক্রিত আসল গ্যাজেট কালেকশন
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {recommendedProducts.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                  onAddToCart={onAddToCart}
                  onBuyNow={onBuyNow}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
