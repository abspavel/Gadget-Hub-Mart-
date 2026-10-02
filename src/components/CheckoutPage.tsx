import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck, Banknote, Smartphone, CreditCard, Copy, Check, Truck, MapPin } from 'lucide-react';
import { CartItem, Currency, Coupon } from '../types';

interface CheckoutPageProps {
  items: CartItem[];
  currentCurrency: Currency;
  onBack: () => void;
  onOrderSuccess: (orderId: string, orderDetails: { customerName: string; phone: string; address: string; thana?: string; city: string; deliveryZone: string; total: number; items: any[]; discount?: number }) => void;
  onIncompleteOrder?: (details: { phone: string; customerName: string; address: string; cartSummary: string; total: number }) => void;
  onClearCart: () => void;
  coupons?: Coupon[];
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  currentCurrency,
  onBack,
  onOrderSuccess,
  onIncompleteOrder,
  onClearCart,
  coupons = [],
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [orderId, setOrderId] = useState('');
  const [copied, setCopied] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [thana, setThana] = useState('');
  const [deliveryZone, setDeliveryZone] = useState<'inside' | 'outside'>('inside');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'mobile' | 'card'>('cod');
  const [notes, setNotes] = useState('');

  // Coupon states
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponMessage, setCouponMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Delivery charge: Inside Dhaka = 80 BDT, Outside Dhaka = 120 BDT
  const deliveryChargeInBdt = deliveryZone === 'inside' ? 80 : 120;
  const deliveryChargeInUsd = deliveryChargeInBdt / 120;

