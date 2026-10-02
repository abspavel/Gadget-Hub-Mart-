import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Send, Check, MessageSquare } from 'lucide-react';

interface ContactUsPageProps {
  onBack: () => void;
}

export const ContactUsPage: React.FC<ContactUsPageProps> = ({ onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
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
        <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-slate-900 to-slate-900 text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-xl space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/20">
              <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
              We are Here to Help
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              যোগাযোগ করুন (Contact Us)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              যেকোনো জিজ্ঞাসা, অর্ডার সংক্রান্ত তথ্য বা সহযোগিতার জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন।
            </p>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-2xs text-center space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Phone className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">হটলাইন</h4>
            <p className="text-sm font-bold text-gray-900">+880 1711-223344</p>
            <p className="text-[11px] text-gray-500">সকাল ১০টা - রাত ১০টা</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-2xs text-center space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">ইমেইল</h4>
            <p className="text-sm font-bold text-gray-900">support@gadgethubmart.com</p>
            <p className="text-[11px] text-gray-500">২৪ ঘণ্টার মধ্যে রিপ্লাই</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-2xs text-center space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">অফিস</h4>
            <p className="text-sm font-bold text-gray-900">গুলশান-১, ঢাকা, বাংলাদেশ</p>
            <p className="text-[11px] text-gray-500">কর্পোরেট প্রধান কার্যালয়</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-2xs">
          <h3 className="text-base font-bold text-gray-900 mb-1">আমাদের মেসেজ পাঠান</h3>
          <p className="text-xs text-gray-500 mb-5">নিচের ফর্মটি পূরণ করুন, আমাদের প্রতিনিধি খুব দ্রুত যোগাযোগ করবেন।</p>

          {sent ? (
            <div className="text-center py-8 space-y-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto font-bold">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-gray-900">মেসেজ সফলভাবে পাঠানো হয়েছে!</h4>
              <p className="text-xs text-gray-500">ধন্যবাদ, আমরা খুব শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">আপনার নাম *</label>
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
                <label className="block text-xs font-bold text-gray-700 mb-1">বিষয় (Subject)</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="যেমন: অর্ডার ডেলিভারি সংক্রান্ত"
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">আপনার বার্তা (Message) *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="বিস্তারিত বার্তা লিখুন..."
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-600 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>মেসেজ পাঠান</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
