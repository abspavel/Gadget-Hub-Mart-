import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Package, Clock, CheckCircle2, 
  Truck, AlertCircle, ArrowLeft, LogOut, Edit3, Eye, EyeOff, 
  ExternalLink, ChevronRight, ShoppingBag, ShieldCheck, Copy, Check, Download
} from 'lucide-react';
import { CustomerUser, Order } from '../types';
import { formatBdtPrice } from './ProductCard';
import { loginCustomer, registerCustomer, updateCustomerProfile, logoutCustomer } from '../utils/customerAuth';
import { downloadOrderInvoice } from '../utils/invoiceGenerator';

interface ProfilePageProps {
  currentCustomer: CustomerUser | null;
  onCustomerChange: (customer: CustomerUser | null) => void;
  orders: Order[];
  onBack: () => void;
  onNavigateHome: () => void;
  onNavigateAllProducts: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  currentCustomer,
  onCustomerChange,
  orders,
  onBack,
  onNavigateHome,
  onNavigateAllProducts
}) => {
  // Auth Tab: 'login' | 'register'
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  
  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Register Form States
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState('');

  // Edit Profile Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(currentCustomer?.name || '');
  const [editPhone, setEditPhone] = useState(currentCustomer?.phone || '');
  const [editAddress, setEditAddress] = useState(currentCustomer?.address || '');
  const [editCity, setEditCity] = useState(currentCustomer?.city || '');
  const [editThana, setEditThana] = useState(currentCustomer?.thana || '');
  const [editSaving, setEditSaving] = useState(false);

  // Copied tracking code feedback
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Handle Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await loginCustomer(loginEmail, loginPassword);
      if (res.success && res.customer) {
        onCustomerChange(res.customer);
      } else {
        setLoginError(res.error || 'লগইন ব্যর্থ হয়েছে। তথ্য যাচাই করুন।');
      }
    } catch (err: any) {
      setLoginError(err.message || 'একটি সমস্যা দেখা দিয়েছে।');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Register
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegLoading(true);

    try {
      const res = await registerCustomer(regName, regEmail, regPassword, regPhone);
      if (res.success && res.customer) {
        onCustomerChange(res.customer);
      } else {
        setRegError(res.error || 'অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।');
      }
    } catch (err: any) {
      setRegError(err.message || 'একটি সমস্যা দেখা দিয়েছে।');
    } finally {
      setRegLoading(false);
    }
  };

  // Handle Edit Profile Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditSaving(true);
    try {
      const res = await updateCustomerProfile({
        name: editName,
        phone: editPhone,
        address: editAddress,
        city: editCity,
        thana: editThana
      });
      if (res.success && res.customer) {
        onCustomerChange(res.customer);
        setIsEditModalOpen(false);
      }
    } finally {
      setEditSaving(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    logoutCustomer();
    onCustomerChange(null);
  };

  // Strictly filter orders for THIS CUSTOMER ONLY
  // Other customers' orders are never visible!
  const customerEmail = currentCustomer?.email?.trim().toLowerCase() || '';
  const customerPhone = currentCustomer?.phone?.trim() || '';

  const myOrders = orders.filter((o) => {
    if (!currentCustomer) return false;
    const orderEmail = o.email ? o.email.trim().toLowerCase() : '';
    const orderPhone = o.phone ? o.phone.trim() : '';

    const matchesEmail = customerEmail && orderEmail && orderEmail === customerEmail;
    const matchesPhone = customerPhone && orderPhone && orderPhone === customerPhone;

    return matchesEmail || matchesPhone;
  });

  // Calculate customer statistics
  const totalOrdersCount = myOrders.length;
  const pendingOrdersCount = myOrders.filter((o) => o.status === 'Pending' || o.status === 'Processing').length;
  const deliveredOrdersCount = myOrders.filter((o) => o.status === 'Delivered').length;
  const totalSpentBdt = myOrders.reduce((sum, o) => sum + (o.total || 0), 0);

  // Status helper
  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            অপেক্ষমান (Pending)
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            প্রসেসিং হচ্ছে (Processing)
          </span>
        );
      case 'Sent to Courier':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <Truck className="w-3.5 h-3.5 text-purple-600" />
            কুরিয়ারে হস্তান্তর (Shipped)
          </span>
        );
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            ডেলিভারি সম্পন্ন (Delivered)
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            বাতিল (Cancelled)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
            {status}
          </span>
        );
    }
  };

  // Progress Stepper calculation
  const getStepProgress = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return 1;
      case 'Processing':
        return 2;
      case 'Sent to Courier':
        return 3;
      case 'Delivered':
        return 4;
      case 'Cancelled':
        return 0;
      default:
        return 1;
    }
  };

  // ================= RENDER: NOT LOGGED IN (AUTH SCREEN) =================
  if (!currentCustomer) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] pt-4 pb-16 px-4 sm:px-6">
        <div className="max-w-md mx-auto space-y-6">
          
          {/* Back button */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোমে ফিরে যান</span>
          </button>

          {/* Card Container */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
            
            {/* Header Icon & Title */}
            <div className="text-center space-y-2 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0a192f] to-blue-600 text-white mx-auto flex items-center justify-center shadow-md">
                <User className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-black text-gray-950 tracking-tight">
                {authTab === 'login' ? 'কাস্টমার লগইন' : 'নতুন অ্যাকাউন্ট তৈরি করুন'}
              </h1>
              <p className="text-xs text-gray-500">
                {authTab === 'login'
                  ? 'আপনার অ্যাকাউন্টে লগইন করে পূর্ববর্তী সকল অর্ডার ও লাইভ ট্র্যাকিং দেখুন'
                  : 'নাম, ইমেইল ও পাসওয়ার্ড দিয়ে একাউন্ট করে আপনার অর্ডারসমূহ সংরক্ষণ করুন'}
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex bg-gray-100 p-1 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => { setAuthTab('login'); setLoginError(''); setRegError(''); }}
                className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                  authTab === 'login'
                    ? 'bg-white text-gray-950 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                লগইন (Sign In)
              </button>
              <button
                type="button"
                onClick={() => { setAuthTab('register'); setLoginError(''); setRegError(''); }}
                className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                  authTab === 'register'
                    ? 'bg-white text-gray-950 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                রেজিস্ট্রেশন (Register)
              </button>
            </div>

            {/* TAB 1: LOGIN FORM */}
            {authTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {loginError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{loginError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    ইমেইল এড্রেস <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="example@gmail.com"
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    পাসওয়ার্ড <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="আপনার পাসওয়ার্ড লিখুন"
                      className="w-full pl-4 pr-10 py-2.5 text-xs rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3 bg-[#0a192f] hover:bg-blue-600 text-white text-xs font-black rounded-xl transition-all cursor-pointer shadow-md active:scale-98 disabled:opacity-50 mt-2"
                >
                  {loginLoading ? 'যাচাই করা হচ্ছে...' : 'লগইন করুন'}
                </button>

                <p className="text-[11px] text-gray-500 text-center pt-2">
                  অ্যাকাউন্ট নেই?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthTab('register')}
                    className="text-blue-600 font-bold hover:underline cursor-pointer"
                  >
                    নতুন অ্যাকাউন্ট খুলুন
                  </button>
                </p>
              </form>
            )}

            {/* TAB 2: REGISTER FORM */}
            {authTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                {regError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{regError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    আপনার পুরো নাম <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="মোঃ তানভীর আহমেদ"
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    ইমেইল এড্রেস <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="example@gmail.com"
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    মোবাইল নম্বর (ঐচ্ছিক - অর্ডার ট্র্যাকিংয়ের জন্য)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    পাসওয়ার্ড <span className="text-rose-500">*</span> (কমপক্ষে ৬ অক্ষর)
                  </label>
                  <div className="relative">
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="কমপক্ষে ৬ অক্ষরের একটি শক্তিশালী পাসওয়ার্ড"
                      className="w-full pl-4 pr-10 py-2.5 text-xs rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={regLoading}
                  className="w-full py-3 bg-[#0a192f] hover:bg-blue-600 text-white text-xs font-black rounded-xl transition-all cursor-pointer shadow-md active:scale-98 disabled:opacity-50 mt-2"
                >
                  {regLoading ? 'অ্যাকাউন্ট তৈরি হচ্ছে...' : 'অ্যাকাউন্ট তৈরি করুন'}
                </button>

                <p className="text-[11px] text-gray-500 text-center pt-2">
                  ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthTab('login')}
                    className="text-blue-600 font-bold hover:underline cursor-pointer"
                  >
                    লগইন করুন
                  </button>
                </p>
              </form>
            )}

          </div>

          {/* Privacy & Safety Note */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>আপনার ডেটা ও অর্ডার তথ্য ১০০% নিরাপদ ও সম্পূর্ণভাবে সংরক্ষিত।</span>
          </div>

        </div>
      </div>
    );
  }

  // ================= RENDER: LOGGED IN PROFILE & ORDER VIEW =================
  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-4 pb-20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোমে ফিরে যান</span>
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gray-100 hover:bg-rose-50 text-gray-700 hover:text-rose-600 transition-colors cursor-pointer border border-gray-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>লগআউট</span>
          </button>
        </div>

        {/* ================= PROFILE HERO CARD ================= */}
        <div className="bg-[#0a192f] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-slate-700/60">
          <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Avatar Initial */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg shrink-0">
                {currentCustomer.name ? currentCustomer.name.charAt(0).toUpperCase() : 'U'}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                    {currentCustomer.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    কাস্টমার অ্যাকাউন্ট
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                  <span className="inline-flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    {currentCustomer.email}
                  </span>
                  {currentCustomer.phone && (
                    <span className="inline-flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-cyan-400" />
                      {currentCustomer.phone}
                    </span>
                  )}
                </div>
                {(currentCustomer.address || currentCustomer.city) && (
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 pt-0.5">
                    <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span className="truncate">{currentCustomer.address} {currentCustomer.thana ? `, ${currentCustomer.thana}` : ''} {currentCustomer.city ? `, ${currentCustomer.city}` : ''}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 self-start md:self-center">
              <button
                onClick={() => {
                  setEditName(currentCustomer.name);
                  setEditPhone(currentCustomer.phone || '');
                  setEditAddress(currentCustomer.address || '');
                  setEditCity(currentCustomer.city || '');
                  setEditThana(currentCustomer.thana || '');
                  setIsEditModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-white/10"
              >
                <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                <span>প্রোফাইল এডিট</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= ORDER METRICS SUMMARY ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-gray-500 font-bold">মোট অর্ডার</p>
              <p className="text-lg font-black text-gray-950">{totalOrdersCount} টি</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-gray-500 font-bold">প্রসেসিং হচ্ছে</p>
              <p className="text-lg font-black text-amber-600">{pendingOrdersCount} টি</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-gray-500 font-bold">ডেলিভার্ড হয়েছে</p>
              <p className="text-lg font-black text-emerald-600">{deliveredOrdersCount} টি</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-gray-500 font-bold">মোট কেনাকাটা</p>
              <p className="text-lg font-black text-gray-950">{formatBdtPrice(totalSpentBdt)}</p>
            </div>
          </div>
        </div>

        {/* ================= STRICT PERSONAL ORDERS LIST ================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-gray-950 tracking-tight">
                আমার অর্ডারসমূহ ({myOrders.length})
              </h2>
              <p className="text-xs text-gray-500">
                আপনার অ্যাকাউন্টের আওতায় থাকা সমস্ত অর্ডারের বিশদ বিবরণ ও লাইভ স্ট্যাটাস
              </p>
            </div>
          </div>

          {/* EMPTY STATE */}
          {myOrders.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center space-y-4 border border-gray-100 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <h3 className="text-base font-bold text-gray-900">এখনো কোনো অর্ডার পাওয়া যায়নি</h3>
                <p className="text-xs text-gray-500">
                  আপনি এখনো কোনো অর্ডার করেননি। আমাদের প্রিমিয়াম টেক গ্যাজেট কালেকশন দেখে এখনই অর্ডার করুন!
                </p>
              </div>
              <button
                onClick={onNavigateAllProducts}
                className="px-6 py-2.5 bg-[#0a192f] hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
              >
                প্রোডাক্ট দেখুন ও শপিং করুন
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {myOrders.map((order, orderIdx) => {
                const step = getStepProgress(order.status);
                const isCancelled = order.status === 'Cancelled';

                return (
                  <div
                    key={`${order.id}-${orderIdx}`}
                    className="bg-white rounded-3xl p-5 sm:p-7 shadow-xs hover:shadow-md transition-shadow border border-gray-100 space-y-5"
                  >
                    {/* Order Top Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-gray-400">অর্ডার আইডি:</span>
                          <span className="font-mono text-sm sm:text-base font-black text-gray-950">
                            #{order.id}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          তারিখ: {order.date || 'সাম্প্রতিক'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => downloadOrderInvoice(order)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-all border border-blue-200 cursor-pointer shadow-2xs active:scale-95"
                          title="A4 ইনভয়েস ডাউনলোড করুন"
                        >
                          <Download className="w-3.5 h-3.5 text-blue-600" />
                          <span>ইনভয়েস</span>
                        </button>
                        {getStatusBadge(order.status)}
                      </div>
                    </div>

                    {/* Order Progress Stepper (Only if not cancelled) */}
                    {!isCancelled && (
                      <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[11px] font-bold text-gray-600 mb-3 flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-blue-600" />
                          <span>অর্ডার ট্র্যাকিং প্রগ্রেস:</span>
                        </p>
                        
                        <div className="grid grid-cols-4 gap-2 relative">
                          {/* Step 1: Placed */}
                          <div className="text-center space-y-1.5">
                            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full mx-auto flex items-center justify-center text-xs font-bold transition-all ${
                              step >= 1 ? 'bg-emerald-600 text-white shadow-xs' : 'bg-gray-200 text-gray-500'
                            }`}>
                              ✓
                            </div>
                            <span className="text-[10px] sm:text-[11px] font-bold text-gray-800 block leading-tight">
                              অর্ডার গৃহীত
                            </span>
                          </div>

                          {/* Step 2: Processing */}
                          <div className="text-center space-y-1.5">
                            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full mx-auto flex items-center justify-center text-xs font-bold transition-all ${
                              step >= 2 ? 'bg-blue-600 text-white shadow-xs' : 'bg-gray-200 text-gray-500'
                            }`}>
                              {step >= 2 ? '✓' : '২'}
                            </div>
                            <span className="text-[10px] sm:text-[11px] font-bold text-gray-800 block leading-tight">
                              প্রসেসিং ও প্যাকিং
                            </span>
                          </div>

                          {/* Step 3: Shipped */}
                          <div className="text-center space-y-1.5">
                            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full mx-auto flex items-center justify-center text-xs font-bold transition-all ${
                              step >= 3 ? 'bg-purple-600 text-white shadow-xs' : 'bg-gray-200 text-gray-500'
                            }`}>
                              {step >= 3 ? '✓' : '৩'}
                            </div>
                            <span className="text-[10px] sm:text-[11px] font-bold text-gray-800 block leading-tight">
                              কুরিয়ারে হস্তান্তর
                            </span>
                          </div>

                          {/* Step 4: Delivered */}
                          <div className="text-center space-y-1.5">
                            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full mx-auto flex items-center justify-center text-xs font-bold transition-all ${
                              step >= 4 ? 'bg-emerald-600 text-white shadow-xs' : 'bg-gray-200 text-gray-500'
                            }`}>
                              {step >= 4 ? '✓' : '৪'}
                            </div>
                            <span className="text-[10px] sm:text-[11px] font-bold text-gray-800 block leading-tight">
                              ডেলিভারি সম্পন্ন
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Steadfast Courier Tracking Bar if available */}
                    {order.steadfastTrackingCode && (
                      <div className="bg-blue-50/70 border border-blue-200 p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-blue-700" />
                          <span className="text-xs font-bold text-blue-950">
                            Steadfast Tracking Code:
                          </span>
                          <span className="font-mono text-xs font-black bg-white px-2 py-0.5 rounded-md border border-blue-200 text-blue-800">
                            {order.steadfastTrackingCode}
                          </span>
                          <button
                            onClick={() => handleCopy(order.steadfastTrackingCode!)}
                            className="p-1 text-blue-600 hover:text-blue-800 cursor-pointer"
                            title="Copy code"
                          >
                            {copiedCode === order.steadfastTrackingCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        <a
                          href={`https://portal.steadfast.com.bd/tracking/${order.steadfastTrackingCode}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
                        >
                          <span>লাইভ কুরিয়ার ট্র্যাকিং</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}

                    {/* Ordered Items List */}
                    <div className="space-y-2.5">
                      <p className="text-xs font-bold text-gray-600">অর্ডারকৃত পণ্যসমূহ:</p>
                      <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
                        {order.items && order.items.length > 0 ? (
                          order.items.map((item, iIdx) => (
                            <div key={iIdx} className="p-3 sm:p-3.5 flex items-center justify-between gap-3 bg-white hover:bg-gray-50/50">
                              <div className="flex items-center gap-3">
                                {item.imageUrl ? (
                                  <img
                                    src={item.imageUrl}
                                    alt={item.productName}
                                    className="w-12 h-12 rounded-xl object-cover border border-gray-200 shrink-0"
                                  />
                                ) : (
                                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                                    <Package className="w-5 h-5" />
                                  </div>
                                )}
                                <div>
                                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1">
                                    {item.productName}
                                  </h4>
                                  <div className="flex items-center gap-2 text-[11px] text-gray-500">
                                    <span>পরিমাণ: {item.quantity}টি</span>
                                    {item.selectedColor && (
                                      <span>• কালার: <span className="font-semibold text-gray-800">{item.selectedColor}</span></span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="text-right shrink-0">
                                <span className="text-xs sm:text-sm font-black text-gray-950">
                                  {formatBdtPrice(item.price * item.quantity)}
                                </span>
                                {item.quantity > 1 && (
                                  <span className="text-[10px] text-gray-400 block">
                                    @{formatBdtPrice(item.price)}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-3 text-xs text-gray-500 italic">আইটেমের বিবরণ পাওয়া যায়নি</div>
                        )}
                      </div>
                    </div>

                    {/* Delivery & Payment Bottom Row */}
                    <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="space-y-0.5 text-gray-600">
                        <p className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span><strong>ডেলিভারি ঠিকানা:</strong> {order.address}</span>
                        </p>
                        <p className="text-[11px] text-gray-500 pl-4.5">
                          পেমেন্ট পদ্ধতি: <strong>{order.paymentMethod || 'ক্যাশ অন ডেলিভারি'}</strong>
                        </p>
                      </div>

                      <div className="text-right sm:text-right bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-[11px] text-gray-500 block">সর্বমোট প্রদেয় মূল্য</span>
                        <span className="text-base sm:text-lg font-black text-[#0a192f]">
                          {formatBdtPrice(order.total)}
                        </span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* ================= EDIT PROFILE MODAL ================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-md p-6 sm:p-7 space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-lg font-black text-gray-950">প্রোফাইল তথ্য আপডেট</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">পুরো নাম</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:border-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">মোবাইল নম্বর</label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:border-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ঠিকানা</label>
                <input
                  type="text"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  placeholder="বাড়ি/রোড/এলাকা"
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:border-blue-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">থানা</label>
                  <input
                    type="text"
                    value={editThana}
                    onChange={(e) => setEditThana(e.target.value)}
                    placeholder="উত্তরা"
                    className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:border-blue-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">জেলা / শহর</label>
                  <input
                    type="text"
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    placeholder="ঢাকা"
                    className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:border-blue-600 outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={editSaving}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0a192f] hover:bg-blue-600 text-white cursor-pointer transition-colors"
                >
                  {editSaving ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
