import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, FileText } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBack }) => {
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
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              Your Privacy is Our Priority
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              গোপনীয়তা নীতিমালা (Privacy Policy)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              গ্যাজেট হাব মার্টে আপনার ব্যক্তিগত তথ্য কীভাবে সুরক্ষিত ও সংরক্ষিত রাখা হয় তার বিস্তারিত রূপরেখা।
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-6 text-xs sm:text-sm text-gray-600 leading-relaxed">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-gray-900">১. আমরা কী কী তথ্য সংগ্রহ করি</h3>
            <p>
              অর্ডার প্রক্রিয়াকরণ ও হোম ডেলিভারি সুনিশ্চিত করতে আমরা আপনার নাম, ফোন নম্বর, ডেলিভারি ঠিকানা ও থানা সংগ্রহ করি। কোনো অপ্রয়োজনীয় সংবেদনশীল তথ্য চাওয়া হয় না।
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-gray-900">২. তথ্যের নিরাপত্তা ও এনক্রিপশন</h3>
            <p>
              আপনার সকল তথ্য আধুনিক ২৫৬-বিট এসএসএল (256-Bit SSL) এনক্রিপশন দ্বারা সুরক্ষিত। আমরা কোনো তৃতীয় পক্ষের কাছে আপনার ফোন নম্বর বা ব্যক্তিগত তথ্য বিক্রি বা হস্তান্তর করি না।
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-gray-900">৩. পেমেন্ট তথ্যের গোপনীয়তা</h3>
            <p>
              অনলাইন পেমেন্টের ক্ষেত্রে আমাদের সিস্টেমে কোনো কার্ডের পিন বা সিভিভি সংরক্ষিত হয় না; লেনদেন সরাসরি বাংলাদেশ ব্যাংকের অনুমোদিত সিকিউর গেটওয়ের মাধ্যমে সম্পন্ন হয়।
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-gray-900">৪. কুকিজ ও সাইট পারফরম্যান্স</h3>
            <p>
              আপনার কার্টের পণ্য মনে রাখতে এবং ব্রাউজিং অভিজ্ঞতা আরও দ্রুত করতে ক্ষুদ্র কুকি ফাইল ব্যবহৃত হতে পারে, যা আপনি চাইলে ব্রাউজার সেটিংসে বন্ধ করে দিতে পারেন।
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
