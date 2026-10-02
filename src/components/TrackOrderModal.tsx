import React, { useState } from 'react';
import { X, Search, CheckCircle2, Truck, Package, Clock } from 'lucide-react';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  isOpen,
  onClose,
  initialOrderId = 'GHM-78421',
}) => {
  const [orderQuery, setOrderQuery] = useState(initialOrderId);
  const [isSearched, setIsSearched] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 my-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950">
            Track Your Order
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time status updates on your Gadget Hub Mart shipment.
          </p>
        </div>

        {/* Search bar */}
        <div className="mt-5 flex gap-2">
          <input
            type="text"
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            placeholder="Enter Order ID (e.g. GHM-78421)"
            className="flex-1 text-xs sm:text-sm px-4 py-2.5 rounded-full border border-gray-200 focus:border-blue-500 focus:outline-none uppercase"
          />
          <button
            onClick={() => setIsSearched(true)}
            className="bg-gray-950 hover:bg-blue-600 text-white font-semibold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Track</span>
          </button>
        </div>

        {/* Tracking Timeline */}
        {isSearched && orderQuery.trim() && (
          <div className="mt-6 pt-5 border-t border-gray-100 space-y-6">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Tracking Code: <strong className="text-gray-900 font-mono">{orderQuery}</strong></span>
              <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold">
                In Transit
              </span>
            </div>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="w-0.5 h-10 bg-emerald-500" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Order Confirmed & Payment Verified</div>
                  <div className="text-[11px] text-gray-500">March 28, 2026 · 10:14 AM</div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                  <div className="w-0.5 h-10 bg-emerald-500" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Custom Quality Packaged at Central Hub</div>
                  <div className="text-[11px] text-gray-500">March 28, 2026 · 03:45 PM</div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs animate-pulse">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div className="w-0.5 h-10 bg-gray-200" />
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-600">Dispatched via Express Courier · In Transit</div>
                  <div className="text-[11px] text-gray-500">March 29, 2026 · 08:30 AM (Out on Highway)</div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400">Out for Doorstep Delivery</div>
                  <div className="text-[11px] text-gray-400">Estimated: Tomorrow before 5:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="text-xs text-gray-500 hover:text-gray-900 font-medium underline"
          >
            Close Tracking
          </button>
        </div>
      </div>
    </div>
  );
};
