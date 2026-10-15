import React from 'react';
import { Instagram, Facebook, Youtube, Twitter, Code2, ExternalLink } from 'lucide-react';
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
    <footer className="bg-[#0a192f] text-gray-300 pt-12 sm:pt-16 pb-12 border-t border-slate-800">
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
              বাংলাদেশে প্রিমিয়াম টেক গ্যাজেট ও অ্যাক্সেসরিজের বিশ্বস্ত গন্তব্য। ১০০% আসল ও অফিসিয়াল পণ্য এবং দ্রুত ডেলিভারি।
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
                  Shipping Policy
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
                <button onClick={() => onOpenAdmin ? onOpenAdmin() : onNavigateView('admin')} className="text-blue-400 hover:text-blue-300 transition-colors font-bold cursor-pointer text-left">
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
        <div className="pt-8 border-t border-slate-800/80 flex flex-col lg:flex-row items-center justify-between gap-5 text-xs text-slate-400">
          {/* Copyright */}
          <p className="order-2 lg:order-1 text-center lg:text-left font-medium">
            © 2026 <span className="text-slate-200 font-semibold">Gadget Hub Mart</span>. All rights reserved.
          </p>

          {/* Designed & Developed Credits Badge */}
          <div className="order-1 lg:order-2 inline-flex items-center flex-wrap justify-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-700/60 shadow-[0_2px_14px_rgba(0,0,0,0.35)] backdrop-blur-xs text-xs">
            <span className="inline-flex items-center gap-1.5 text-slate-400">
              <Code2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Designed & Developed by</span>
            </span>
            <a
              href="https://www.webtrixit.site"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 hover:opacity-80 transition-opacity"
              title="Webtrix IT Solution - Professional IT & Web Development Agency"
            >
              <span>Webtrix IT Solution</span>
              <ExternalLink className="w-2.5 h-2.5 text-blue-400/80 shrink-0" />
            </a>

            <span className="text-slate-600 hidden sm:inline">•</span>

            <span className="text-slate-400">Architected by</span>
            <a
              href="https://www.paveljoy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:opacity-80 transition-opacity"
              title="Pavel Ahmed Joy Portfolio - Lead Architect"
            >
              <span>Pavel Ahmed Joy</span>
              <ExternalLink className="w-2.5 h-2.5 text-emerald-400/80 shrink-0" />
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-5 text-slate-400 order-3 font-medium">
            <button onClick={() => onNavigateView('privacy-policy')} className="hover:text-white transition-colors cursor-pointer">Privacy</button>
            <span className="text-slate-700">•</span>
            <button onClick={() => onNavigateView('terms-of-service')} className="hover:text-white transition-colors cursor-pointer">Terms</button>
            <span className="text-slate-700">•</span>
            <button onClick={() => onNavigateView('security')} className="hover:text-white transition-colors cursor-pointer">Security</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
