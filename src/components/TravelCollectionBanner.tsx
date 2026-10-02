import React from 'react';
import { ArrowRight, Plane, ShieldCheck, Zap } from 'lucide-react';
import { GadgetGraphic } from './GadgetGraphic';

interface TravelCollectionBannerProps {
  onShopTravel: () => void;
}

export const TravelCollectionBanner: React.FC<TravelCollectionBannerProps> = ({
  onShopTravel,
}) => {
  return (
    <section id="travel" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
              Travel Collection
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Compact. Reliable. Ready for anywhere.
            </p>
          </div>
          <button
            onClick={onShopTravel}
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Cinematic Travel Card */}
        <div className="relative overflow-hidden rounded-3xl bg-[#0a192f] text-white p-8 sm:p-12 shadow-sm border border-slate-800/40 min-h-[300px] flex items-center">
          
          <div className="relative z-10 max-w-md space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold">
              <Plane className="w-3.5 h-3.5 text-blue-400" />
              <span>TSA Airline Approved</span>
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Travel Light
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                Stay Connected
              </span>
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Engineered for seamless world travel. High-capacity power, universal adapters, and splashproof tech carry essentials.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onShopTravel}
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all cursor-pointer group shadow-lg shadow-black/20"
              >
                <span>Shop Travel</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  2-Yr Intl Warranty
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Universal Plugs
                </span>
              </div>
            </div>
          </div>

          {/* Graphic: tech pouch, passport, power bank */}
          <div className="absolute right-0 bottom-0 top-0 w-3/5 sm:w-1/2 flex items-center justify-end pointer-events-none select-none opacity-85 sm:opacity-100">
            <GadgetGraphic type="travel_kit" className="w-full h-full max-h-[300px] object-contain" />
          </div>

          {/* Handwritten Note on Bottom Right */}
          <div className="absolute bottom-4 right-6 sm:right-10 z-10 text-right transform -rotate-3 select-none">
            <span className="font-hand text-lg sm:text-2xl text-slate-300 font-bold tracking-wide drop-shadow-sm">
              Made for
              <br />
              Every Journeys ~
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
