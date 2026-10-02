import React from 'react';

export const HeroDeskComposite: React.FC = () => {
  return (
    <div className="relative w-full max-w-[620px] aspect-[16/11] mx-auto select-none">
      {/* Handwritten sticky text on top right */}
      <div className="absolute top-2 right-4 md:right-8 z-20 text-right transform rotate-[-3deg]">
        <div className="font-hand text-xl md:text-2xl text-slate-700 tracking-wide font-bold">
          Accessories
          <br />
          <span className="text-slate-900">Make It Yours</span>
        </div>
        {/* Curving decorative pencil arrow/underline */}
        <svg className="w-16 h-6 ml-auto text-slate-500" viewBox="0 0 60 20" fill="none">
          <path d="M5 12 C 20 2, 40 18, 55 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* SVG Canvas for realistic Desk arrangement */}
      <svg viewBox="0 0 700 480" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="deskShadow" x1="350" y1="200" x2="350" y2="460" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0f172a" stopOpacity="0.14" />
            <stop offset="1" stopColor="#0f172a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="macbookBody" x1="100" y1="120" x2="400" y2="300" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f1f5f9" />
            <stop offset="0.5" stopColor="#e2e8f0" />
            <stop offset="1" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id="screenGlass" x1="180" y1="80" x2="380" y2="240" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1e293b" />
            <stop offset="1" stopColor="#090d16" />
          </linearGradient>
          <radialGradient id="greenChargeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="1" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft ground shadows for whole layout */}
        <ellipse cx="320" cy="380" rx="300" ry="60" fill="url(#deskShadow)" />

        {/* ================= LAPTOP (LEFT / CENTER BACKGROUND) ================= */}
        <g transform="translate(40, 60)">
          {/* Laptop Base / Keyboard deck */}
          <path d="M120 240 L340 240 L370 290 L90 290 Z" fill="url(#macbookBody)" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Trackpad */}
          <rect x="200" y="260" width="70" height="24" rx="3" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.8" />
          {/* Keyboard Keys Area */}
          <path d="M132 245 L328 245 L346 270 L114 270 Z" fill="#1e293b" />
          
          {/* Laptop Screen / Display Lid */}
          <path d="M140 70 L340 70 L340 240 L140 240 Z" fill="#020617" stroke="#94a3b8" strokeWidth="2" rx="6" />
          {/* Display panel glass */}
          <rect x="146" y="76" width="188" height="154" rx="3" fill="url(#screenGlass)" />
          {/* Minimalist Wallpaper glow */}
          <circle cx="240" cy="150" r="45" fill="#3b82f6" fillOpacity="0.15" />
          <path d="M170 190 C220 140, 270 210, 310 160" stroke="#60a5fa" strokeWidth="2" strokeOpacity="0.4" fill="none" />
          {/* Camera notch */}
          <circle cx="240" cy="73" r="1.5" fill="#475569" />
        </g>

        {/* ================= SUCCULENT PLANT IN WHITE CERAMIC POT (TOP RIGHT) ================= */}
        <g transform="translate(510, 95)">
          {/* Shadow */}
          <ellipse cx="40" cy="120" rx="32" ry="8" fill="#0f172a" fillOpacity="0.15" />
          {/* White ceramic pot */}
          <path d="M15 70 L65 70 L58 115 L22 115 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
          <ellipse cx="40" cy="70" rx="25" ry="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
          <ellipse cx="40" cy="72" rx="21" ry="4" fill="#78350f" opacity="0.6" />
          
          {/* Succulent Leaves */}
          <path d="M40 72 C25 50 20 30 35 15 C45 35 45 55 40 72 Z" fill="#15803d" />
          <path d="M40 72 C55 50 60 30 45 15 C35 35 35 55 40 72 Z" fill="#16a34a" />
          <path d="M40 72 C15 65 5 45 25 35 C35 48 38 60 40 72 Z" fill="#22c55e" />
          <path d="M40 72 C65 65 75 45 55 35 C45 48 42 60 40 72 Z" fill="#166534" />
          <circle cx="40" cy="55" r="5" fill="#86efac" />
        </g>

        {/* ================= 3-IN-1 WIRELESS CHARGER STAND & IPHONE (CENTER RIGHT) ================= */}
        <g transform="translate(410, 110)">
          {/* Stand Base */}
          <ellipse cx="75" cy="275" rx="55" ry="14" fill="#0f172a" fillOpacity="0.2" />
          <rect x="25" y="245" width="100" height="26" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
          <ellipse cx="75" cy="245" rx="50" ry="10" fill="#1e293b" />
          
          {/* Stand Vertical Stem */}
          <path d="M75 245 L75 140" stroke="#334155" strokeWidth="10" strokeLinecap="round" />

          {/* MagSafe Phone on angled mount */}
          <g transform="translate(20, 20) rotate(-6)">
            {/* Phone Shadow */}
            <rect x="18" y="18" width="80" height="155" rx="16" fill="#000000" fillOpacity="0.2" />
            {/* Phone Chassis */}
            <rect x="15" y="15" width="80" height="155" rx="16" fill="#020617" stroke="#3b82f6" strokeWidth="1.5" />
            {/* Front Screen */}
            <rect x="18" y="18" width="74" height="149" rx="13" fill="#090d16" />
            {/* Dynamic Island */}
            <rect x="42" y="23" width="26" height="7" rx="3.5" fill="#000000" />
            
            {/* Charging Screen UI */}
            <circle cx="55" cy="85" r="26" fill="url(#greenChargeGlow)" />
            {/* Green Charging Ring */}
            <circle cx="55" cy="85" r="22" stroke="#10b981" strokeWidth="3" fill="none" />
            {/* Lightning icon inside circle */}
            <path d="M57 74 L49 86 L55 86 L53 96 L61 84 L55 84 Z" fill="#10b981" />
            <text x="35" y="118" fill="#ffffff" fontSize="7" fontWeight="600" letterSpacing="0.02em">100% Charged</text>
          </g>
        </g>

        {/* ================= AIRPODS CASE (FOREGROUND DESK) ================= */}
        <g transform="translate(340, 260)">
          {/* Case Shadow */}
          <ellipse cx="40" cy="52" rx="30" ry="8" fill="#0f172a" fillOpacity="0.15" />
          {/* White glossy AirPods case */}
          <rect x="15" y="15" width="50" height="38" rx="14" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
          {/* Lid seam */}
          <path d="M15 28 L65 28" stroke="#cbd5e1" strokeWidth="1" />
          {/* Green charge LED */}
          <circle cx="40" cy="34" r="1.5" fill="#10b981" />
        </g>

        {/* ================= APPLE WATCH (RIGHT FOREGROUND) ================= */}
        <g transform="translate(545, 270)">
          {/* Shadow */}
          <ellipse cx="35" cy="50" rx="30" ry="8" fill="#0f172a" fillOpacity="0.15" />
          {/* Watch Band Loop */}
          <ellipse cx="35" cy="40" rx="26" ry="18" fill="none" stroke="#1e293b" strokeWidth="12" />
          {/* Watch Case */}
          <rect x="22" y="16" width="30" height="36" rx="8" fill="#090d16" stroke="#475569" strokeWidth="1.5" />
          {/* Watch Display */}
          <rect x="24" y="18" width="26" height="32" rx="6" fill="#020617" />
          <text x="28" y="34" fill="#ffffff" fontSize="8" fontWeight="700">10:42</text>
          <circle cx="37" cy="42" r="4" stroke="#10b981" strokeWidth="1.5" fill="none" />
        </g>

        {/* ================= COILED BLACK BRAIDED CABLE (FOREGROUND BOTTOM) ================= */}
        <g transform="translate(360, 360)">
          <ellipse cx="40" cy="15" rx="38" ry="12" fill="#0f172a" fillOpacity="0.1" />
          {/* Looped cable */}
          <path d="M0 25 C 20 0, 70 5, 80 25 C 85 35, 45 40, 20 30 C 5 22, 10 12, 40 10 C 65 8, 85 20, 80 32" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    </div>
  );
};
