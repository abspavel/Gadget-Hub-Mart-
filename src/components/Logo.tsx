import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-12 h-12" }) => {
  return (
    <div className={`${className} rounded-full bg-[#0a192f] flex items-center justify-center relative overflow-hidden shadow-md border border-cyan-400/40 group shrink-0 select-none`}>
      <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f274a" />
            <stop offset="100%" stopColor="#061224" />
          </linearGradient>
          <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Circular Background filling 100% of space */}
        <circle cx="100" cy="100" r="100" fill="url(#bgGrad)" />

        {/* Subtle decorative tech grid / radial accent */}
        <circle cx="100" cy="100" r="88" stroke="#1e3a5f" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />

        {/* Dynamic Cyan Orbiting Ring */}
        <ellipse
          cx="100"
          cy="105"
          rx="78"
          ry="58"
          transform="rotate(-22 100 105)"
          stroke="url(#cyanGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="280 80"
          opacity="0.95"
        />

        {/* Orbit Glowing Particle */}
        <circle cx="168" cy="80" r="4.5" fill="#38bdf8" filter="url(#glow)" />

        {/* Golden Shopping Cart (with speed trail) */}
        <g transform="translate(86, 26)">
          {/* Motion lines */}
          <line x1="-22" y1="14" x2="-6" y2="14" stroke="#fbbf24" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="-28" y1="24" x2="-10" y2="24" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
          <line x1="-18" y1="34" x2="-4" y2="34" stroke="#fbbf24" strokeWidth="3.5" strokeLinecap="round" opacity="0.6" />

          {/* Cart handle & basket */}
          <path
            d="M0 10 L14 10 L28 36 L74 36 L84 16 L22 16"
            stroke="url(#goldGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <line x1="32" y1="24" x2="68" y2="24" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
          <line x1="44" y1="16" x2="48" y2="36" stroke="#fbbf24" strokeWidth="3" />
          <line x1="58" y1="16" x2="62" y2="36" stroke="#fbbf24" strokeWidth="3" />

          {/* Cart Wheels */}
          <circle cx="36" cy="46" r="5" fill="#fbbf24" />
          <circle cx="68" cy="46" r="5" fill="#fbbf24" />
        </g>

        {/* Bold "GH" monogram prominently filling the lower-middle */}
        <text
          x="30"
          y="156"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="92"
          fill="#ffffff"
          fontStyle="italic"
          letterSpacing="-3"
        >
          G
        </text>
        <text
          x="98"
          y="156"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="88"
          fill="url(#cyanGrad)"
          fontStyle="italic"
        >
          H
        </text>

        {/* Small sparkling star at bottom right */}
        <path
          d="M174 135 Q174 145 184 145 Q174 145 174 155 Q174 145 164 145 Q174 145 174 135 Z"
          fill="#38bdf8"
          opacity="0.85"
        />
      </svg>
    </div>
  );
};
