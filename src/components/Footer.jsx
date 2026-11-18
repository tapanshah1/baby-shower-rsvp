import React from 'react';
import { Heart, Lock, ArrowUp } from 'lucide-react';
import { eventData } from '../config/eventData';
import { DelicateDivider } from './BotanicalDecorations';

export const Footer = ({ onOpenAdmin }) => {
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

        <h3 className="font-serif text-2xl md:text-3xl text-[#2F3F2C]">
          {eventData.parentsNames}
        </h3>

        <p className="text-xs md:text-sm text-[#5F705A] max-w-md mx-auto">
          Have questions or need assistance? Reach out to our hosts at{' '}
          <a
            href={`mailto:${eventData.hosts.contactEmail}`}
            className="underline hover:text-[#3D4F39] font-medium"
          >
            {eventData.hosts.contactEmail}
          </a>
        </p>

        {/* Action link for Organizer */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-[#71856C]">
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 hover:bg-white border border-[#CAD4C7] transition cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-[#8F9E8B]" />
            <span>Host Dashboard / View RSVPs</span>
          </button>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 hover:bg-white border border-[#CAD4C7] transition cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#8F9E8B]" />
            <span>Back to top</span>
          </button>
        </div>

        <p className="text-[11px] text-[#869982] pt-4">
          © {new Date().getFullYear()} {eventData.parentsNames} • Made with 🌿 for baby shower celebrations
        </p>
      </div>
    </footer>
  );
};
