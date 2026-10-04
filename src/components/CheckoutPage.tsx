import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, CheckCircle2, Copy, Check, Truck, 
  MapPin, User, Phone, Package, Tag, Lock, Download, Printer, Home,
  Trash2, Plus, Minus, ShoppingBag
} from 'lucide-react';
import { CartItem, Currency, Coupon } from '../types';
import { getCurrentCustomer } from '../utils/customerAuth';
import { trackPurchase } from '../utils/pixel';
import { downloadOrderInvoice } from '../utils/invoiceGenerator';

interface CheckoutPageProps {
  items: CartItem[];
  currentCurrency: Currency;
  onBack: () => void;
  onRemoveItem?: (productId: string, color?: string) => void;
  onUpdateQuantity?: (productId: string, quantity: number, color?: string) => void;
  onOrderSuccess: (orderId: string, orderDetails: { 
    customerName: string; 
    phone: string; 
    email?: string; 
    address: string; 
    thana?: string; 
    city: string; 
    deliveryZone: string; 
    total: number; 
    items: any[]; 
    discount?: number 
  }) => void;
  onIncompleteOrder?: (details: { 
    phone: string; 
    customerName: string; 
    address: string; 
    cartSummary: string; 
    total: number 
  }) => void;
  onClearCart: () => void;
  coupons?: Coupon[];
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  currentCurrency,
  onBack,
  onRemoveItem,
  onUpdateQuantity,
  onOrderSuccess,
  onIncompleteOrder,
  onClearCart,
  coupons = [],
}) => {
  const currentCustomer = getCurrentCustomer();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [orderId, setOrderId] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<any>(null);
  const [invoiceDownloaded, setInvoiceDownloaded] = useState(false);

  // Form states - Pure Minimal Essentials (No Email)
  const [name, setName] = useState(currentCustomer?.name || '');
  const [phone, setPhone] = useState(currentCustomer?.phone || '');
  const [address, setAddress] = useState(currentCustomer?.address || '');
  const [city, setCity] = useState(currentCustomer?.city || '');
  const [thana, setThana] = useState(currentCustomer?.thana || '');
  const [deliveryZone, setDeliveryZone] = useState<'inside' | 'outside'>('inside');

  // Coupon states
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponMessage, setCouponMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Always scroll to top when step changes to 'success'
  useEffect(() => {
    if (step === 'success') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [step]);

  // Delivery charge in BDT: Inside Dhaka = 80 BDT, Outside Dhaka = 120 BDT
  const deliveryCharge = deliveryZone === 'inside' ? 80 : 120;

  // Subtotal in BDT: exact sum of (price * quantity)
  const subtotal = items.reduce((acc, item) => acc + Math.round(item.product.price || 0) * item.quantity, 0);

  // Discount calculation in BDT
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercentage) {
      discount = Math.round((subtotal * appliedCoupon.discountPercentage) / 100);
    } else if (appliedCoupon.discountAmount) {
      discount = Math.round(appliedCoupon.discountAmount);
    }
  }

  // Grand Total in BDT: Subtotal - Discount + Delivery Charge
  const grandTotal = Math.max(0, subtotal - discount + deliveryCharge);

  const formatPrice = (amount: number) => {
    return `৳${Math.round(amount || 0).toLocaleString('en-US')}`;
  };

  // Track incomplete orders when phone number is provided
  useEffect(() => {
    if (phone.length >= 10 && onIncompleteOrder) {
      const cartSummary = items.map(i => `${i.product.name} (x${i.quantity})`).join(', ');
      onIncompleteOrder({
        phone,
        customerName: name || 'গেস্ট কাস্টমার',
        address: `${address}, ${thana}, ${city}`.replace(/(,\s*)+/g, ', ').trim(),
        cartSummary,
        total: grandTotal
      });
    }
  }, [phone, name, address, thana, city, grandTotal]);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const matched = coupons.find(c => c.code.toLowerCase() === couponInput.trim().toLowerCase());
    if (matched && (matched.isActive ?? true)) {
      setAppliedCoupon(matched);
      setCouponMessage({ text: `কুপন "${matched.code}" যুক্ত হয়েছে!`, type: 'success' });
    } else {
      setAppliedCoupon(null);
      setCouponMessage({ text: 'সঠিক কুপন কোড প্রদান করুন।', type: 'error' });
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedId = `GHM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);

    const fullAddress = `${address}${thana ? `, ${thana}` : ''}${city ? `, ${city}` : ''}`.replace(/(,\s*)+/g, ', ').trim();

    const orderData = {
      orderId: generatedId,
      customerName: name.trim() || 'Valued Customer',
      phone: phone.trim(),
      email: currentCustomer?.email || undefined,
      address: fullAddress,
      thana: thana.trim(),
      city: city.trim(),
      deliveryZone: deliveryZone === 'inside' ? 'Inside Dhaka (৳80)' : 'Outside Dhaka (৳120)',
      deliveryChargeBdt: deliveryCharge,
      subtotalBdt: subtotal,
      discountBdt: discount,
      totalBdt: grandTotal,
      total: grandTotal,
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      items: items.map(i => ({ 
        productName: i.product.name, 
        quantity: i.quantity, 
        price: Math.round(i.product.price || 0),
        priceBdt: Math.round(i.product.price || 0),
        selectedColor: i.selectedColor,
        imageUrl: i.product.imageUrl || (i.product.images && i.product.images[0])
      }))
    };

    setSubmittedOrder(orderData);

    // Fire Meta Pixel Purchase Event (Value & Currency: BDT)
    trackPurchase({
      orderId: generatedId,
      value: grandTotal,
      currency: 'BDT',
      items: orderData.items.map(it => ({
        name: it.productName,
        price: it.priceBdt,
        quantity: it.quantity
      }))
    });

    onOrderSuccess(generatedId, {
      customerName: orderData.customerName,
      phone: orderData.phone,
      email: orderData.email,
      address: orderData.address,
      thana: orderData.thana,
      city: orderData.city,
      deliveryZone: orderData.deliveryZone,
      total: grandTotal,
      items: orderData.items,
      discount
    });

    onClearCart();
    setStep('success');
    setIsSubmitting(false);

    // Scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ================= 100% ENGLISH COMPACT PRINTABLE A4 INVOICE =================
  // Direct in-page background download with embedded brand logo
  const handleDownloadInvoice = async () => {
    if (!submittedOrder) return;
    await downloadOrderInvoice(submittedOrder);
    setInvoiceDownloaded(true);
    setTimeout(() => setInvoiceDownloaded(false), 5000);
  };

  // ================= 1. ORDER SUCCESS / THANK YOU SCREEN =================
  // Loads from the very top (window.scrollTo) and features Invoice Download
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-[#f8fafc] pt-6 pb-20 px-4 sm:px-6 font-sans">
        <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-8 text-center space-y-5 animate-in fade-in duration-200">
          
          {/* Animated Success Check */}
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center ring-8 ring-emerald-50/60 shadow-xs">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              অর্ডারটি সফলভাবে সম্পন্ন হয়েছে!
            </h1>
            <p className="text-xs text-slate-500">
              ধন্যবাদ! পার্সেলটি দ্রুত আপনার ঠিকানায় পৌঁছে দেওয়া হবে।
            </p>
          </div>

          {/* Minimal Order ID Bar */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">অর্ডার আইডি</span>
              <span className="text-base font-mono font-black text-slate-900">#{orderId}</span>
            </div>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'কপি হয়েছে' : 'কপি'}</span>
            </button>
          </div>

          {/* Quick Notice Card */}
          <div className="p-3 bg-blue-50/50 rounded-2xl border border-blue-100/80 text-left text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 text-blue-800 font-bold text-xs">
              <Truck className="w-3.5 h-3.5 shrink-0" />
              <span>হোম ডেলিভারি (ক্যাশ অন ডেলিভারি)</span>
            </div>
            <p className="text-[11px] text-slate-500">
              ডেলিভারিম্যানের কাছ থেকে পণ্য বুঝে পেয়ে মূল্য পরিশোধ করুন।
            </p>
          </div>

          {/* ACTION BUTTONS: IN-PAGE INVOICE DOWNLOAD & HOME */}
          <div className="pt-2 space-y-2.5">
            {/* Direct In-Page Invoice Download Button */}
            <button
              type="button"
              onClick={handleDownloadInvoice}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Invoice (English A4)</span>
            </button>

            {/* In-page download confirmation notice */}
            {invoiceDownloaded && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 animate-in fade-in duration-200">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Invoice downloaded directly to your phone!</span>
              </div>
            )}

            {/* Back to Home Button */}
            <button
              type="button"
              onClick={onBack}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>হোমে ফিরে যান</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ================= 2. EMPTY CART VIEW =================
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8fafc] pt-12 pb-20 px-3.5 sm:px-6 font-sans">
        <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-200/80 p-8 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-base sm:text-lg font-black text-slate-900">আপনার কার্টে কোনো পণ্য নেই</h2>
          <p className="text-xs text-slate-500">
            চেকআউট করার জন্য অনুগ্রহ করে কিছু পণ্য কার্টে যুক্ত করুন।
          </p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>শপিংয়ে ফিরে যান</span>
          </button>
        </div>
      </div>
    );
  }

  // ================= 3. PURE MINIMAL SLEEK CHECKOUT FORM =================
  return (
    <div className="min-h-screen bg-[#f8fafc] pt-4 pb-20 px-3.5 sm:px-6 font-sans">
      <div className="max-w-3xl mx-auto space-y-4">
        
        {/* Clean Header Bar */}
        <div className="flex items-center justify-between pb-1">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>শপে ফিরে যান</span>
          </button>
          <span className="text-xs font-extrabold text-slate-900 tracking-tight">
            ক্যাশ অন ডেলিভারি চেকআউট
          </span>
        </div>

        <form onSubmit={handleSubmitOrder} className="space-y-4">
          
          {/* Section 1: Customer & Delivery Details */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-2.5">
              ডেলিভারি তথ্য
            </h2>

            <div className="space-y-3">
              {/* Name */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  আপনার নাম <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: তানভীর আহমেদ"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/40 focus:bg-white focus:border-blue-600 outline-none transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  মোবাইল নম্বর <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="যেমন: 017XXXXXXXX"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/40 focus:bg-white focus:border-blue-600 outline-none transition-all font-mono"
                />
              </div>

              {/* Full Address */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  সম্পূর্ণ ঠিকানা (বাসা/রোড/এলাকা) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="যেমন: বাসা ১২, রোড ৪, ব্লক সি"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/40 focus:bg-white focus:border-blue-600 outline-none transition-all"
                />
              </div>

              {/* District & Thana in 2 Columns */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    জেলা / শহর <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="ঢাকা / চট্টগ্রাম"
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/40 focus:bg-white focus:border-blue-600 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    থানা / উপজেলা <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={thana}
                    onChange={(e) => setThana(e.target.value)}
                    placeholder="মিরপুর / উত্তরা"
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/40 focus:bg-white focus:border-blue-600 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Delivery Zone: 2 Clean Minimal Cards */}
              <div className="pt-2">
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                  ডেলিভারি এলাকা:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <div
                    onClick={() => setDeliveryZone('inside')}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      deliveryZone === 'inside'
                        ? 'border-blue-600 bg-blue-50/50 shadow-2xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <span className="font-extrabold text-xs text-slate-900 block">ঢাকার ভিতরে</span>
                      <span className="text-[10px] text-slate-500">২৪-৪৮ ঘণ্টা</span>
                    </div>
                    <span className="text-xs font-black text-blue-700 bg-white px-2 py-0.5 rounded-lg border border-blue-200">
                      ৳৮০
                    </span>
                  </div>

                  <div
                    onClick={() => setDeliveryZone('outside')}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      deliveryZone === 'outside'
                        ? 'border-blue-600 bg-blue-50/50 shadow-2xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <span className="font-extrabold text-xs text-slate-900 block">ঢাকার বাইরে</span>
                      <span className="text-[10px] text-slate-500">২-৩ দিন</span>
                    </div>
                    <span className="text-xs font-black text-blue-700 bg-white px-2 py-0.5 rounded-lg border border-blue-200">
                      ৳১২০
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Section 2: Order Summary & Confirm Action */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-2.5">
              অর্ডার বিবরণ ({items.length}টি পণ্য)
            </h2>

            {/* Compact Item Rows with Delete Option */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-slate-100">
              {items.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedColor || ''}-${idx}`} className="pt-2.5 first:pt-0 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                      {item.product.imageUrl || (item.product.images && item.product.images[0]) ? (
                        <img
                          src={item.product.imageUrl || (item.product.images && item.product.images[0])}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-4 h-4 text-slate-400 m-auto mt-3" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 truncate">{item.product.name}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                        <span>{formatPrice(item.product.price)}</span>
                        {item.selectedColor && <span>• {item.selectedColor}</span>}
                      </div>

                      {/* Quantity & Delete Controls */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="inline-flex items-center bg-slate-100 rounded-lg border border-slate-200">
                          <button
                            type="button"
                            onClick={() => {
                              if (item.quantity <= 1) {
                                onRemoveItem?.(item.product.id, item.selectedColor);
                              } else {
                                onUpdateQuantity?.(item.product.id, item.quantity - 1, item.selectedColor);
                              }
                            }}
                            className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-rose-600 cursor-pointer"
                            title={item.quantity <= 1 ? "পণ্যটি ডিলিট করুন" : "পরিমাণ কমান"}
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="w-5 text-center text-[10px] font-bold text-slate-900 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity?.(item.product.id, item.quantity + 1, item.selectedColor)}
                            className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-blue-600 cursor-pointer"
                            title="পরিমাণ বাড়ান"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="font-extrabold text-slate-900 text-xs">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    {onRemoveItem && (
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id, item.selectedColor)}
                        className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        title="পণ্যটি ডিলিট করুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Compact Coupon Code Box */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="কুপন কোড (যদি থাকে)"
                  className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 uppercase tracking-wider outline-none focus:bg-white focus:border-blue-600"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all cursor-pointer shadow-2xs"
                >
                  প্রয়োগ
                </button>
              </div>
              {couponMessage && (
                <p className={`text-[11px] mt-1 font-bold ${
                  couponMessage.type === 'success' ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {couponMessage.text}
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>পণ্যের মূল্য:</span>
                <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>ডেলিভারি চার্জ:</span>
                <span className="font-bold text-slate-900">{formatPrice(deliveryCharge)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>ডিসকাউন্ট:</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm font-black text-slate-900">
                <span>সর্বমোট প্রদেয় মূল্য:</span>
                <span className="text-lg text-blue-600">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Big Confirm Order Button */}
            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="w-full py-4 bg-[#0a192f] hover:bg-blue-600 text-white font-black text-sm rounded-2xl transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>অর্ডার কনফার্ম করুন • {formatPrice(grandTotal)}</span>
            </button>

            <p className="text-[11px] text-slate-400 text-center">
              পণ্য হাতে পেয়ে চেক করে টাকা পরিশোধ করুন (ক্যাশ অন ডেলিভারি)
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};
