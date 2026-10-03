import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, CheckCircle2, Copy, Check, Truck, 
  MapPin, User, Phone, Package, Tag, Lock, Download, Printer, Home
} from 'lucide-react';
import { CartItem, Currency, Coupon } from '../types';
import { getCurrentCustomer } from '../utils/customerAuth';

interface CheckoutPageProps {
  items: CartItem[];
  currentCurrency: Currency;
  onBack: () => void;
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
        customerName: name || 'গেস্ট কাস্টমার',
        address: `${address}, ${thana}, ${city}`.replace(/(,\s*)+/g, ', ').trim(),
        cartSummary,
        total: grandTotalUsd
      });
    }
  }, [phone, name, address, thana, city, grandTotalUsd]);

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
      deliveryChargeBdt: deliveryChargeInBdt,
      subtotalBdt: Math.round(rawSubtotalUsd * currentCurrency.rate),
      discountBdt: Math.round(discountUsd * currentCurrency.rate),
      totalBdt: Math.round(grandTotalUsd * currentCurrency.rate),
      total: grandTotalUsd,
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      items: items.map(i => ({ 
        productName: i.product.name, 
        quantity: i.quantity, 
        price: i.product.price,
        priceBdt: Math.round(i.product.price * currentCurrency.rate),
        selectedColor: i.selectedColor,
        imageUrl: i.product.imageUrl || (i.product.images && i.product.images[0])
      }))
    };

    setSubmittedOrder(orderData);

    onOrderSuccess(generatedId, {
      customerName: orderData.customerName,
      phone: orderData.phone,
      email: orderData.email,
      address: orderData.address,
      thana: orderData.thana,
      city: orderData.city,
      deliveryZone: orderData.deliveryZone,
      total: grandTotalUsd,
      items: orderData.items
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

  // ================= 100% ENGLISH MINIMAL A4 INVOICE GENERATOR =================
  // Silent in-page download (Never leaves the website!)
  const handleDownloadInvoice = () => {
    if (!submittedOrder) return;
    const inv = submittedOrder;

    const invoiceHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice-${inv.orderId} - Gadget Hub Mart</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }
    body {
      background: #f1f5f9;
      color: #0f172a;
      padding: 24px;
      line-height: 1.5;
      font-size: 13px;
    }
    .invoice-wrapper {
      max-width: 780px;
      margin: 0 auto;
      border: 1px solid #cbd5e1;
      border-radius: 16px;
      padding: 36px 40px;
      background: #ffffff;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 22px;
      margin-bottom: 24px;
    }
    .brand-section {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .brand-badge {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: linear-gradient(135deg, #0a192f 0%, #1e3a8a 100%);
      color: #38bdf8;
      font-weight: 900;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .brand-title {
      font-size: 24px;
      font-weight: 900;
      color: #0a192f;
      letter-spacing: -0.5px;
      line-height: 1.1;
    }
    .brand-sub {
      font-size: 11px;
      color: #64748b;
      margin-top: 3px;
      font-weight: 600;
      letter-spacing: 0.2px;
    }
    .brand-contacts {
      font-size: 11px;
      color: #475569;
      margin-top: 4px;
    }
    .meta-box {
      text-align: right;
    }
    .meta-title {
      font-size: 22px;
      font-weight: 900;
      color: #2563eb;
      letter-spacing: 1.5px;
    }
    .meta-num {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 15px;
      font-weight: 800;
      color: #0f172a;
      margin-top: 4px;
    }
    .meta-date {
      font-size: 11px;
      color: #64748b;
      margin-top: 3px;
    }
    .barcode-strip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      border-radius: 10px;
      padding: 10px 16px;
      margin-bottom: 24px;
    }
    .barcode-text {
      font-size: 11px;
      color: #475569;
      font-weight: 600;
    }
    .barcode-svg {
      height: 24px;
      display: flex;
      gap: 3px;
      align-items: center;
    }
    .bar {
      height: 100%;
      background: #0f172a;
      border-radius: 1px;
    }
    .details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
      margin-bottom: 24px;
    }
    .card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 16px 18px;
    }
    .card-label {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #64748b;
      margin-bottom: 8px;
    }
    .card-val {
      font-size: 12px;
      color: #1e293b;
      margin-bottom: 4px;
    }
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 10px;
      font-weight: 800;
      background: #dcfce7;
      color: #15803d;
      border: 1px solid #bbf7d0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    th {
      background: #0f172a;
      color: #ffffff;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 12px 14px;
      text-align: left;
    }
    th:first-child { border-radius: 8px 0 0 8px; }
    th:last-child { border-radius: 0 8px 8px 0; text-align: right; }
    td {
      padding: 13px 14px;
      border-bottom: 1px solid #f1f5f9;
      font-size: 12px;
      color: #334155;
    }
    td:last-child { text-align: right; font-weight: 700; color: #0f172a; }
    .totals-wrapper {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 28px;
    }
    .totals-box {
      width: 290px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 16px 18px;
    }
    .row {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #64748b;
      margin-bottom: 7px;
    }
    .row.grand {
      border-top: 2px solid #e2e8f0;
      padding-top: 10px;
      margin-top: 10px;
      margin-bottom: 0;
      font-size: 16px;
      font-weight: 900;
      color: #0f172a;
    }
    .row.grand span:last-child {
      color: #2563eb;
    }
    .footer {
      border-top: 1px dashed #cbd5e1;
      padding-top: 18px;
      text-align: center;
      color: #64748b;
      font-size: 11px;
    }
    .verified-seal {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 12px;
      padding: 5px 18px;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 9999px;
      color: #1d4ed8;
      font-weight: 800;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    @media print {
      body { padding: 0; background: #fff; }
      .invoice-wrapper { border: none; padding: 0; box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="invoice-wrapper">
    
    <div class="header">
      <div class="brand-section">
        <div class="brand-badge">GH</div>
        <div>
          <div class="brand-title">Gadget Hub Mart</div>
          <div class="brand-sub">Official Premium Tech & Electronics Store</div>
          <div class="brand-contacts">
            Hotline: +880 1835-985730 &bull; Web: www.gadgethubmart.bd &bull; Email: support@gadgethubmart.bd
          </div>
        </div>
      </div>
      <div class="meta-box">
        <div class="meta-title">TAX INVOICE</div>
        <div class="meta-num">#${inv.orderId}</div>
        <div class="meta-date">Issued: ${inv.date} at ${inv.time}</div>
      </div>
    </div>

    <!-- Security & Verification Barcode Header -->
    <div class="barcode-strip">
      <div class="barcode-text">
        <span>SECURITY TOKEN: <strong>GHM-SEC-${Math.floor(100000 + Math.random() * 900000)}</strong> &bull; VERIFIED CASH ON DELIVERY</span>
      </div>
      <div class="barcode-svg">
        <div class="bar" style="width: 2px;"></div>
        <div class="bar" style="width: 4px;"></div>
        <div class="bar" style="width: 1px;"></div>
        <div class="bar" style="width: 3px;"></div>
        <div class="bar" style="width: 1px;"></div>
        <div class="bar" style="width: 5px;"></div>
        <div class="bar" style="width: 2px;"></div>
        <div class="bar" style="width: 3px;"></div>
        <div class="bar" style="width: 1px;"></div>
        <div class="bar" style="width: 4px;"></div>
        <div class="bar" style="width: 2px;"></div>
      </div>
    </div>

    <div class="details-grid">
      <div class="card">
        <div class="card-label">Billed & Delivered To</div>
        <div class="card-val">Customer: <strong>${inv.customerName}</strong></div>
        <div class="card-val">Phone: <strong>${inv.phone}</strong></div>
        <div class="card-val">Delivery Address: ${inv.address}</div>
      </div>
      <div class="card">
        <div class="card-label">Order & Logistics Information</div>
        <div class="card-val">Payment Method: <span class="badge">Cash on Delivery (COD)</span></div>
        <div class="card-val">Delivery Zone: <strong>${inv.deliveryZone}</strong></div>
        <div class="card-val">Courier Partner: <strong>Steadfast Express Logistics</strong></div>
        <div class="card-val">Status: <strong>Order Confirmed & In Dispatch</strong></div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width: 40px; text-align: center;">#</th>
          <th>Item Description & Specifications</th>
          <th style="width: 70px; text-align: center;">Qty</th>
          <th style="width: 110px; text-align: right;">Unit Price</th>
          <th style="width: 120px;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${inv.items.map((it: any, idx: number) => `
          <tr>
            <td style="text-align: center; color: #64748b;">${idx + 1}</td>
            <td>
              <strong style="color: #0f172a; font-size: 13px;">${it.productName}</strong>
              ${it.selectedColor ? `<div style="font-size: 11px; color: #64748b; margin-top: 1px;">Color Variant: ${it.selectedColor}</div>` : ''}
              <div style="font-size: 10px; color: #94a3b8; margin-top: 1px;">Genuine Brand Product &bull; 7 Days Replacement Warranty</div>
            </td>
            <td style="text-align: center; font-weight: bold;">${it.quantity}</td>
            <td style="text-align: right;">৳${it.priceBdt.toLocaleString()}</td>
            <td>৳${(it.priceBdt * it.quantity).toLocaleString()}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div class="totals-wrapper">
      <div class="totals-box">
        <div class="row">
          <span>Subtotal:</span>
          <span style="font-weight: bold; color: #0f172a;">৳${inv.subtotalBdt.toLocaleString()}</span>
        </div>
        <div class="row">
          <span>Delivery Charge:</span>
          <span style="font-weight: bold; color: #0f172a;">৳${inv.deliveryChargeBdt}</span>
        </div>
        ${inv.discountBdt > 0 ? `
          <div class="row" style="color: #16a34a;">
            <span>Coupon Discount:</span>
            <span style="font-weight: bold;">-৳${inv.discountBdt.toLocaleString()}</span>
          </div>
        ` : ''}
        <div class="row grand">
          <span>Total Payable (COD):</span>
          <span>৳${inv.totalBdt.toLocaleString()}</span>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>Thank you for choosing Gadget Hub Mart! Please inspect your parcel before handing cash to the delivery agent.</p>
      <div class="verified-seal">
        &check; Official Verified Cash On Delivery Invoice &bull; Gadget Hub Mart
      </div>
    </div>

  </div>
</body>
</html>`;

    // 1. SILENT IN-PAGE DIRECT DOWNLOAD (User stays 100% on the website, never leaves!)
    const blob = new Blob([invoiceHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice-${inv.orderId}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // 2. Set visual confirmation feedback
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

  // ================= 2. PURE MINIMAL SLEEK CHECKOUT FORM =================
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

            {/* Compact Item Rows */}
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {items.map((item, idx) => (
                <div key={`${item.product.id}-${idx}`} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
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
                      <p className="text-[10px] text-slate-500">
                        {item.quantity}টি {item.selectedColor ? `• ${item.selectedColor}` : ''}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900 shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
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
                <span className="font-bold text-slate-900">{formatPrice(rawSubtotalUsd)}</span>
              </div>
              <div className="flex justify-between">
                <span>ডেলিভারি চার্জ:</span>
                <span className="font-bold text-slate-900">{formatPrice(deliveryChargeInUsd)}</span>
              </div>
              {discountUsd > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>ডিসকাউন্ট:</span>
                  <span>-{formatPrice(discountUsd)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm font-black text-slate-900">
                <span>সর্বমোট প্রদেয় মূল্য:</span>
                <span className="text-lg text-blue-600">{formatPrice(grandTotalUsd)}</span>
              </div>
            </div>

            {/* Big Confirm Order Button */}
            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="w-full py-4 bg-[#0a192f] hover:bg-blue-600 text-white font-black text-sm rounded-2xl transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>অর্ডার কনফার্ম করুন • {formatPrice(grandTotalUsd)}</span>
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
