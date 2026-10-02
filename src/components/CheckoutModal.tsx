import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Banknote, Smartphone, Copy, Check } from 'lucide-react';
import { CartItem, Currency } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currentCurrency: Currency;
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currentCurrency,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [orderId, setOrderId] = useState('');
  const [copied, setCopied] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'mobile'>('cod');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = rawSubtotal >= 50 || rawSubtotal === 0;
  const shippingCost = isFreeShipping ? 0 : 4.99;
  const grandTotal = rawSubtotal + shippingCost;

  const formatPrice = (priceInUsd: number) => {
    const converted = priceInUsd * currentCurrency.rate;
    return `${currentCurrency.symbol}${converted.toFixed(2)}`;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `GHM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setStep('success');
    onOrderSuccess(generatedId);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'form' ? (
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950">
                Complete Your Order
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Fast shipping to your doorstep with guaranteed authenticity.
              </p>
            </div>

            {/* Order Items Snapshot */}
            <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 space-y-2">
              <div className="text-xs font-bold text-gray-700">Order Summary ({items.length} items)</div>
              <div className="max-h-28 overflow-y-auto space-y-1.5 pr-2">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-xs text-gray-600">
                    <span className="truncate pr-2">{item.quantity}× {item.product.name}</span>
                    <span className="font-semibold text-gray-900 shrink-0 tabular-nums">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between text-xs font-bold text-gray-900">
                <span>Total Due:</span>
                <span className="text-blue-600 font-extrabold text-sm tabular-nums">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                1. Delivery Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name *"
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Mobile Phone Number *"
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address for Tracking *"
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none sm:col-span-2"
                />
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street Address, Flat / House No. *"
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none sm:col-span-2"
                />
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City / District *"
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Postal Code *"
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                2. Select Payment Method
              </h3>
              <div className="grid grid-cols-3 gap-2.5">
                {/* Cash On Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-emerald-600 mb-1" />
                  <div>
                    <div className="text-xs font-bold text-gray-900">Cash on Delivery</div>
                    <div className="text-[10px] text-gray-500">Pay when arrived</div>
                  </div>
                </button>

                {/* Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-blue-600 mb-1" />
                  <div>
                    <div className="text-xs font-bold text-gray-900">Credit / Debit Card</div>
                    <div className="text-[10px] text-gray-500">Visa, Mastercard</div>
                  </div>
                </button>

                {/* Mobile Wallet */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mobile')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'mobile'
                      ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-indigo-600 mb-1" />
                  <div>
                    <div className="text-xs font-bold text-gray-900">Mobile Wallet</div>
                    <div className="text-[10px] text-gray-500">bKash / Apple Pay</div>
                  </div>
                </button>
              </div>

              {/* Conditional Card inputs */}
              {paymentMethod === 'card' && (
                <div className="p-3 bg-gray-50 rounded-xl space-y-2 border border-gray-100">
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Card Number (4444 4444 4444 4444)"
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-200 bg-white"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full text-xs p-2.5 rounded-lg border border-gray-200 bg-white"
                    />
                    <input
                      type="text"
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="CVC"
                      className="w-full text-xs p-2.5 rounded-lg border border-gray-200 bg-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Button */}
            <button
              type="submit"
              className="w-full bg-[#0a192f] hover:bg-blue-600 text-white font-bold text-sm py-3.5 rounded-full transition-all cursor-pointer shadow-md active:scale-98"
            >
              Confirm & Place Order ({formatPrice(grandTotal)})
            </button>
          </form>
        ) : (
          /* ================= ORDER SUCCESS RECEIPT ================= */
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-gray-950">
                Order Confirmed!
              </h2>
              <p className="text-xs text-gray-600 mt-1">
                Thank you for shopping with <strong>Gadget Hub Mart</strong>. A confirmation SMS and email have been dispatched.
              </p>
            </div>

            {/* Tracking ID Box */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 max-w-sm mx-auto flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Your Tracking ID</span>
                <div className="text-base font-mono font-extrabold text-gray-900 tracking-wider">
                  {orderId}
                </div>
              </div>
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-blue-600 transition-colors"
                title="Copy tracking code"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="text-xs text-gray-500 max-w-md mx-auto space-y-1">
              <div>Estimated Delivery: <strong>2 - 4 Business Days</strong></div>
              <div>Payment Mode: <strong className="uppercase">{paymentMethod}</strong></div>
              <div>Delivery Address: <strong>{address}, {city}</strong></div>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="bg-[#0a192f] hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm px-8 py-3 rounded-full transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
