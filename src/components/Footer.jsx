import React from 'react';
import { ArrowUp } from 'lucide-react';
import { eventData } from '../config/eventData';
import { DelicateDivider } from './BotanicalDecorations';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-12 pb-16 px-4 bg-[#F2F5ED] border-t border-[#CAD4C7]/50 text-center">
      <div className="max-w-2xl mx-auto space-y-5">
        <DelicateDivider className="mb-4" />

        <p className="font-script text-3xl md:text-4xl text-[#9E7B4F]">
          With all our love & gratitude
        </p>

        {eventData.gratitudeMessage && (
          <p className="text-sm md:text-base text-[#5F705A] max-w-md mx-auto leading-relaxed">
            {eventData.gratitudeMessage}
          </p>
        )}

        <h3 className="font-serif text-2xl md:text-3xl text-[#2F3F2C]">
          {eventData.signatureNames || eventData.parentsNames}
        </h3>

        {/* Action link */}
        <div className="pt-4 flex items-center justify-center text-xs text-[#71856C]">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/70 hover:bg-white border border-[#CAD4C7] transition cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#8F9E8B]" />
            <span>Back to top</span>
          </button>
        </div>

        <p className="text-[11px] text-[#869982] pt-4">
          © {new Date().getFullYear()} {eventData.signatureNames || eventData.parentsNames} • Made with 🌿 for baby shower celebrations
        </p>
      </div>
    </footer>
  );
};
