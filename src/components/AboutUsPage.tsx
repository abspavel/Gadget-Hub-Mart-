import React from 'react';
import { ArrowLeft, Award, Users, HeartHandshake, ShieldCheck } from 'lucide-react';

interface AboutUsPageProps {
  onBack: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onBack }) => {
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
            <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/20">
              <Award className="w-3.5 h-3.5 text-blue-400" />
              Gadget Hub Mart Story
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              আমাদের সম্পর্কে (About Us)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              বাংলাদেশে জেনুইন ও প্রিমিয়াম গ্যাজেট অ্যাক্সেসরিজের নির্ভরযোগ্য গন্তব্য।
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-6 text-xs sm:text-sm text-gray-600 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">আমাদের লক্ষ্য ও উদ্দেশ্য</h2>
            <p>
              গ্যাজেট হাব মার্ট প্রতিষ্ঠিত হয়েছে একটি দৃঢ় প্রত্যয় নিয়ে—বাংলাদেশের গ্যাজেটপ্রেমীদের কাছে বিশ্বমানের, টেকসই ও ১০০% অরিজিনাল স্মার্ট টেক অ্যাক্সেসরিজ পৌঁছে দেওয়া। 
              ফাস্ট চার্জার, উন্নত নয়েজ ক্যানসেলিং হেডফোন, টেকসই কেবল থেকে শুরু করে স্টাইলিশ ল্যাপটপ ও কার মাউন্ট—আমরা প্রতিটি পণ্য যাচাই-বাছাই করে সংগ্রহ করি।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-blue-50/60 p-4 rounded-2xl space-y-1.5 border border-blue-100/60">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-gray-900 text-xs sm:text-sm">১০০% আসল পণ্য</h4>
              <p className="text-xs text-gray-500">কোনো রেপ্লিকা বা ফেক প্রোডাক্ট নয়, সরাসরি অফিশিয়াল সোর্স থেকে সংগৃহীত।</p>
            </div>

            <div className="bg-emerald-50/60 p-4 rounded-2xl space-y-1.5 border border-emerald-100/60">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-gray-900 text-xs sm:text-sm">গ্রাহক সন্তুষ্টি</h4>
              <p className="text-xs text-gray-500">সহজ রিটার্ন পলিসি ও ডেডিকেটেড আফটার-সেলস কাস্টমার সার্ভিস।</p>
            </div>

            <div className="bg-purple-50/60 p-4 rounded-2xl space-y-1.5 border border-purple-100/60">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-gray-900 text-xs sm:text-sm">দ্রুততম ডেলিভারি</h4>
              <p className="text-xs text-gray-500">সারা বাংলাদেশে দ্রুত ও সুরক্ষিত হোম ডেলিভারি সার্ভিস।</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
