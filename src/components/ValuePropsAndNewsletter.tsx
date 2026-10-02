import React, { useState } from 'react';
import { Truck, PackageCheck, ShieldCheck, Headphones, Mail, Check } from 'lucide-react';

interface ValuePropsAndNewsletterProps {
  onSubscribe?: (email: string) => void;
}

export const ValuePropsAndNewsletter: React.FC<ValuePropsAndNewsletterProps> = ({ onSubscribe }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      if (onSubscribe) onSubscribe(email);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* ================= 4-COLUMN VALUE PROPOSITION BAR ================= */}
        <div className="py-6 px-4 sm:px-8 rounded-2xl bg-[#fafafa] border border-gray-100 grid grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 1. Free Shipping */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 border border-gray-100 shadow-2xs">
              <Truck className="w-5 h-5 text-gray-800" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">Free Shipping</div>
              <div className="text-[11px] sm:text-xs text-gray-500">On orders over ৳1,500</div>
            </div>
          </div>

          {/* 2. 30-Day Returns */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 border border-gray-100 shadow-2xs">
              <PackageCheck className="w-5 h-5 text-gray-800" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">30-Day Returns</div>
              <div className="text-[11px] sm:text-xs text-gray-500">Hassle-free</div>
            </div>
          </div>

          {/* 3. Secure Payments */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 border border-gray-100 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-gray-800" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">Secure Payments</div>
              <div className="text-[11px] sm:text-xs text-gray-500">100% safe & encrypted</div>
            </div>
          </div>

          {/* 4. 24/7 Support */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 border border-gray-100 shadow-2xs">
              <Headphones className="w-5 h-5 text-gray-800" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">24/7 Support</div>
              <div className="text-[11px] sm:text-xs text-gray-500">We're here for you</div>
            </div>
          </div>

        </div>

        {/* ================= NEWSLETTER CARD ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-[#f4f5f7] p-8 sm:p-10 border border-gray-100">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left Content */}
            <div className="flex items-start gap-4 max-w-xl text-center lg:text-left">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 border border-gray-200/60 shadow-xs hidden sm:flex">
                <Mail className="w-6 h-6 text-gray-800" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-950 tracking-tight">
                  Join Our Tech Community
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Get exclusive deals, new arrivals and tech tips straight to your inbox.
                </p>
              </div>
            </div>

            {/* Middle: Email Form */}
            <form onSubmit={handleSubscribe} className="w-full lg:max-w-md flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-white text-gray-900 text-xs sm:text-sm px-5 py-3 rounded-full border border-gray-200 focus:border-blue-500 focus:outline-none placeholder:text-gray-400 shadow-2xs"
              />
              <button
                type="submit"
                disabled={subscribed}
                className="bg-gray-950 hover:bg-gray-800 text-white font-semibold text-xs sm:text-sm px-7 py-3 rounded-full transition-colors cursor-pointer shrink-0 disabled:opacity-80"
              >
                {subscribed ? (
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" /> Subscribed!
                  </span>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>

            {/* Right: Handwritten flourish note */}
            <div className="hidden xl:flex items-center gap-2 transform -rotate-3 select-none">
              <div className="text-right">
                <span className="font-hand text-xl text-slate-700 font-bold block leading-tight">
                  Good Accessories
                  <br />
                  Brighter Days
                </span>
              </div>
              <div className="text-2xl text-slate-700">☺</div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
