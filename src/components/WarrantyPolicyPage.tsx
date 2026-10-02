import React from 'react';
import { ArrowLeft, ShieldCheck, CheckCircle2, Clock, Wrench } from 'lucide-react';

interface WarrantyPolicyPageProps {
  onBack: () => void;
}

export const WarrantyPolicyPage: React.FC<WarrantyPolicyPageProps> = ({ onBack }) => {
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
        <div className="rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-xl space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/20">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Genuine Replacement Warranty
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              অফিসিয়াল ওয়ারেন্টি নীতিমালা
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              গ্যাজেট হাব মার্টের প্রতিটি পণ্যের সাথে পাচ্ছেন সর্বোচ্চ মানের অফিসিয়াল ওয়ারেন্টি সুবিধা।
            </p>
          </div>
        </div>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">১-২ বছর মেয়াদী ওয়ারেন্টি</h4>
            <p className="text-xs text-gray-500">পণ্যভেদে ৬ মাস থেকে ২ বছর পর্যন্ত সরাসরি অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি কার্যকর থাকবে।</p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">ইনট্যাক্ট রিপ্লেসমেন্ট</h4>
            <p className="text-xs text-gray-500">মেরামত বা বিলম্ব নয়—প্রযুক্তিগত কোনো ত্রুটি ধরা পড়লে ব্র্যান্ড নিউ ইনট্যাক্ট প্রোডাক্ট দেওয়া হয়।</p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 mx-auto flex items-center justify-center font-bold">
              <Wrench className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">সহজ ক্লেইম পদ্ধতি</h4>
            <p className="text-xs text-gray-500">অর্ডার ইনভয়েস বা মোবাইল নম্বর দিয়ে হেল্পলাইনে জানালেই ওয়ারেন্টি প্রসেস শুরু হয়।</p>
          </div>
        </div>

        {/* Detailed Points */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-4 text-xs text-gray-600 leading-relaxed">
          <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">ওয়ারেন্টি ক্লেইম করার শর্তাবলী:</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li>ওয়ারেন্টি শুধুমাত্র অভ্যন্তরীণ প্রযুক্তিগত ত্রুটির ক্ষেত্রে প্রযোজ্য হবে।</li>
            <li>পণ্য আগুনে পোড়া, পানিতে পড়া, শারীরিক আঘাত বা ভেঙে ফেলা হলে ওয়ারেন্টি কার্যকর হবে না।</li>
            <li>অনলাইন ডেলিভারির ক্ষেত্রে আমাদের ঠিকানায় কুরিয়ার করে ওয়ারেন্টি ক্লেইম করা যাবে।</li>
          </ul>
        </div>

      </div>
    </div>
  );
};
