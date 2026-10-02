import React, { useState } from 'react';
import { 
  User, ShoppingBag, Menu, X, ChevronRight, Home,
  Sparkles, Flame, PackageCheck, Truck, HelpCircle, RotateCcw, 
  ShieldCheck, Phone, Tag, Info
} from 'lucide-react';
import { Product, Currency, CategoryItem } from '../types';
import { Logo } from './Logo';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onSelectProduct: (product: Product) => void;
  onNavigateSection: (sectionId: string) => void;
  onNavigateView?: (view: string) => void;
  products: Product[];
  currentCurrency?: Currency;
  onSelectCurrency?: (code: 'USD' | 'EUR' | 'GBP' | 'BDT') => void;
  onOpenTrackOrder?: () => void;
  onOpenHelp?: () => void;
  onOpenCategory: (cat: string) => void;
  categories?: CategoryItem[];
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenAuth,
  onNavigateSection,
  onNavigateView,
  onOpenTrackOrder,
  onOpenHelp,
  onOpenCategory,
  categories = [],
}) => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const handleNav = (action: () => void) => {
    setSideMenuOpen(false);
    action();
  };

  return (
    <>
      {/* Slim, elegant, beautiful floating pill Navbar */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md px-3 sm:px-6 pt-1.5 pb-1 transition-all border-b border-gray-100 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 bg-[#0a192f] rounded-full px-4 sm:px-6 py-1.5 shadow-md border border-slate-700/60">
          
          {/* ================= ZONE 1: BRAND LOGO ================= */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateSection('hero')}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
              aria-label="Gadget Hub Mart Home"
            >
              <Logo className="w-7 h-7 sm:w-8 sm:h-8" />
              <div className="flex flex-col">
                <span className="font-extrabold text-xs sm:text-sm tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  Gadget Hub Mart
                </span>
                <span className="text-[9px] text-slate-400 tracking-wide -mt-0.5 hidden xs:inline">
                  Tech Essentials
                </span>
              </div>
            </button>
          </div>

          {/* ================= ZONE 2: DESKTOP NAV LINKS (CHIKON SHUNDOR) ================= */}
          <nav className="hidden lg:flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-300">
            <button
              onClick={() => onNavigateSection('hero')}
              className="px-3 py-1 rounded-full hover:text-white hover:bg-white/10 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5 text-blue-400" />
              <span>Home</span>
            </button>
            {categories.filter(c => c.id !== 'All').slice(0, 5).map((cat, idx) => (
              <button
                key={`${cat.id}-${idx}`}
                onClick={() => onOpenCategory(cat.label || cat.id)}
                className="px-3 py-1 rounded-full hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                {cat.label || cat.id}
              </button>
            ))}
            {onNavigateView && (
              <button
                onClick={() => onNavigateView('all-products')}
                className="px-3 py-1 rounded-full text-blue-400 hover:text-white hover:bg-blue-600/30 transition-all cursor-pointer font-bold"
              >
                All Products
              </button>
            )}
          </nav>

          {/* ================= ZONE 3: ACTIONS & SLIM MENU BUTTON ================= */}
          <div className="flex items-center gap-2">
            
            {/* User Account */}
            <button
              onClick={onOpenAuth}
              aria-label="User Account"
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700"
              title="User Account"
            >
              <User className="w-3.5 h-3.5" />
            </button>

            {/* Shopping Cart with Badge */}
            <button
              onClick={onOpenCart}
              aria-label="Shopping Cart"
              className="relative w-8 h-8 rounded-full flex items-center justify-center bg-blue-600 text-white hover:bg-blue-500 transition-all cursor-pointer shadow-sm active:scale-95"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 font-black text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-[#0a192f]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Slim Menu Icon Button (Opens Side Popup Drawer) */}
            <button
              onClick={() => setSideMenuOpen(true)}
              aria-label="Toggle Menu"
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700"
              title="Menu"
            >
              <Menu className="w-4 h-4 text-blue-400" />
            </button>

          </div>

        </div>
      </header>

      {/* ================= COMPACT SIDE POPUP / DRAWER (ALL IN ENGLISH) ================= */}
      {/* Serial by serial, top-to-bottom, each item in a single row */}
      {sideMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Overlay */}
          <div 
            className="absolute inset-0 bg-black/55 backdrop-blur-2xs transition-opacity duration-200"
            onClick={() => setSideMenuOpen(false)}
          />

          {/* Slim Slide-in Popup Drawer on Side */}
          <div className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-200 border-l border-gray-100">
            
            {/* Popup Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-slate-50/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <Menu className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-gray-950">Navigation Menu</h3>
                  <span className="text-[10px] text-gray-500">Gadget Hub Mart</span>
                </div>
              </div>
              <button
                onClick={() => setSideMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Popup Body: Serial by serial, top-to-bottom, strictly in single rows */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-1 text-xs">
              
              {/* 1. Home */}
              <button
                onClick={() => handleNav(() => onNavigateSection('hero'))}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-blue-50/80 text-gray-800 hover:text-blue-600 font-bold transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <Home className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Home</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              </button>

              {/* 2. All Products */}
              {onNavigateView && (
                <button
                  onClick={() => handleNav(() => onNavigateView('all-products'))}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-blue-50/80 text-gray-800 hover:text-blue-600 font-bold transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>All Products</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                </button>
              )}

              {/* 3. Best Sellers */}
              {onNavigateView && (
                <button
                  onClick={() => handleNav(() => onNavigateView('best-sellers'))}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-blue-50/80 text-gray-800 hover:text-blue-600 font-bold transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <Flame className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Best Sellers</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                </button>
              )}

              {/* 4. New Arrivals */}
              {onNavigateView && (
                <button
                  onClick={() => handleNav(() => onNavigateView('new-arrivals'))}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-blue-50/80 text-gray-800 hover:text-blue-600 font-bold transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>New Arrivals</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                </button>
              )}

              {/* 5. Bundles & Deals */}
              {onNavigateView && (
                <button
                  onClick={() => handleNav(() => onNavigateView('bundles'))}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-blue-50/80 text-gray-800 hover:text-blue-600 font-bold transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <PackageCheck className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Bundles & Deals</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                </button>
              )}

              {/* Section Divider: Categories */}
              <div className="pt-3 pb-1 border-t border-gray-100">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider px-3.5 block">
                  Categories
                </span>
              </div>

              {/* Dynamic Categories List */}
              {categories.filter(c => c.id !== 'All').map((cat, idx) => (
                <button
                  key={`${cat.id}-${idx}`}
                  onClick={() => handleNav(() => onOpenCategory(cat.label || cat.id))}
                  className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl hover:bg-gray-100 text-gray-700 hover:text-gray-950 font-medium transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3 truncate">
                    <Tag className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span className="truncate">{cat.label || cat.id}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                </button>
              ))}

              {/* Section Divider: Customer Support */}
              <div className="pt-3 pb-1 border-t border-gray-100">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider px-3.5 block">
                  Customer Support
                </span>
              </div>

              {/* Track Order */}
              {onOpenTrackOrder && (
                <button
                  onClick={() => handleNav(onOpenTrackOrder)}
                  className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl hover:bg-gray-100 text-gray-700 hover:text-gray-950 font-medium transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>Track Order</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                </button>
              )}

              {/* Help Center */}
              {onOpenHelp && (
                <button
                  onClick={() => handleNav(onOpenHelp)}
                  className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl hover:bg-gray-100 text-gray-700 hover:text-gray-950 font-medium transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Help Center</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                </button>
              )}

              {/* Shipping & Returns */}
              {onNavigateView && (
                <button
                  onClick={() => handleNav(() => onNavigateView('shipping-returns'))}
                  className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl hover:bg-gray-100 text-gray-700 hover:text-gray-950 font-medium transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <RotateCcw className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Shipping & Returns</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                </button>
              )}

              {/* Warranty Policy */}
              {onNavigateView && (
                <button
                  onClick={() => handleNav(() => onNavigateView('warranty-policy'))}
                  className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl hover:bg-gray-100 text-gray-700 hover:text-gray-950 font-medium transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span>Warranty Policy</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                </button>
              )}

              {/* Contact Us */}
              {onNavigateView && (
                <button
                  onClick={() => handleNav(() => onNavigateView('contact-us'))}
                  className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl hover:bg-gray-100 text-gray-700 hover:text-gray-950 font-medium transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                    <span>Contact Us</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                </button>
              )}

              {/* About Us */}
              {onNavigateView && (
                <button
                  onClick={() => handleNav(() => onNavigateView('about-us'))}
                  className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl hover:bg-gray-100 text-gray-700 hover:text-gray-950 font-medium transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>About Us</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                </button>
              )}

            </div>

            {/* Bottom Footer Info */}
            <div className="p-3 border-t border-gray-100 bg-gray-50/80 text-[10px] text-gray-400 text-center font-medium">
              Gadget Hub Mart • Official Accessories
            </div>

          </div>
        </div>
      )}
    </>
  );
};
