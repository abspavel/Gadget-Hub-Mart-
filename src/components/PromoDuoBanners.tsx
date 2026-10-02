import React from 'react';
import { ArrowRight } from 'lucide-react';
import { GadgetGraphic } from './GadgetGraphic';

interface PromoDuoBannersProps {
  onShopCharging: () => void;
  onShopAudio: () => void;
}

export const PromoDuoBanners: React.FC<PromoDuoBannersProps> = ({
  onShopCharging,
  onShopAudio,
}) => {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* ================= LEFT BANNER: CHARGING (DARK THEME) ================= */}
          <div className="relative overflow-hidden rounded-3xl bg-[#0f172a] text-white p-7 sm:p-9 flex flex-col justify-between min-h-[260px] sm:min-h-[290px] shadow-sm">
            {/* Background subtle radial spotlight */}
            <div className="absolute -right-10 -bottom-10 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-[260px] sm:max-w-[280px] space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Charge
                <br />
                Without Limits
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">
                Fast. Safe. Reliable.
              </p>
              <div className="pt-3">
                <button
                  onClick={onShopCharging}
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-950 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all cursor-pointer group shadow-sm"
                >
                  <span>Shop Charging</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Side Visual Graphic */}
            <div className="absolute -right-2 sm:right-4 bottom-2 sm:bottom-4 w-48 sm:w-60 h-40 sm:h-52 flex items-center justify-end pointer-events-none select-none">
              <div className="relative w-full h-full flex items-center justify-center">
                <GadgetGraphic type="gan_charger" className="w-32 h-32 absolute right-16 bottom-2 z-10" />
                <GadgetGraphic type="power_bank" className="w-36 h-36 absolute right-0 bottom-4 opacity-90" />
              </div>
            </div>
          </div>

          {/* ================= RIGHT BANNER: AUDIO (SKY BLUE THEME) ================= */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#e0f2fe] via-[#dbeafe] to-[#bfdbfe] text-gray-900 p-7 sm:p-9 flex flex-col justify-between min-h-[260px] sm:min-h-[290px] shadow-sm">
            {/* Handwritten cursive annotation in top right */}
            <div className="absolute top-4 right-6 z-10 text-right">
              <span className="font-hand text-xl sm:text-2xl text-blue-900 font-bold block transform -rotate-3">
                Feel
                <br />
                the Difference
              </span>
              <svg className="w-12 h-3 ml-auto text-blue-700/60" viewBox="0 0 50 10" fill="none">
                <path d="M5 5 Q 25 9, 45 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>

            <div className="relative z-10 max-w-[260px] sm:max-w-[280px] space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-950 leading-tight">
                Sound
                <br />
                That Moves You
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                Immerse in every moment.
              </p>
              <div className="pt-3">
                <button
                  onClick={onShopAudio}
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-950 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all cursor-pointer group shadow-sm border border-blue-200/50"
                >
                  <span>Shop Audio</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Side Visual Graphic (Earbuds in Open Pebble Case) */}
            <div className="absolute right-2 sm:right-6 bottom-2 sm:bottom-4 w-44 sm:w-56 h-36 sm:h-44 flex items-center justify-end pointer-events-none select-none">
              <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Pebble Case base */}
                <ellipse cx="100" cy="120" rx="75" ry="32" fill="#090d16" stroke="#1e293b" strokeWidth="2" />
                <ellipse cx="100" cy="116" rx="68" ry="24" fill="#020617" />
                
                {/* Left Bud in dock */}
                <g transform="translate(68, 70) rotate(-15)">
                  <ellipse cx="12" cy="15" rx="14" ry="12" fill="#1e293b" stroke="#3b82f6" strokeWidth="1" />
                  <rect x="8" y="24" width="8" height="24" rx="4" fill="#090d16" />
                </g>

                {/* Right Bud standing proud */}
                <g transform="translate(115, 60) rotate(15)">
                  <ellipse cx="12" cy="15" rx="14" ry="12" fill="#1e293b" stroke="#3b82f6" strokeWidth="1" />
                  <rect x="8" y="24" width="8" height="24" rx="4" fill="#090d16" />
                </g>

                {/* Battery charge LED on case */}
                <circle cx="100" cy="138" r="2.5" fill="#3b82f6" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