  const rawSubtotalUsd = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Discount calculation
  let discountUsd = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercentage) {
      discountUsd = (rawSubtotalUsd * appliedCoupon.discountPercentage) / 100;
    } else if (appliedCoupon.discountAmount) {
      discountUsd = appliedCoupon.discountAmount / 120;
    }
  }

  const grandTotalUsd = Math.max(0, rawSubtotalUsd - discountUsd + deliveryChargeInUsd);

  const formatPrice = (priceInUsd: number) => {
    const converted = priceInUsd * currentCurrency.rate;
    if (currentCurrency.code === 'BDT') {
      return `${currentCurrency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${currentCurrency.symbol}${converted.toFixed(2)}`;
  };

  // Track incomplete orders when phone number is provided
  useEffect(() => {
    if (phone.length >= 10 && onIncompleteOrder) {
      const cartSummary = items.map(i => `${i.product.name} (x${i.quantity})`).join(', ');
      onIncompleteOrder({
        phone,
        customerName: name || 'Guest User',
        address: `${address}, ${thana}, ${city}`.replace(/(,\s*)+/g, ', ').trim(),
        cartSummary,
        total: grandTotalUsd
      });
    }
  }, [phone, name, address, thana, city, grandTotalUsd]);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `GHM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setStep('success');

    const fullAddress = `${address}${thana ? `, থানা: ${thana}` : ''}${city ? `, জেলা: ${city}` : ''}`;

    onOrderSuccess(generatedId, {
      customerName: name || 'Valued Customer',
      phone: phone || 'N/A',
      address: fullAddress,
      thana,
      city,
      deliveryZone: deliveryZone === 'inside' ? 'Inside Dhaka (৳80)' : 'Outside Dhaka (৳120)',
      total: grandTotalUsd,
      items: items.map(i => ({ productName: i.product.name, quantity: i.quantity, price: i.product.price }))
    });

    onClearCart();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-50/60 pt-10 pb-20 px-4 sm:px-6">
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1.5">
            <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100">
              অর্ডার সফল হয়েছে
            </span>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              ধন্যবাদ! আপনার অর্ডারটি গ্রহণ করা হয়েছে
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
              আমাদের টিম খুব দ্রুত আপনার সাথে যোগাযোগ করবে এবং পার্সেলটি পাঠিয়ে দেবে।
            </p>
          </div>

          {/* Tracking Box */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">অর্ডার আইডি</span>
              <div className="text-base sm:text-lg font-mono font-bold text-gray-900">
                {orderId}
              </div>
            </div>
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-gray-200 text-gray-700 hover:text-blue-600 font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={onBack}
              className="w-full sm:w-auto px-8 py-3 bg-[#0a192f] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm rounded-full transition-all shadow-md cursor-pointer"
            >
              আরও কেনাকাটা করুন
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/60 pt-4 pb-20 px-3.5 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-4">
        
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white px-3.5 py-1.5 rounded-full border border-gray-200/80 shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>শপে ফিরে যান</span>
          </button>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>১০০% নিরাপদ চেকআউট</span>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* Left: Minimal Clean Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200/70 p-4 sm:p-6 space-y-5 shadow-2xs">
              
              <div className="border-b border-gray-100 pb-3">
                <h2 className="text-base font-bold text-gray-900">ডেলিভারি তথ্য</h2>
                <p className="text-xs text-gray-500">পণ্যটি দ্রুত পৌঁছানোর জন্য সঠিক তথ্য দিন।</p>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    আপনার নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমন: তানভীর আহমেদ"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    মোবাইল নম্বর <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="যেমন: 017XXXXXXXX"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    সম্পূর্ণ ঠিকানা (বাসা/রোড/এলাকা) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="যেমন: বাসা ১২, রোড ৪, ব্লক সি"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-600 focus:outline-none transition-colors"
                  />
                </div>

                {/* District and Thana in 2 cols */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      জেলা / শহর <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="যেমন: ঢাকা, চট্টগ্রাম, রাজশাহী"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-600 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      থানা <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={thana}
                      onChange={(e) => setThana(e.target.value)}
                      placeholder="যেমন: মিরপুর, ধানমন্ডি, কোতোয়ালী"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Zone Selection (Inside Dhaka 80 BDT / Outside Dhaka 120 BDT) */}
              <div className="pt-2 space-y-2">
                <label className="block text-xs font-bold text-gray-900">
                  ডেলিভারি এলাকা নির্বাচন করুন <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div
                    onClick={() => setDeliveryZone('inside')}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      deliveryZone === 'inside'
                        ? 'border-blue-600 bg-blue-50/50 shadow-2xs'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${deliveryZone === 'inside' ? 'border-blue-600' : 'border-gray-300'}`}>
                        {deliveryZone === 'inside' && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900">ঢাকার ভিতরে</div>
                        <div className="text-[11px] text-gray-500">হোম ডেলিভারি</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-blue-600 bg-white px-2 py-0.5 rounded-md border border-blue-200">
                      ৳৮০
                    </span>
                  </div>

                  <div
                    onClick={() => setDeliveryZone('outside')}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      deliveryZone === 'outside'
                        ? 'border-blue-600 bg-blue-50/50 shadow-2xs'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${deliveryZone === 'outside' ? 'border-blue-600' : 'border-gray-300'}`}>
                        {deliveryZone === 'outside' && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900">ঢাকার বাইরে</div>
                        <div className="text-[11px] text-gray-500">সারা বাংলাদেশ</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-blue-600 bg-white px-2 py-0.5 rounded-md border border-blue-200">
                      ৳১২০
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="pt-2 space-y-2">
                <label className="block text-xs font-bold text-gray-900">
                  পেমেন্ট পদ্ধতি
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-bold'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Banknote className="w-4 h-4 mx-auto mb-1" />
                    <span className="text-[11px] block">ক্যাশ অন ডেলিভারি</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mobile')}
                    className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                      paymentMethod === 'mobile'
                        ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-bold'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 mx-auto mb-1" />
                    <span className="text-[11px] block">বিকাশ / নগদ</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-bold'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mx-auto mb-1" />
                    <span className="text-[11px] block">কার্ড পেমেন্ট</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5 space-y-3">
              <div className="bg-white rounded-2xl border border-gray-200/70 p-4 sm:p-5 space-y-3.5 shadow-2xs">
                
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2.5">
                  অর্ডার বিবরণী ({items.reduce((s, i) => s + i.quantity, 0)} টি পণ্য)
                </h3>

                {/* Items preview list */}
                <div className="space-y-2.5 max-h-60 overflow-y-auto divide-y divide-gray-50 pr-1">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 pt-2 first:pt-0">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-10 h-10 object-cover rounded-lg bg-gray-50 border border-gray-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-900 truncate">{item.product.name}</h4>
                        <div className="text-[10px] text-gray-500">পরিমাণ: {item.quantity}</div>
                      </div>
                      <div className="text-xs font-bold text-gray-900 tabular-nums">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Input */}
                <div className="pt-2 border-t border-gray-100 space-y-1.5">
                  <label className="block text-[11px] font-bold text-gray-700">কুপন ডিসকাউন্ট কোড</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      placeholder="যেমন: EID10"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono uppercase focus:bg-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const code = couponInput.trim().toUpperCase();
                        if (!code) return;
                        const found = coupons.find(c => c.code.toUpperCase() === code && c.isActive !== false);
                        if (found) {
                          setAppliedCoupon(found);
                          setCouponMessage({ text: `কুপন "${found.code}" সফলভাবে কার্যকর হয়েছে!`, type: 'success' });
                        } else {
                          setCouponMessage({ text: 'ভুল বা মেয়াদোত্তীর্ণ কুপন কোড', type: 'error' });
                        }
                      }}
                      className="px-3 py-1.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                      অ্যাপ্লাই
                    </button>
                  </div>
                  {couponMessage && (
                    <div className={`text-[10px] font-bold ${couponMessage.type === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {couponMessage.text}
                    </div>
                  )}
                </div>

                {/* Calculation breakdown */}
                <div className="space-y-1.5 pt-2.5 border-t border-gray-100 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>সাবটোটাল</span>
                    <span className="font-semibold text-gray-900 tabular-nums">{formatPrice(rawSubtotalUsd)}</span>
                  </div>
                  {discountUsd > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>কুপন ছাড় ({appliedCoupon?.code})</span>
                      <span className="tabular-nums">-{formatPrice(discountUsd)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>
                      ডেলিভারি চার্জ ({deliveryZone === 'inside' ? 'ঢাকার ভিতরে' : 'ঢাকার বাইরে'})
                    </span>
                    <span className="font-semibold text-gray-900 tabular-nums">
                      {currentCurrency.code === 'BDT' ? `৳${deliveryChargeInBdt}` : formatPrice(deliveryChargeInUsd)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-sm font-bold text-gray-900">
                    <span>সর্বমোট</span>
                    <span className="text-base text-blue-600 tabular-nums">
                      {formatPrice(grandTotalUsd)}
                    </span>
                  </div>
                </div>

                {/* Confirm Order Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-sm active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>অর্ডার নিশ্চিত করুন</span>
                  <span>({formatPrice(grandTotalUsd)})</span>
                </button>

                <p className="text-[11px] text-center text-gray-400">
                  ক্যাশ অন ডেলিভারিতে পণ্য হাতে পেয়ে মূল্য পরিশোধ করার সুবিধা।
                </p>

              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
