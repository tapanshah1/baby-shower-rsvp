import React from 'react';

export const EucalyptusBranch = ({ className = "w-24 h-24 text-[#6B7F62]" }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10 110 C40 85 70 55 105 15" stroke="#7A8E72" strokeWidth="2" strokeLinecap="round" />
    {/* Leaves */}
    <ellipse cx="32" cy="85" rx="14" ry="9" transform="rotate(-30 32 85)" fill="#9CB094" opacity="0.85" />
    <path d="M22 89 C28 86 36 84 42 81" stroke="#687C60" strokeWidth="1" strokeLinecap="round" />

    <ellipse cx="48" cy="74" rx="15" ry="10" transform="rotate(35 48 74)" fill="#8FA486" opacity="0.85" />
    <path d="M40 76 C46 74 54 73 60 72" stroke="#607458" strokeWidth="1" strokeLinecap="round" />

    <ellipse cx="65" cy="53" rx="16" ry="11" transform="rotate(-25 65 53)" fill="#ADC0A5" opacity="0.85" />
    <path d="M54 57 C61 54 70 51 76 49" stroke="#73896B" strokeWidth="1" strokeLinecap="round" />

    <ellipse cx="80" cy="40" rx="15" ry="10" transform="rotate(40 80 40)" fill="#94AA8B" opacity="0.85" />
    <path d="M72 43 C78 40 86 38 91 37" stroke="#64795D" strokeWidth="1" strokeLinecap="round" />

    <ellipse cx="98" cy="22" rx="13" ry="8" transform="rotate(-15 98 22)" fill="#BDCEB5" opacity="0.9" />
    
    {/* Gold berry accents */}
    <circle cx="28" cy="98" r="3" fill="#C5A880" />
    <circle cx="58" cy="65" r="2.5" fill="#D4AF37" />
    <circle cx="88" cy="30" r="2.5" fill="#C5A880" />
  </svg>
);

export const BotanicalWreath = ({ className = "w-64 h-64", children }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
      {/* Subtle gold rings */}
      <circle cx="150" cy="150" r="130" stroke="#C5A880" strokeWidth="1" strokeDasharray="3 4" opacity="0.7" />
      <circle cx="150" cy="150" r="122" stroke="#8F9E8B" strokeWidth="1" opacity="0.5" />
      
      {/* Left eucalyptus branch */}
      <path d="M150 280 C60 260 25 190 35 120 C40 80 80 35 150 20" stroke="#7E9275" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="50" cy="210" rx="20" ry="12" transform="rotate(-50 50 210)" fill="#93A88B" opacity="0.8" />
      <ellipse cx="32" cy="150" rx="22" ry="13" transform="rotate(-15 32 150)" fill="#7F9477" opacity="0.75" />
      <ellipse cx="48" cy="95" rx="19" ry="11" transform="rotate(25 48 95)" fill="#A4B99D" opacity="0.8" />
      <ellipse cx="92" cy="48" rx="18" ry="10" transform="rotate(55 92 48)" fill="#8AA082" opacity="0.75" />
      
      {/* Right eucalyptus branch */}
      <path d="M150 280 C240 260 275 190 265 120 C260 80 220 35 150 20" stroke="#7E9275" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="250" cy="210" rx="20" ry="12" transform="rotate(50 250 210)" fill="#93A88B" opacity="0.8" />
      <ellipse cx="268" cy="150" rx="22" ry="13" transform="rotate(15 268 150)" fill="#7F9477" opacity="0.75" />
      <ellipse cx="252" cy="95" rx="19" ry="11" transform="rotate(-25 252 95)" fill="#A4B99D" opacity="0.8" />
      <ellipse cx="208" cy="48" rx="18" ry="10" transform="rotate(-55 208 48)" fill="#8AA082" opacity="0.75" />

      {/* Gold dots/berries around wreath */}
      <circle cx="40" cy="180" r="3.5" fill="#C5A880" />
      <circle cx="65" cy="70" r="3" fill="#D4AF37" />
      <circle cx="150" cy="18" r="4" fill="#C5A880" />
      <circle cx="235" cy="70" r="3" fill="#D4AF37" />
      <circle cx="260" cy="180" r="3.5" fill="#C5A880" />
      <circle cx="150" cy="282" r="4" fill="#C5A880" />
    </svg>
    <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
      {children}
    </div>
  </div>
);

export const CornerLeaves = ({ className = "w-32 h-32", position = "top-left" }) => {
  const rotation = {
    'top-left': '',
    'top-right': 'scale-x-[-1]',
    'bottom-left': 'scale-y-[-1]',
    'bottom-right': 'scale-x-[-1] scale-y-[-1]'
  }[position] || '';

  return (
    <div className={`pointer-events-none ${rotation} ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-80">
        <path d="M0 0 C30 15 50 45 60 85" stroke="#7A8E72" strokeWidth="1.5" strokeLinecap="round" />
        <ellipse cx="20" cy="15" rx="14" ry="8" transform="rotate(35 20 15)" fill="#9AB091" opacity="0.85" />
        <ellipse cx="40" cy="35" rx="15" ry="9" transform="rotate(45 40 35)" fill="#869C7D" opacity="0.8" />
        <ellipse cx="52" cy="62" rx="14" ry="8" transform="rotate(65 52 62)" fill="#ADC2A4" opacity="0.85" />
        <circle cx="32" cy="22" r="2.5" fill="#C5A880" />
        <circle cx="48" cy="48" r="2" fill="#D4AF37" />
      </svg>
    </div>
  );
};

export const DelicateDivider = ({ className = "my-6" }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    <div className="h-[1px] w-16 md:w-28 bg-gradient-to-r from-transparent via-[#C5A880]/60 to-[#C5A880]" />
    <div className="flex items-center gap-1.5 text-[#6B7F62]">
      <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2 C7 2 3 7 1 12 C6 10 10 8 12 2 Z" fill="#8FA486" />
        <path d="M12 2 C17 2 21 7 23 12 C18 10 14 8 12 2 Z" fill="#A3B89B" />
        <circle cx="12" cy="7" r="2" fill="#C5A880" />
      </svg>
    </div>
    <div className="h-[1px] w-16 md:w-28 bg-gradient-to-l from-transparent via-[#C5A880]/60 to-[#C5A880]" />
  </div>
);
