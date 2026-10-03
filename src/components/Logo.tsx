import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10 sm:w-11 sm:h-11" }) => {
  return (
    <div className={`${className} rounded-full overflow-hidden shrink-0 select-none shadow-md flex items-center justify-center bg-[#091b36] border border-cyan-400/40 ring-1 ring-white/10`}>
      <img
        src="/favicon.jpeg"
        alt="Gadget Hub Mart Logo"
        className="w-full h-full object-cover rounded-full"
        onError={(e) => {
          const target = e.currentTarget;
          if (!target.src.endsWith('/favicon.png')) {
            target.src = '/favicon.png';
          }
        }}
      />
    </div>
  );
};
