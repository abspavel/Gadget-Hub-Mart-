import React, { useState } from 'react';
import { ArrowLeft, Search, Package, CheckCircle2, Clock, Truck, ShieldCheck, AlertCircle } from 'lucide-react';

interface TrackOrderPageProps {
  onBack: () => void;
  orders: any[];
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({ onBack, orders }) => {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundOrder, setFoundOrder] = useState<any | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const clean = query.trim().toLowerCase();
    const match = orders.find(
      (o) =>
        (o.id && o.id.toLowerCase().includes(clean)) ||
        (o.phone && o.phone.includes(clean))
    );
    setFoundOrder(match || null);
  };

  return (
    <div className="min-h-screen bg-gray-50/60 pt-4 pb-20 px-3.5 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-blue-600 bg-white px-4 py-2 rounded-full border border-gray-200/80 shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>হোমে ফিরে যান</span>
          </button>
          <span className="text-xs text-gray-500 font-medium">লাইভ অর্ডার ট্র্যাকিং</span>
        </div>

        {/* Hero */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0a192f] via-slate-900 to-blue-950 text-white p-6 sm:p-10 shadow-lg text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 mx-auto flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            আপনার অর্ডার ট্র্যাক করুন
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            আপনার অর্ডার আইডি (যেমন: GHM-123456) অথবা মোবাইল নম্বর দিয়ে অর্ডারের সর্বশেষ অবস্থা জানুন।
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2 pt-2">
            <input
              type="text"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="অর্ডার আইডি বা মোবাইল নম্বর লিখুন..."
              className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-full bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-md transition-all shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>ট্র্যাক করুন</span>
            </button>
          </form>
        </div>

        {/* Search Result */}
        {searched && foundOrder && (
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">অর্ডার নম্বর</span>
                <div className="text-lg font-mono font-bold text-gray-900">{foundOrder.id}</div>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">অর্ডারের তারিখ</span>
                <div className="text-xs font-semibold text-gray-700">{foundOrder.date || 'আজ'}</div>
              </div>
            </div>

            {/* Stepper */}
            <div className="space-y-4 py-2">
              <div className="text-xs font-bold text-gray-900">ডেলিভারি স্ট্যাটাস:</div>
              <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                <div className="space-y-1.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-gray-900">অর্ডার গৃহীত</div>
                </div>
                <div className="space-y-1.5">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center font-bold">
                    <Package className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-blue-600">প্যাকিং হচ্ছে</div>
                </div>
                <div className="space-y-1.5">
                  <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center font-bold">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div className="text-gray-500">কুরিয়ারে হস্তান্তর</div>
                </div>
                <div className="space-y-1.5">
                  <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center font-bold">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-gray-500">ডেলিভার্ড</div>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-2 text-xs text-gray-700">
              <div className="flex justify-between">
                <span>গ্রাহকের নাম:</span>
                <strong className="text-gray-900">{foundOrder.customerName || foundOrder.customer_name}</strong>
              </div>
              <div className="flex justify-between">
                <span>ঠিকানা:</span>
                <strong className="text-gray-900 text-right max-w-xs">{foundOrder.address}</strong>
              </div>
              <div className="flex justify-between border-t border-gray-200/60 pt-2 font-bold text-gray-900">
                <span>সর্বমোট পরিশোধযোগ্য:</span>
                <span className="text-blue-600 text-sm">৳{Math.round(foundOrder.total || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {searched && !foundOrder && (
          <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center space-y-3 shadow-2xs">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="text-base font-bold text-gray-900">কোনো অর্ডার খুঁজে পাওয়া যায়নি</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              অনুগ্রহ করে সঠিক অর্ডার আইডি বা মোবাইল নম্বর দিয়ে পুনরায় চেষ্টা করুন অথবা আমাদের হেল্পলাইনে যোগাযোগ করুন।
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
