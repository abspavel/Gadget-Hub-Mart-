import React from 'react';
import { X, HelpCircle, Phone, Mail, RotateCcw, ShieldCheck, Truck } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 my-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-gray-950">
              Help & Support Center
            </h2>
            <p className="text-xs text-gray-500">
              Everything you need to know about shopping with Gadget Hub Mart.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-6 space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>How does Free Shipping work?</span>
            </div>
            <p className="text-gray-600 leading-relaxed pl-6">
              All orders totaling $50 or more automatically qualify for complimentary standard courier delivery. Standard delivery takes 2–4 business days.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <RotateCcw className="w-4 h-4 text-emerald-600" />
              <span>What is the 30-Day Easy Return Policy?</span>
            </div>
            <p className="text-gray-600 leading-relaxed pl-6">
              If an accessory doesn't fit your workflow or device, simply initiate a return within 30 days of delivery for a full refund or exchange.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Device Warranty Coverage</span>
            </div>
            <p className="text-gray-600 leading-relaxed pl-6">
              All chargers, cables, audio, and hubs come with a minimum 2-year manufacturer warranty against electrical defects and build quality.
            </p>
          </div>
        </div>

        {/* Direct Contacts */}
        <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="w-4 h-4 text-gray-500" />
            <span>support@gadgethubmart.com</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="w-4 h-4 text-gray-500" />
            <span>+1 (800) 423-4327 (24/7 Support)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
