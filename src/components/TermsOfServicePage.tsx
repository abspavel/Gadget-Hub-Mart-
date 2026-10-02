import React from 'react';
import { ArrowLeft, FileCheck, CheckCircle2 } from 'lucide-react';

interface TermsOfServicePageProps {
  onBack: () => void;
}

export const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({ onBack }) => {
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
              <FileCheck className="w-3.5 h-3.5 text-blue-400" />
              Store Agreement & Rules
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              ব্যবহারের শর্তাবলী (Terms of Service)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              গ্যাজেট হাব মার্ট থেকে যেকোনো গ্যাজেট কেনাকাটার পূর্বে প্রযোজ্য নিয়ম ও শর্তাবলী।
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-6 text-xs sm:text-sm text-gray-600 leading-relaxed">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-gray-900">১. অর্ডার ও মূল্য পরিশোধ</h3>
            <p>
              ওয়েবসাইটে উল্লেখিত পণ্যমূল্য ও ডেলিভারি চার্জ চূড়ান্ত। পণ্যের স্টক শেষ হয়ে গেলে বা কোনো প্রযুক্তিগত বিভ্রান্তি ঘটলে অর্ডার বাতিল ও সম্পূর্ণ অর্থ ফেরত দেওয়ার অধিকার কোম্পানি সংরক্ষণ করে।
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-gray-900">২. ডেলিভারি গ্রহণ</h3>
            <p>
              ডেলিভারি রাইডারের সামনে পার্সেলটি রিসিভ করে внешний অবস্থা দেখে নেওয়ার অনুরোধ করা হচ্ছে। ক্যাশ অন ডেলিভারিতে নির্ধারিত মূল্য পরিশোধ করে পণ্য বুঝে নিতে হবে।
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-gray-900">৩. ওয়ারেন্টি ও প্রতিস্থাপন</h3>
            <p>
              প্রতিটি পণ্যের নির্দিষ্ট ওয়ারেন্টি কার্ড বা শর্ত অনুযায়ী সেবা প্রদান করা হবে। ইচ্ছাকৃত ক্ষতি বা অননুমোদিত মেরামতের ক্ষেত্রে ওয়ারেন্টি প্রযোজ্য হবে না।
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-gray-900">৪. শর্তাবলীর সংশোধন</h3>
            <p>
              গ্রাহক সেবার মানোন্নয়নে যেকোনো সময়ে পূর্ব নোটিশ ছাড়াই এসব শর্তাবলী আপডেট করার ক্ষমতা কোম্পানি সংরক্ষণ করে।
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
