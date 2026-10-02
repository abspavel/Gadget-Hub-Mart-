import React from 'react';
import { ArrowLeft, ShieldCheck, Lock, CheckCircle2, Server, EyeOff } from 'lucide-react';

interface SecurityPageProps {
  onBack: () => void;
}

export const SecurityPage: React.FC<SecurityPageProps> = ({ onBack }) => {
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
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-blue-950 text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-xl space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/20">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Enterprise Grade Safety
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              নিরাপত্তা ব্যবস্থা (Security Standards)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              আপনার লেনদেন ও ব্যক্তিগত তথ্য সুরক্ষায় গ্যাজেট হাব মার্টের সর্বাধুনিক নিরাপত্তা ব্যবস্থা।
            </p>
          </div>
        </div>

        {/* Security Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-2xs text-center space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">256-Bit SSL এনক্রিপশন</h4>
            <p className="text-xs text-gray-500">আপনার ব্রাউজার থেকে সার্ভার পর্যন্ত প্রতিটি ডেটা পয়েন্টে সামরিক গ্রেডের এনক্রিপশন কার্যকর।</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-2xs text-center space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">অ্যান্টি-ফ্রড মনিটরিং</h4>
            <p className="text-xs text-gray-500">স্বয়ংক্রিয় এআই চালিত ফ্রড ডিটেকশন সিস্টেম ফেক অর্ডার ও অননুমোদিত পেমেন্ট প্রতিরোধ করে।</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-2xs text-center space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
              <EyeOff className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">জিরো ডেটা শেয়ারিং</h4>
            <p className="text-xs text-gray-500">গ্রাহকের কোনো সংবেদনশীল তথ্য বাণিজ্যিক স্বার্থে কোনো তৃতীয় পক্ষের সাথে ভাগ করা হয় না।</p>
          </div>
        </div>

        {/* Safe Shopping Guarantee */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-3 text-xs sm:text-sm text-gray-600">
          <h3 className="text-base font-bold text-gray-900">নিরাপদ কেনাকাটার প্রতিশ্রুতি</h3>
          <p>
            আমরা নিশ্চিত করি প্রতিটি গ্যাজেট সম্পূর্ণ সুরক্ষিত মোড়কে প্যাক করা হবে যাতে পরিবহনের সময় কোনো ক্ষতি না হয়। 
            সেই সাথে ক্যাশ অন ডেলিভারি সিস্টেমের মাধ্যমে গ্রাহক শতভাগ সন্তুষ্ট হয়েই মূল্য পরিশোধ করতে পারেন।
          </p>
        </div>

      </div>
    </div>
  );
};
