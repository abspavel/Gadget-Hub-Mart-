import React from 'react';
import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onNavigateView: (view: string) => void;
  onOpenTrackOrder: () => void;
  onOpenHelp: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onNavigateView,
  onOpenTrackOrder,
  onOpenHelp,
  onOpenAdmin,
}) => {
  return (
    <footer className="bg-[#0a192f] text-gray-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* ================= TOP 5-COLUMN GRID ================= */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Brand Info (Spans 4 cols on lg) */}
          <div className="col-span-2 md:col-span-3 lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <Logo className="w-12 h-12 sm:w-14 sm:h-14" />
              <div>
                <h4 className="text-xl font-extrabold text-white tracking-tight leading-none">
                  Gadget Hub Mart
                </h4>
                <p className="text-xs text-gray-400 mt-1 font-medium">
                  Accessories for a Smarter You
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              বাংলাদেশে প্রিমিয়াম টেক গ্যাজেট ও অ্যাক্সেসরিজের বিশ্বস্ত গন্তব্য। আসল পণ্য, দ্রুত ডেলিভারি ও অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি।
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3 pt-2 text-gray-400">
              <a href="#instagram" aria-label="Instagram" className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" aria-label="Facebook" className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#youtube" aria-label="YouTube" className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#twitter" aria-label="X Twitter" className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Shop Links */}
          <div className="col-span-1 lg:col-span-2 space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              Shop
            </h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => onNavigateView('all-products')} className="hover:text-white transition-colors cursor-pointer text-left">
                  All Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateView('best-sellers')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Best Sellers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateView('new-arrivals')} className="hover:text-white transition-colors cursor-pointer text-left">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateView('bundles')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Bundles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateView('gift-cards')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Gift Cards
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Support Links */}
          <div className="col-span-1 lg:col-span-2 space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              Support
            </h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => onNavigateView('profile')} className="hover:text-blue-400 font-bold transition-colors cursor-pointer text-left text-slate-200">
                  My Profile & Orders
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateView('track-order')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Track Order
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateView('help-center')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Help Center
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateView('shipping-returns')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Shipping & Returns
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateView('warranty-policy')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Warranty Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateView('contact-us')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Company Links */}
          <div className="col-span-1 lg:col-span-2 space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              Company
            </h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => onNavigateView('about-us')} className="hover:text-white transition-colors cursor-pointer text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateView('careers')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Careers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateView('press')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Press
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateView('affiliates')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Affiliates
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateView('admin')} className="text-blue-400 hover:text-blue-300 transition-colors font-bold cursor-pointer text-left">
                  Admin Panel
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal Links */}
          <div className="col-span-1 lg:col-span-2 space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              Legal
            </h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => onNavigateView('privacy-policy')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateView('terms-of-service')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateView('security')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Security
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* ================= BOTTOM COPYRIGHT & CREDITS BAR ================= */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 Gadget Hub Mart. All rights reserved.</p>

          {/* Designed & Developed Credits */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 text-center flex-wrap justify-center">
            <span>Designed & Developed by</span>
            <a
              href="https://www.webtrixit.site"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-400 hover:text-blue-300 hover:underline transition-colors"
              title="Visit Webtrix IT Solution"
            >
              Webtrix IT Solution
            </a>
            <span className="text-slate-600">•</span>
            <a
              href="https://www.paveljoy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-400 hover:text-emerald-300 hover:underline transition-colors"
              title="Visit Pavel Ahmed Joy Portfolio"
            >
              Pavel Ahmed Joy
            </a>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => onNavigateView('privacy-policy')} className="hover:text-white transition-colors cursor-pointer">Privacy</button>
            <button onClick={() => onNavigateView('terms-of-service')} className="hover:text-white transition-colors cursor-pointer">Terms</button>
            <button onClick={() => onNavigateView('security')} className="hover:text-white transition-colors cursor-pointer">Security</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
