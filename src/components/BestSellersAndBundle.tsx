import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Product, Currency } from '../types';
import { GadgetGraphic } from './GadgetGraphic';
import { ProductCard } from './ProductCard';

interface BestSellersAndBundleProps {
  products: Product[];
  currentCurrency?: Currency;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, color?: string, e?: React.MouseEvent) => void;
  onBuyNow: (product: Product, quantity: number, color?: string) => void;
  onShopBundles: () => void;
  onViewAllBestSellers: () => void;
}

export const BestSellersAndBundle: React.FC<BestSellersAndBundleProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
  onShopBundles,
  onViewAllBestSellers,
}) => {
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section id="bestsellers" className="py-6 sm:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ================= LEFT HALF: BEST SELLERS ================= */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">
                  Best Sellers
                </h2>
                <button
                  onClick={onViewAllBestSellers}
                  className="group flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mb-6">
                Our most loved accessories.
              </p>
            </div>

            {/* 4 Items in a Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {bestSellers.map((item, idx) => (
                <ProductCard
                  key={`${item.id}-${idx}`}
                  product={item}
                  onSelectProduct={onSelectProduct}
                  onAddToCart={onAddToCart}
                  onBuyNow={onBuyNow}
                />
              ))}
            </div>
          </div>

          {/* ================= RIGHT HALF: BETTER TOGETHER BUNDLE & SAVE ================= */}
          <div className="lg:col-span-6">
            <div className="relative h-full overflow-hidden rounded-3xl bg-[#f4f5f7] p-7 sm:p-9 flex flex-col justify-between border-0 shadow-xs">
              
              {/* Top Row: Title + Orange Badge */}
              <div className="flex items-start justify-between gap-4 z-10">
                <div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-500">
                    Better Together
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight leading-tight mt-0.5">
                    Bundle & Save
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Get more for less with curated bundles.
                  </p>
                </div>

                {/* Orange Circular "Save Up to 30%" sticker */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white font-extrabold flex flex-col items-center justify-center text-center p-1 shadow-md shadow-orange-500/20 shrink-0 transform rotate-6">
                  <span className="text-[10px] sm:text-[11px] leading-tight uppercase font-semibold">Save</span>
                  <span className="text-xs sm:text-sm font-black leading-tight">Up to 30%</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="z-10 pt-4 sm:pt-6">
                <button
                  onClick={onShopBundles}
                  className="inline-flex items-center gap-2 bg-gray-950 hover:bg-gray-800 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-all cursor-pointer group shadow-sm"
                >
                  <span>Shop Bundles</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Bundle Visual Arrangement on the Right/Bottom */}
              <div className="absolute right-0 bottom-0 w-3/5 sm:w-1/2 h-44 sm:h-52 flex items-end justify-end pointer-events-none select-none">
                <GadgetGraphic type="bundle_suite" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
