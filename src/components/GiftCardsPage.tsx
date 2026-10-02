import React, { useState } from 'react';
import { ArrowLeft, Gift, Check, Sparkles, Send } from 'lucide-react';
import { Currency } from '../types';

interface GiftCardsPageProps {
  onBack: () => void;
  currentCurrency: Currency;
  onOrderGiftCard?: (card: { amount: number; recipientEmail: string; message: string }) => void;
}

export const GiftCardsPage: React.FC<GiftCardsPageProps> = ({
  onBack,
  currentCurrency,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const amountsInBdt = [500, 1000, 2000, 5000, 10000];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
        <div className="rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-xl space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full border border-purple-400/20">
              <Gift className="w-3.5 h-3.5 text-purple-400" />
              Digital Gift Cards
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Gadget Hub Mart Gift Cards
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              প্রিয়জনকে উপহার দিন তাদের পছন্দের গ্যাজেট বেছে নেওয়ার স্বাধীনতা। ইন্সট্যান্ট ইমেইল ডেলিভারি।
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Card Preview (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="rounded-3xl bg-gradient-to-tr from-[#0a192f] via-slate-900 to-blue-900 text-white p-6 aspect-[1.6/1] flex flex-col justify-between shadow-xl border border-slate-700 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-blue-400">Gift Voucher</div>
                  <div className="text-lg font-black tracking-tight">Gadget Hub Mart</div>
                </div>
                <Gift className="w-7 h-7 text-amber-400" />
              </div>

              <div>
                <div className="text-[11px] text-slate-300">মূল্যমান / Card Value</div>
                <div className="text-2xl font-black tracking-tight text-white">
                  ৳{selectedAmount.toLocaleString()}
                </div>
                {recipientName && (
                  <div className="text-xs text-blue-300 font-medium mt-1 truncate">
                    For: {recipientName}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-100 text-xs text-gray-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-gray-900">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>গিফট কার্ডের সুবিধাসমূহ:</span>
              </div>
              <ul className="space-y-1 list-disc list-inside text-[11px] text-gray-500">
                <li>যেকোনো গ্যাজেট কেনাকাটায় ব্যবহারযোগ্য</li>
                <li>মেয়াদ: ক্রয়ের দিন থেকে ১ বছর</li>
                <li>অনলাইন অর্ডারে সরাসরি কুপন হিসেবে প্রযোজ্য</li>
              </ul>
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="md:col-span-7 bg-white rounded-3xl border border-gray-100 p-6 shadow-2xs">
            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">গিফট কার্ডের আবেদন গৃহীত হয়েছে!</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  আমাদের টিম খুব শীঘ্রই {recipientEmail} এ পেমেন্ট ও কার্ড ডেলিভারি নিশ্চিত করবে।
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-blue-600 hover:underline pt-2 cursor-pointer"
                >
                  অন্য আরেকটি কার্ড পাঠান
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    কার্ডের মূল্যমান নির্বাচন করুন
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {amountsInBdt.map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => setSelectedAmount(amt)}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          selectedAmount === amt
                            ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-2xs'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        ৳{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    প্রাপকের নাম (Recipient Name)
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="যেমন: আবির হাসান"
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    প্রাপকের ইমেইল (Recipient Email)
                  </label>
                  <input
                    type="email"
                    required
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="abir@gmail.com"
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    আপনার শুভেচ্ছাবার্তা (Personal Message)
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="শুভ জন্মদিন! নিজের পছন্দের গ্যাজেটটি বেছে নাও..."
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-600 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>গিফট কার্ড ক্রয় করুন (৳{selectedAmount.toLocaleString()})</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
