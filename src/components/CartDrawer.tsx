import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Plus, Minus } from 'lucide-react';
import { CartItem, Currency } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  currentCurrency: Currency;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  currentCurrency,
}) => {
  if (!isOpen) return null;

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + Math.round(item.product.price || 0) * item.quantity, 0);

  const formatPrice = (amount: number) => {
    return `৳${Math.round(amount || 0).toLocaleString('en-US')}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dim backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-2xs transition-opacity duration-200"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex w-full sm:max-w-md">
        <div className="w-full bg-white shadow-xl flex flex-col h-full overflow-hidden animate-in slide-in-from-right duration-200">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gray-800" />
              <h2 className="text-base font-bold text-gray-900">
                শপিং কার্ট ({totalQuantity})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-gray-900">আপনার কার্ট খালি রয়েছে</h3>
                <p className="text-xs text-gray-400 max-w-xs">
                  পছন্দের গ্যাজেটগুলো কার্টে যুক্ত করুন।
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-full cursor-pointer"
                >
                  শপিং চালিয়ে যান
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemTotal = item.product.price * item.quantity;
                return (
                  <div
                    key={`${item.product.id}-${item.selectedColor || ''}`}
                    className="p-3 bg-gray-50/70 rounded-xl border border-gray-100 flex gap-3 items-center"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg bg-white border border-gray-100 shrink-0"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-gray-400 hover:text-red-600 p-1 rounded-md hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                          title="কার্ট থেকে পণ্যটি ডিলিট করুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-[11px] text-gray-500 mt-0.5">
                        {formatPrice(item.product.price)}
                        {item.selectedColor && ` · ${item.selectedColor}`}
                      </div>

                      {/* Quantity & Item Total */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
                          <button
                            onClick={() => item.quantity <= 1 ? onRemoveItem(item.product.id) : onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 hover:text-red-600 cursor-pointer active:bg-gray-200"
                            title={item.quantity <= 1 ? "পণ্যটি ডিলিট করুন" : "পরিমাণ কমান"}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-gray-900 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 cursor-pointer active:bg-gray-200"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-xs sm:text-sm font-bold text-gray-900 tabular-nums">
                          {formatPrice(itemTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] border-t border-gray-100 bg-white space-y-3 shrink-0">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>সাবটোটাল</span>
                  <span className="font-bold text-gray-900 tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-gray-500">
                  <span>ডেলিভারি চার্জ</span>
                  <span>ঢাকার ভিতরে ৳৮০ / বাইরে ৳১২০</span>
                </div>
                <div className="pt-2 border-t border-gray-100 flex justify-between text-sm font-bold text-gray-900">
                  <span>মোট (ডেলিভারি ছাড়া)</span>
                  <span className="text-base text-blue-600 tabular-nums">{formatPrice(subtotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98 select-none"
              >
                <span>চেকআউট করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
