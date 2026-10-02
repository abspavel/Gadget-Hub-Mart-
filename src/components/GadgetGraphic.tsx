import React from 'react';

interface GadgetGraphicProps {
  type: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const GadgetGraphic: React.FC<GadgetGraphicProps> = ({ 
  type, 
  className = "w-full h-full",
}) => {
  switch (type) {
    case 'gan_charger':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="chargerBody" x1="40" y1="40" x2="150" y2="160" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="0.7" stopColor="#f1f5f9" />
              <stop offset="1" stopColor="#e2e8f0" />
            </linearGradient>
            <linearGradient id="chargerShadow" x1="100" y1="160" x2="100" y2="190" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0f172a" stopOpacity="0.12" />
              <stop offset="1" stopColor="#0f172a" stopOpacity="0" />
            </linearGradient>
            <filter id="plugGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0f172a" floodOpacity="0.08" />
            </filter>
          </defs>
          {/* Ground shadow */}
          <ellipse cx="102" cy="168" rx="55" ry="12" fill="url(#chargerShadow)" />
          
          {/* Wall Prongs (US style rear) */}
          <rect x="52" y="58" width="10" height="28" rx="2" fill="#94a3b8" />
          <rect x="68" y="52" width="10" height="28" rx="2" fill="#cbd5e1" />
          
          {/* Charger Cube (Isometric angle) */}
          <g filter="url(#plugGlow)">
            {/* Main Front-Side Block */}
            <path d="M72 65 L138 52 C144 51 149 55 149 61 L149 135 C149 141 144 146 138 147 L72 160 C66 161 60 157 60 151 L60 77 C60 70 65 66 72 65 Z" fill="url(#chargerBody)" stroke="#e2e8f0" strokeWidth="1.5" />
            {/* Top Plane */}
            <path d="M72 65 L138 52 L120 38 L54 50 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          </g>

          {/* Front Face Features */}
          <text x="74" y="84" fill="#94a3b8" fontSize="9" fontWeight="700" letterSpacing="0.05em">65W GaN</text>
          
          {/* Port 1 (USB-C 1) */}
          <rect x="74" y="94" width="30" height="10" rx="4" fill="#0f172a" />
          <rect x="80" y="97.5" width="18" height="3" rx="1.5" fill="#3b82f6" />
          
          {/* Port 2 (USB-C 2) */}
          <rect x="74" y="112" width="30" height="10" rx="4" fill="#0f172a" />
          <rect x="80" y="115.5" width="18" height="3" rx="1.5" fill="#3b82f6" />
          
          {/* Port 3 (USB-A QC) */}
          <rect x="74" y="130" width="30" height="11" rx="2" fill="#0f172a" />
          <rect x="78" y="133" width="22" height="5" fill="#2563eb" />
          
          {/* Subtle LED Status light */}
          <circle cx="120" cy="78" r="2.5" fill="#10b981" />
        </svg>
      );

    case 'magsafe_charger':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="puckBase" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="70%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </radialGradient>
            <linearGradient id="cableGrad" x1="100" y1="130" x2="100" y2="190" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e2e8f0" />
              <stop offset="1" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          {/* Ground shadow */}
          <ellipse cx="100" cy="148" rx="60" ry="16" fill="#0f172a" fillOpacity="0.09" />
          
          {/* Cable coming out */}
          <path d="M100 135 C100 155 118 165 118 185" stroke="url(#cableGrad)" strokeWidth="6" strokeLinecap="round" />
          <rect x="96" y="132" width="8" height="12" rx="3" fill="#cbd5e1" />
          
          {/* Outer Aluminum Bezel Ring */}
          <circle cx="100" cy="95" r="48" fill="url(#puckBase)" stroke="#94a3b8" strokeWidth="2" />
          {/* Inner Matte White Pad */}
          <circle cx="100" cy="95" r="42" fill="#ffffff" />
          {/* Magnetic Alignment Ring */}
          <circle cx="100" cy="95" r="28" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.6" />
          {/* Center Apple/MagSafe Target */}
          <circle cx="100" cy="95" r="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Subtle reflection shine */}
          <path d="M72 80 C80 68 95 62 112 65" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        </svg>
      );

