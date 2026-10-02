import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, Search, ChevronDown, MessageSquare, PhoneCall, Mail } from 'lucide-react';

interface HelpCenterPageProps {
  onBack: () => void;
  onNavigateContact?: () => void;
}

export const HelpCenterPage: React.FC<HelpCenterPageProps> = ({ onBack, onNavigateContact }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [search, setSearch] = useState('');

  const faqs = [
    {
      q: 'কিভাবে অর্ডার করব?',
      a: 'যে গ্যাজেটটি কিনতে চান তার "এখনই কিনুন" বা "কার্টে যোগ করুন" বাটনে ক্লিক করুন। এরপর চেকআউট পেজে গিয়ে আপনার নাম, ফোন নম্বর, ঠিকানা ও থানা লিখে ডেলিভারি এলাকা নির্বাচন করে অর্ডার সম্পন্ন করুন।'
    },
    {
      q: 'ডেলিভারি চার্জ কত এবং কতদিন সময় লাগে?',
      a: 'ঢাকার ভিতরে ডেলিভারি চার্জ ৮০ টাকা এবং ২৪ থেকে ৪৮ ঘণ্টার মধ্যে পৌঁছে দেওয়া হয়। ঢাকার বাইরে ডেলিভারি চার্জ ১২০ টাকা এবং ৪৮ থেকে ৭২ ঘণ্টার মধ্যে ডেলিভারি সম্পন্ন হয়।'
    },
    {
      q: 'আমি কি ক্যাশ অন ডেলিভারিতে নিতে পারব?',
      a: 'হ্যাঁ, সারা বাংলাদেশে আমাদের ক্যাশ অন ডেলিভারি (Cash on Delivery) সুবিধা রয়েছে। পণ্য হাতে পেয়ে চেক করে মূল্য পরিশোধ করতে পারবেন।'
    },
    {
      q: 'ওয়ারেন্টি কিভাবে ক্লেইম করব?',
      a: 'আমাদের প্রতিটি পণ্যে অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি রয়েছে। যেকোনো সমস্যায় অর্ডার আইডি সহ আমাদের সাপোর্ট নম্বরে যোগাযোগ করলে দ্রুত সমাধান বা রিপ্লেসমেন্ট দেওয়া হবে।'
    },
    {
      q: 'পণ্য পছন্দ না হলে কি রিটার্ন করা যাবে?',
      a: 'হ্যাঁ, কোনো ত্রুটিপূর্ণ বা ভুল পণ্য পেলে ডেলিভারির ৭ দিনের মধ্যে রিটার্ন বা এক্সচেঞ্জ করতে পারবেন।'
    }
  ];

  const filteredFaqs = faqs.filter(
    (f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

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
        <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 shadow-lg text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 mx-auto flex items-center justify-center">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            হেল্প সেন্টার ও সাধারণ প্রশ্নোত্তর
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            আপনার কেনাকাটা ও সার্ভিস সংক্রান্ত যেকোনো তথ্যের জন্য নিচের উত্তরগুলো দেখুন।
          </p>
          <div className="max-w-md mx-auto relative pt-2">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="যেকোনো প্রশ্ন লিখে সার্চ করুন..."
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-3 rounded-full bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none shadow-sm"
            />
          </div>
        </div>

        {/* FAQ List */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-2xs space-y-3">
          <h3 className="text-base font-bold text-gray-900 mb-4">সাধারণ প্রশ্নসমূহ (FAQs)</h3>
          {filteredFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-100 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-gray-900 hover:bg-gray-50 cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${activeFaq === idx ? 'rotate-180 text-blue-600' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-4 text-xs sm:text-sm text-gray-600 leading-relaxed bg-gray-50/50 border-t border-gray-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Strip */}
        <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-gray-900">অন্য কোনো বিষয়ে সাহায্য প্রয়োজন?</h4>
            <p className="text-xs text-gray-500">আমাদের কাস্টমার সাপোর্ট টিম সপ্তাহে ৭ দিনই আপনাদের সেবায় নিয়োজিত।</p>
          </div>
          {onNavigateContact && (
            <button
              onClick={onNavigateContact}
              className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              যোগাযোগ করুন
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
