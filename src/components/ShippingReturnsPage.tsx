import React from 'react';
import { ArrowLeft, Truck, Clock, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';

interface ShippingReturnsPageProps {
  onBack: () => void;
}

export const ShippingReturnsPage: React.FC<ShippingReturnsPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50/60 pt-4 pb-20 px-3.5 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-blue-600 bg-white px-4 py-2 rounded-full border border-gray-200/80 shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>হোমে ফিরে যান</span>
          </button>
        </div>

        {/* Hero */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-xl space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/20">
              <Truck className="w-3.5 h-3.5 text-blue-400" />
              Express Delivery & Shipping Information
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              ডেলিভারি ও শিপিং নীতিমালা
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              সারা বাংলাদেশে দ্রুততম ডেলিভারি এবং ১০০% নিরাপদ ক্যাশ অন ডেলিভারি সার্ভিস।
            </p>
          </div>
        </div>

        {/* Delivery Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900">ঢাকার ভিতরে ডেলিভারি</h3>
            <div className="text-2xl font-black text-blue-600">৳৮০</div>
            <p className="text-xs text-gray-500 leading-relaxed">
              ঢাকা সিটির যেকোনো ঠিকানায় ২৪ থেকে ৪৮ ঘণ্টার মধ্যে বিশ্বস্ত রাইডারের মাধ্যমে হোম ডেলিভারি প্রদান করা হয়। ক্যাশ অন ডেলিভারি প্রযোজ্য।
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900">ঢাকার বাইরে ডেলিভারি</h3>
            <div className="text-2xl font-black text-indigo-600">৳১২০</div>
            <p className="text-xs text-gray-500 leading-relaxed">
              দেশের সকল জেলা ও থানা সদরে ৪৮ থেকে ৭২ ঘণ্টার মধ্যে স্টিডফাস্ট বা সুন্দরবন কুরিয়ারের মাধ্যমে নিরাপদে পৌঁছে দেওয়া হয়।
            </p>
          </div>
        </div>

        {/* Shipping & Delivery Steps */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-gray-900">ডেলিভারি ও পার্সেল হ্যান্ডলিং নিয়মাবলী</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-600">
            <div className="bg-gray-50 p-4 rounded-2xl space-y-1.5">
              <div className="font-bold text-gray-900 text-sm">১. দ্রুত প্রসেসিং</div>
              <p>অর্ডার কনফার্মেশনের সাথে সাথেই পণ্য সতর্কতার সাথে কোয়ালিটি চেক করে প্যাকেজিং করা হয়।</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl space-y-1.5">
              <div className="font-bold text-gray-900 text-sm">২. পার্সেল ট্র্যাকিং</div>
              <p>পার্সেল ডিসপ্যাচ হওয়ার পর গ্রাহককে এসএমএস বা কল করে ডেলিভারির অগ্রগতি জানানো হয়।</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl space-y-1.5">
              <div className="font-bold text-gray-900 text-sm">৩. নিরাপদ হোম ডেলিভারি</div>
              <p>রাইডারের উপস্থিতিতে পার্সেল চেক করে ক্যাশ অন ডেলিভারিতে সংগ্রহ করার সুবিধা রয়েছে।</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
