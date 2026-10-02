import React, { useState } from 'react';
import { ArrowLeft, DollarSign, Share2, Users, CheckCircle2, Send } from 'lucide-react';

interface AffiliatesPageProps {
  onBack: () => void;
}

export const AffiliatesPage: React.FC<AffiliatesPageProps> = ({ onBack }) => {
  const [joined, setJoined] = useState(false);
  const [name, setName] = useState('');
  const [socialLink, setSocialLink] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJoined(true);
  };

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
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-xl space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/20">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              Earn up to 10% Commission
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              অ্যাফিলিয়েট পার্টনার প্রোগ্রাম
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              আপনার সোশ্যাল মিডিয়া, ওয়েবসাইট বা বন্ধুদের সাথে প্রিমিয়াম গ্যাজেট শেয়ার করে আকর্ষণীয় কমিশন উপার্জন করুন।
            </p>
          </div>
        </div>

        {/* 3 Step Process */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-2xs text-center space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto font-bold text-sm">
              ১
            </div>
            <h4 className="text-sm font-bold text-gray-900">রেজিস্ট্রেশন করুন</h4>
            <p className="text-xs text-gray-500">সহজ ফর্মে আবেদন করে তাৎক্ষণিক আপনার ইউনিক অ্যাফিলিয়েট রেফারাল লিংক তৈরি করুন।</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-2xs text-center space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto font-bold text-sm">
              ২
            </div>
            <h4 className="text-sm font-bold text-gray-900">গ্যাজেট প্রমোট করুন</h4>
            <p className="text-xs text-gray-500">ফেসবুক, ইউটিউব, টিকটক বা ইনস্টাগ্রামে আপনার লিংকের মাধ্যমে গ্যাজেটের রিভিউ দিন।</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-2xs text-center space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto font-bold text-sm">
              ৩
            </div>
            <h4 className="text-sm font-bold text-gray-900">কমিশন তুলে নিন</h4>
            <p className="text-xs text-gray-500">প্রতিটি সফল অর্ডারের বিপরীতে বিকাশ, নগদ বা ব্যাংক একাউন্টে কমিশন পেয়ে যান।</p>
          </div>
        </div>

        {/* Join Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-gray-900">প্রোগ্রামে যুক্ত হতে আবেদন করুন</h3>

          {joined ? (
            <div className="text-center py-8 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-base font-bold text-gray-900">আবেদন সফল হয়েছে!</h4>
              <p className="text-xs text-gray-500">আমাদের অ্যাফিলিয়েট ম্যানেজার আপনার সাথে খুব দ্রুত যোগাযোগ করে রেফারাল ড্যাশবোর্ড বুঝিয়ে দেবেন।</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">পূর্ণ নাম *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="আপনার নাম লিখুন"
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ইমেইল এড্রেস *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">সোশ্যাল মিডিয়া পেজ বা চ্যানেলের লিংক *</label>
                <input
                  type="url"
                  required
                  value={socialLink}
                  onChange={(e) => setSocialLink(e.target.value)}
                  placeholder="https://facebook.com/yourpage বা ইউটিউব চ্যানেল"
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>পার্টনার হিসেবে যোগ দিন</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
