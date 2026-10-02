import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  type: 'main' | 'offer';
}

interface HeroSectionProps {
  onShopNow: () => void;
  banners: Banner[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopNow, banners }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const mainBanners = banners.filter(b => b.type === 'main');
  const offerBanners = banners.filter(b => b.type === 'offer');

  // Fallback if banners array is empty or lacks specific types
  const activeMainBanner = mainBanners.length > 0 
    ? mainBanners[mainBanners.length - 1].imageUrl 
    : (banners.length > 0 ? banners[0].imageUrl : 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1800&q=80');

  const slides = offerBanners.length > 0 
    ? offerBanners 
    : (banners.length > 1 ? banners.slice(1) : [
        { id: '1', title: 'Offer 1', imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1600&q=80', type: 'offer' },
        { id: '2', title: 'Offer 2', imageUrl: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1600&q=80', type: 'offer' },
        { id: '3', title: 'Offer 3', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80', type: 'offer' }
      ]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="hero" className="relative w-full bg-white overflow-hidden border-b border-gray-100 px-3 sm:px-5 pt-1.5 pb-3 sm:pt-2 sm:pb-4 space-y-3">
      {/* 1. Main Upper Banner */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[16/7] lg:aspect-[24/7] max-h-[320px] min-h-[160px] rounded-2xl overflow-hidden shadow-sm border border-gray-200/80">
        <img
          src={activeMainBanner}
          alt="Gadget Hub Mart Banner"
          className="w-full h-full object-cover object-center filter brightness-95"
        />
      </div>

      {/* 2. Lower Offer Auto-Sliding Banner */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[16/7] lg:aspect-[24/7] max-h-[320px] min-h-[160px] rounded-2xl overflow-hidden shadow-sm border border-gray-200/80 bg-slate-100">
        {slides.map((slide, idx) => (
          <div
            key={slide.id || idx}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-end p-4 sm:p-6 ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="relative z-10">
              <button
                onClick={onShopNow}
                className="group inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}

        {/* Slide indicators dots */}
        <div className="absolute bottom-3 right-4 z-20 flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentSlide ? 'bg-blue-400 w-5' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