    case 'headphones':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="headbandGrad" x1="50" y1="40" x2="150" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1e293b" />
              <stop offset="0.5" stopColor="#334155" />
              <stop offset="1" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="earcupGrad" x1="40" y1="100" x2="70" y2="150" gradientUnits="userSpaceOnUse">
              <stop stopColor="#334155" />
              <stop offset="1" stopColor="#090d16" />
            </linearGradient>
          </defs>
          {/* Ground shadow */}
          <ellipse cx="100" cy="172" rx="55" ry="10" fill="#0f172a" fillOpacity="0.12" />
          
          {/* Headband Arc */}
          <path d="M56 112 C54 62 72 42 100 42 C128 42 146 62 144 112" stroke="url(#headbandGrad)" strokeWidth="14" strokeLinecap="round" />
          {/* Headband inner cushion */}
          <path d="M68 95 C66 68 80 54 100 54 C120 54 134 68 132 95" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
          
          {/* Left Yoke & Ear Cup */}
          <path d="M54 105 L54 125" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="52" cy="128" rx="16" ry="24" fill="url(#earcupGrad)" stroke="#1e293b" strokeWidth="1.5" />
          <ellipse cx="50" cy="128" rx="8" ry="16" fill="#020617" />
          
          {/* Right Yoke & Ear Cup */}
          <path d="M146 105 L146 125" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="148" cy="128" rx="16" ry="24" fill="url(#earcupGrad)" stroke="#1e293b" strokeWidth="1.5" />
          <ellipse cx="150" cy="128" rx="8" ry="16" fill="#020617" />

