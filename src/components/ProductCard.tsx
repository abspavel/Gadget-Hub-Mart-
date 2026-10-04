import React, { useState } from 'react';
import { ShoppingBag, Zap, Star, Check } from 'lucide-react';
import { Product, Currency } from '../types';

interface ProductCardProps {
  product: Product;
  currentCurrency?: Currency;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, color?: string, e?: React.MouseEvent) => void;
  onBuyNow: (product: Product, quantity: number, color?: string) => void;
  badgeText?: string;
}

export const formatBdtPrice = (price: number): string => {
  if (price === undefined || price === null || isNaN(price)) return '৳০';
  const amount = price < 500 ? Math.round(price * 120) : Math.round(price);
  return `৳${amount.toLocaleString('en-US')}`;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
  badgeText
}) => {
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Available colors
  const colorList: string[] = (product.colors || []).map(c => 
    typeof c === 'string' ? c : c.name
  );
  const [selectedColor, setSelectedColor] = useState<string>(colorList[0] || 'Default');

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1, selectedColor, e);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBuyNow(product, 1, selectedColor);
  };

  // Filter out any stock badges from appearing over the product photo
  const rawBadge = badgeText || product.badge;
  const isStockBadge = rawBadge && /স্টক|মজুদ|stock|ইন স্টক|৫০/i.test(rawBadge);
  const badge = isStockBadge ? null : rawBadge;

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group bg-white rounded-2xl p-3 sm:p-3.5 shadow-2xs hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between border-0 ring-0 outline-none"
    >
      <div>
        {/* Strictly Square Image Container with no colored borders */}
        <div className="relative aspect-square w-full rounded-xl bg-gray-50 overflow-hidden flex items-center justify-center border-0">
          <img
            src={product.imageUrl || 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80'}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
            decoding="async"
          />

          {/* Badge (Stock badges are strictly prevented from appearing on photos) */}
          {badge && (
            <span className="absolute top-2 left-2 bg-[#0a192f] text-white text-[9px] sm:text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm z-10">
              {badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="mt-2.5 space-y-1">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider truncate">
              {product.category}
            </span>
            {product.rating && (
              <div className="flex items-center gap-0.5 text-amber-500 text-[10px] font-bold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
              </div>
            )}
          </div>

          <h3 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Color Switcher Dots if product has colors */}
          {colorList.length > 1 && (
            <div 
              className="flex items-center gap-1.5 pt-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[10px] text-gray-400 font-medium">কালার:</span>
              <div className="flex items-center gap-1 flex-wrap">
                {colorList.slice(0, 4).map((col) => {
                  const isSelected = selectedColor === col;
                  return (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setSelectedColor(col)}
                      className={`text-[9px] px-1.5 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
                        isSelected 
                          ? 'bg-blue-600 text-white font-bold' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title={col}
                    >
                      {col}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price (100% Bangladeshi Taka ৳) */}
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-black text-[#0a192f] tabular-nums">
              {formatBdtPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-gray-400 line-through tabular-nums">
                {formatBdtPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Both Buy & Cart Buttons for EVERY product */}
      <div className="grid grid-cols-2 gap-1.5 pt-3 mt-2 border-t border-gray-100">
        <button
          onClick={handleCartClick}
          className={`w-full text-[10px] sm:text-xs font-bold py-2 px-1 rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 ${
            addedAnimation
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
          title="কার্টে যোগ করুন"
        >
          {addedAnimation ? (
            <>
              <Check className="w-3.5 h-3.5 text-white" />
              <span>যোগ হয়েছে</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3 h-3 text-gray-700" />
              <span>Cart</span>
            </>
          )}
        </button>

        <button
          onClick={handleBuyClick}
          className="w-full bg-[#0a192f] hover:bg-blue-600 text-white text-[10px] sm:text-xs font-bold py-2 px-1 rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 shadow-2xs"
          title="এখনই অর্ডার করুন"
        >
          <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span>Buy</span>
        </button>
      </div>
    </div>
  );
};
