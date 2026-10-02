import React from 'react';
import { ArrowLeft, Newspaper, ExternalLink, Download } from 'lucide-react';

interface PressPageProps {
  onBack: () => void;
}

export const PressPage: React.FC<PressPageProps> = ({ onBack }) => {
  const pressReleases = [
    {
      date: 'সেপ্টেম্বর ২০২৬',
      outlet: 'Tech Trends Bangladesh',
      title: 'গ্যাজেট হাব মার্টের নতুন নেক্সট-জেন GaN চার্জার সিরিজ লঞ্চ',
      snippet: 'ল্যাপটপ ও স্মার্টফোনের জন্য সুপার ফাস্ট ও কুলিং টেকনোলজি সহ সর্বাধুনিক চার্জিং সমাধান নিয়ে এলো ব্র্যান্ডটি।'
    },
    {
      date: 'আগস্ট ২০২৬',
      outlet: 'E-Commerce Today',
      title: 'সারা বাংলাদেশে ২ দিনে হোম ডেলিভারি ও রিয়েল-টাইম ট্র্যাকিং নেটওয়ার্ক বিস্তার',
      snippet: 'গ্রাহকদের দ্রুততম সেবা নিশ্চিত করতে ঢাকার বাইরেও লজিস্টিকস জোরদার করেছে গ্যাজেট হাব মার্ট।'
    },
    {
      date: 'জুলাই ২০২৬',
      outlet: 'Gadget Enthusiast Magazine',
      title: '১০০% জেনুইন টেক অ্যাক্সেসরিজের বিশ্বস্ত নাম গ্যাজেট হাব মার্ট',
      snippet: 'অনলাইন কেনাকাটায় নকল পণ্যের ভিড়ে কীভাবে কোয়ালিটি ও অথেন্টিসিটি বজায় রাখছে এই প্ল্যাটফর্ম।'
    }
  ];

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
              <Newspaper className="w-3.5 h-3.5 text-blue-400" />
              Media & News
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              প্রেস ও মিডিয়া কভারেজ (Press)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              গ্যাজেট হাব মার্টের সাম্প্রতিক সংবাদ বিজ্ঞপ্তি, গণমাধ্যম প্রতিবেদন ও মিডিয়া কিট।
            </p>
          </div>
        </div>

        {/* Press Releases */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-gray-900 mb-2">সংবাদ প্রতিবেদনসমূহ</h3>

          <div className="space-y-4 divide-y divide-gray-100">
            {pressReleases.map((pr, idx) => (
              <div key={idx} className="pt-4 first:pt-0 space-y-1.5">
                <div className="flex items-center gap-2 text-[11px] text-blue-600 font-semibold">
                  <span>{pr.outlet}</span>
                  <span>•</span>
                  <span className="text-gray-400 font-normal">{pr.date}</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1.5">
                  <span>{pr.title}</span>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {pr.snippet}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Media Contact Box */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-gray-900">মিডিয়া বা প্রেস যোগাযোগ</h4>
            <p className="text-xs text-gray-500">প্রেস রিলিজ ও ইন্টারভিউ সংক্রান্ত তথ্যের জন্য ইমেইল করুন: press@gadgethubmart.com</p>
          </div>
        </div>

      </div>
    </div>
  );
};