          {/* Accent Rim Ring */}
          <circle cx="52" cy="128" r="6" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.6" />
          <circle cx="148" cy="128" r="6" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.6" />
        </svg>
      );

    case 'phone_case':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="caseMatte" x1="60" y1="40" x2="140" y2="160" gradientUnits="userSpaceOnUse">
              <stop stopColor="#334155" />
              <stop offset="0.6" stopColor="#1e293b" />
              <stop offset="1" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          {/* Ground shadow */}
          <ellipse cx="102" cy="172" rx="44" ry="10" fill="#0f172a" fillOpacity="0.12" />

          {/* Phone Case Silhouette */}
          <rect x="68" y="42" width="64" height="120" rx="16" fill="url(#caseMatte)" stroke="#475569" strokeWidth="2" />
          
          {/* Camera Bump Plate */}
          <rect x="74" y="48" width="30" height="32" rx="8" fill="#090d16" stroke="#334155" strokeWidth="1.5" />
          
          {/* Triple Lenses */}
          <circle cx="82" cy="56" r="4.5" fill="#020617" stroke="#3b82f6" strokeWidth="1" />
          <circle cx="82" cy="72" r="4.5" fill="#020617" stroke="#3b82f6" strokeWidth="1" />
          <circle cx="96" cy="64" r="4.5" fill="#020617" stroke="#3b82f6" strokeWidth="1" />
          
          {/* Flash & LiDAR */}
          <circle cx="96" cy="52" r="2" fill="#fef08a" />
          <circle cx="96" cy="75" r="1.5" fill="#1e293b" />

          {/* Minimalist Logo Mark */}
          <circle cx="100" cy="115" r="4" fill="#334155" />
          
          {/* Side tactile buttons */}
          <rect x="66" y="68" width="2" height="12" rx="1" fill="#64748b" />
          <rect x="66" y="84" width="2" height="12" rx="1" fill="#64748b" />
          <rect x="132" y="74" width="2" height="18" rx="1" fill="#64748b" />
        </svg>
      );

    case 'usb_hub':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hubAluminum" x1="50" y1="70" x2="160" y2="150" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e2e8f0" />
              <stop offset="0.4" stopColor="#cbd5e1" />
              <stop offset="1" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          {/* Ground shadow */}
          <ellipse cx="115" cy="155" rx="55" ry="12" fill="#0f172a" fillOpacity="0.12" />

          {/* Integrated USB-C Cable */}
          <path d="M50 110 C50 85 70 80 85 92" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
          {/* USB-C Connector head */}
          <rect x="36" y="104" width="14" height="10" rx="3" fill="#1e293b" />
          <rect x="30" y="106" width="6" height="6" rx="2" fill="#94a3b8" />

          {/* Main Hub Body (Angled bar) */}
          <g transform="rotate(-15 115 115)">
            <rect x="75" y="100" width="90" height="28" rx="8" fill="url(#hubAluminum)" stroke="#64748b" strokeWidth="1.5" />
            
            {/* Ports on side */}
            <rect x="85" y="110" width="14" height="8" rx="2" fill="#090d16" />
            <rect x="87" y="112" width="10" height="4" fill="#2563eb" />

            <rect x="105" y="110" width="14" height="8" rx="2" fill="#090d16" />
            <rect x="107" y="112" width="10" height="4" fill="#2563eb" />

            <rect x="125" y="110" width="14" height="8" rx="2" fill="#090d16" />
            <rect x="127" y="112" width="10" height="4" fill="#2563eb" />

            <rect x="145" y="112" width="14" height="4" rx="1" fill="#090d16" />
            {/* LED */}
            <circle cx="80" cy="114" r="2" fill="#10b981" />
          </g>
        </svg>
      );

    case 'litebuds_pro':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="budGrad" x1="80" y1="50" x2="130" y2="150" gradientUnits="userSpaceOnUse">
              <stop stopColor="#334155" />
              <stop offset="1" stopColor="#090d16" />
            </linearGradient>
          </defs>
          <ellipse cx="75" cy="160" rx="25" ry="7" fill="#0f172a" fillOpacity="0.12" />
          <ellipse cx="125" cy="160" rx="25" ry="7" fill="#0f172a" fillOpacity="0.12" />

          {/* Left Bud */}
          <g transform="rotate(-10 75 105)">
            <ellipse cx="70" cy="85" rx="14" ry="12" fill="url(#budGrad)" stroke="#1e293b" strokeWidth="1" />
            <path d="M70 94 L68 140" stroke="url(#budGrad)" strokeWidth="8" strokeLinecap="round" />
            <ellipse cx="62" cy="82" rx="6" ry="8" fill="#1e293b" />
            <circle cx="68" cy="138" r="2" fill="#3b82f6" />
          </g>

          {/* Right Bud */}
          <g transform="rotate(10 125 105)">
            <ellipse cx="130" cy="85" rx="14" ry="12" fill="url(#budGrad)" stroke="#1e293b" strokeWidth="1" />
            <path d="M130 94 L132 140" stroke="url(#budGrad)" strokeWidth="8" strokeLinecap="round" />
            <ellipse cx="138" cy="82" rx="6" ry="8" fill="#1e293b" />
            <circle cx="132" cy="138" r="2" fill="#3b82f6" />
          </g>
        </svg>
      );

    case 'usb_cable':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ground shadow */}
          <ellipse cx="100" cy="155" rx="55" ry="14" fill="#0f172a" fillOpacity="0.1" />

          {/* Braided Loop 1 */}
          <circle cx="95" cy="105" r="42" stroke="#1e293b" strokeWidth="9" strokeDasharray="3 2" />
          <circle cx="102" cy="108" r="34" stroke="#334155" strokeWidth="7" strokeDasharray="3 2" />

          {/* Connector End 1 */}
          <g transform="translate(60, 50) rotate(-30)">
            <rect x="0" y="0" width="12" height="24" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1" />
            <rect x="2" y="-8" width="8" height="8" rx="2" fill="#cbd5e1" />
          </g>

          {/* Connector End 2 */}
          <g transform="translate(135, 60) rotate(25)">
            <rect x="0" y="0" width="12" height="24" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1" />
            <rect x="2" y="-8" width="8" height="8" rx="2" fill="#cbd5e1" />
          </g>
        </svg>
      );

    case 'phone_stand':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="100" cy="165" rx="50" ry="12" fill="#0f172a" fillOpacity="0.12" />
          
          {/* Heavy base plate */}
          <rect x="65" y="145" width="70" height="14" rx="5" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          
          {/* Articulated Arm */}
          <path d="M100 145 L106 95 L96 70" stroke="#334155" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Pivot Hinges */}
          <circle cx="100" cy="145" r="5" fill="#64748b" />
          <circle cx="106" cy="95" r="5" fill="#64748b" />
          
          {/* Cradle Backplate */}
          <rect x="76" y="58" width="48" height="60" rx="8" transform="rotate(-12 100 88)" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
          
          {/* Cradle Hooks */}
          <rect x="78" y="112" width="12" height="10" rx="2" fill="#334155" />
          <rect x="110" y="106" width="12" height="10" rx="2" fill="#334155" />
        </svg>
      );

    case 'power_bank':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="powerBankGrad" x1="70" y1="50" x2="130" y2="150" gradientUnits="userSpaceOnUse">
              <stop stopColor="#334155" />
              <stop offset="0.7" stopColor="#1e293b" />
              <stop offset="1" stopColor="#090d16" />
            </linearGradient>
          </defs>
          <ellipse cx="105" cy="165" rx="46" ry="12" fill="#0f172a" fillOpacity="0.12" />

          {/* Power Bank Body (Angled block) */}
          <g transform="rotate(-10 100 100)">
            <rect x="70" y="50" width="60" height="100" rx="12" fill="url(#powerBankGrad)" stroke="#475569" strokeWidth="1.5" />
            
            {/* Texture Grip Lines */}
            <line x1="78" y1="90" x2="122" y2="90" stroke="#334155" strokeWidth="1" />
            <line x1="78" y1="95" x2="122" y2="95" stroke="#334155" strokeWidth="1" />
            <line x1="78" y1="100" x2="122" y2="100" stroke="#334155" strokeWidth="1" />
            
            {/* LED Battery Dots */}
            <circle cx="82" cy="65" r="2" fill="#10b981" />
            <circle cx="88" cy="65" r="2" fill="#10b981" />
            <circle cx="94" cy="65" r="2" fill="#10b981" />
            <circle cx="100" cy="65" r="2" fill="#10b981" />

            {/* Capacity imprint */}
            <text x="78" y="138" fill="#64748b" fontSize="8" fontWeight="600">20000 mAh</text>
          </g>
        </svg>
      );

    case 'laptop_stand':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="100" cy="165" rx="55" ry="12" fill="#0f172a" fillOpacity="0.1" />

          {/* Aluminum Stand Base Legs */}
          <path d="M55 155 L90 120 L145 155" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
          {/* Laptop Elevation Frame */}
          <path d="M90 120 L115 70" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
          
          {/* Laptop Representation */}
          <g transform="rotate(-25 110 90)">
            {/* Keyboard base */}
            <rect x="70" y="85" width="70" height="6" rx="2" fill="#cbd5e1" />
            {/* Screen Lid */}
            <rect x="70" y="25" width="70" height="60" rx="4" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
            {/* Glowing Screen */}
            <rect x="74" y="29" width="62" height="52" fill="#1e293b" />
            <circle cx="105" cy="55" r="10" fill="#3b82f6" fillOpacity="0.4" />
          </g>
        </svg>
      );

    case 'smart_watch':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="100" cy="168" rx="42" ry="10" fill="#0f172a" fillOpacity="0.1" />
          {/* Watch Straps */}
          <rect x="85" y="35" width="30" height="40" rx="6" fill="#1e293b" />
          <rect x="85" y="125" width="30" height="40" rx="6" fill="#1e293b" />

          {/* Watch Case */}
          <rect x="74" y="65" width="52" height="68" rx="14" fill="#090d16" stroke="#475569" strokeWidth="2" />
          {/* Screen */}
          <rect x="78" y="69" width="44" height="60" rx="10" fill="#020617" />
          
          {/* Digital Clock Display */}
          <text x="86" y="98" fill="#ffffff" fontSize="14" fontWeight="700">10:42</text>
          {/* Activity Ring */}
          <circle cx="100" cy="114" r="8" stroke="#ef4444" strokeWidth="2" fill="none" />
          <circle cx="100" cy="114" r="5" stroke="#10b981" strokeWidth="2" fill="none" />
          
          {/* Digital Crown button */}
          <rect x="127" y="78" width="3" height="12" rx="1" fill="#94a3b8" />
        </svg>
      );

    case 'car_mount':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="100" cy="165" rx="45" ry="10" fill="#0f172a" fillOpacity="0.1" />
          {/* Vent Clamp Back */}
          <rect x="94" y="115" width="12" height="30" rx="3" fill="#475569" />
          <line x1="88" y1="135" x2="112" y2="135" stroke="#334155" strokeWidth="4" />

          {/* Swivel Ball Joint */}
          <circle cx="100" cy="110" r="10" fill="#64748b" />

          {/* Magnetic Head Plate */}
          <rect x="72" y="62" width="56" height="64" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
          {/* MagSafe Ring */}
          <circle cx="100" cy="94" r="18" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 2" />
          <circle cx="100" cy="94" r="4" fill="#3b82f6" />
        </svg>
      );

    case 'bundle_suite':
      return (
        <svg viewBox="0 0 300 220" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Composite for Bundle: Headphones + GaN charger + Cable + Case */}
          <ellipse cx="170" cy="190" rx="90" ry="18" fill="#0f172a" fillOpacity="0.12" />
          
          {/* Hard shell tech pouch in back */}
          <rect x="160" y="80" width="110" height="95" rx="16" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <path d="M160 128 L270 128" stroke="#090d16" strokeWidth="4" />
          <rect x="210" y="125" width="10" height="6" rx="1" fill="#94a3b8" />

          {/* Over-ear Headphones in front left */}
          <g transform="translate(10, 20) scale(0.9)">
            <path d="M90 120 C88 70 110 50 140 50 C170 50 192 70 190 120" stroke="#334155" strokeWidth="12" strokeLinecap="round" />
            <ellipse cx="88" cy="130" rx="16" ry="24" fill="#0f172a" />
            <ellipse cx="192" cy="130" rx="16" ry="24" fill="#0f172a" />
          </g>

          {/* White GaN Charger block in foreground */}
          <g transform="translate(85, 120) scale(0.65)">
            <rect x="40" y="40" width="50" height="60" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <rect x="52" y="55" width="26" height="8" rx="3" fill="#0f172a" />
            <rect x="52" y="70" width="26" height="8" rx="3" fill="#0f172a" />
          </g>

          {/* Coiled black cable */}
          <ellipse cx="140" cy="175" rx="30" ry="10" stroke="#0f172a" strokeWidth="6" />
        </svg>
      );

    case 'travel_kit':
      return (
        <svg viewBox="0 0 320 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Travel setup: Passport, Tech Pouch, Charger, Power Bank, Cable */}
          <ellipse cx="160" cy="175" rx="110" ry="16" fill="#0f172a" fillOpacity="0.14" />

          {/* Navy Blue Passport */}
          <g transform="rotate(12 240 70)">
            <rect x="210" y="20" width="65" height="90" rx="6" fill="#1e3a8a" stroke="#172554" strokeWidth="1.5" />
            <text x="224" y="45" fill="#fde047" fontSize="8" fontWeight="700" letterSpacing="0.1em">PASSPORT</text>
            <circle cx="242" cy="65" r="12" stroke="#fde047" strokeWidth="1" fill="none" />
          </g>

          {/* Black Tech Organizer Pouch */}
          <rect x="110" y="65" width="120" height="85" rx="14" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          <line x1="110" y1="108" x2="230" y2="108" stroke="#090d16" strokeWidth="3" />
          <rect x="165" y="105" width="10" height="6" rx="1" fill="#64748b" />

          {/* Mini GaN Plug */}
          <rect x="50" y="100" width="38" height="42" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          <rect x="58" y="112" width="22" height="6" rx="2" fill="#0f172a" />

          {/* Slim Power bank */}
          <rect x="75" y="125" width="70" height="40" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          <circle cx="85" cy="145" r="2" fill="#10b981" />
          <circle cx="91" cy="145" r="2" fill="#10b981" />
          <circle cx="97" cy="145" r="2" fill="#10b981" />

          {/* Coiled Cable */}
          <ellipse cx="180" cy="165" rx="26" ry="8" stroke="#334155" strokeWidth="5" />
        </svg>
      );

    default:
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg text-gray-400">
          Gadget
        </div>
      );
  }
};
