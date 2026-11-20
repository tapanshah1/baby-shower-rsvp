import React from 'react';
import { eventData } from '../config/eventData';
import { CornerLeaves, DelicateDivider } from './BotanicalDecorations';

export const InvitationCard = () => {
  return (
    <div className="pt-2 md:pt-4 pb-12 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-serif text-[#2C3829]">
          Your Invitation Card
        </h2>
      </div>

      {/* The Printable / Downloadable Card Container */}
      <div className="flex justify-center">
        <div
          className="relative w-full max-w-lg bg-[#FAF9F5] p-8 md:p-12 rounded-3xl shadow-xl border border-[#C5A880]/30 overflow-hidden"
          style={{
            backgroundImage: `radial-gradient(#8F9E8B 0.5px, transparent 0.5px), radial-gradient(#C5A880 0.5px, #FAF9F5 0.5px)`,
            backgroundSize: `24px 24px`,
            backgroundPosition: `0 0, 12px 12px`,
          }}
        >
          {/* Inner Golden Border */}
          <div className="absolute inset-3 md:inset-4 border border-[#C5A880]/50 rounded-2xl pointer-events-none" />
          <div className="absolute inset-4 md:inset-5 border border-[#8F9E8B]/30 rounded-xl pointer-events-none" />

          {/* Corner Botanical Sprigs */}
          <CornerLeaves className="absolute top-2 left-2 w-20 h-20" position="top-left" />
          <CornerLeaves className="absolute top-2 right-2 w-20 h-20" position="top-right" />
          <CornerLeaves className="absolute bottom-2 left-2 w-20 h-20" position="bottom-left" />
          <CornerLeaves className="absolute bottom-2 right-2 w-20 h-20" position="bottom-right" />

          {/* Card Content */}
          <div className="relative z-10 text-center flex flex-col items-center">
            <span className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-[#71856C] font-semibold">
              JOIN US FOR A
            </span>

            <h3 className="font-serif text-3xl md:text-5xl font-normal text-[#2C3829] mt-2 tracking-tight">
              Baby Shower
            </h3>

            <p className="font-script text-2xl md:text-3xl text-[#9E7B4F] mt-1">
              {eventData.cardHonoringText || 'honoring the parents-to-be'}
            </p>

            <DelicateDivider className="my-3" />

            <div className="my-2">
              <span className="font-serif text-3xl md:text-4xl font-semibold text-[#2F3F2C] tracking-wide block">
                {eventData.cardParentsNames || 'Meera & Harsh'}
              </span>
              {eventData.babyTitle && (
                <span className="text-xs uppercase tracking-widest text-[#7B8F77] mt-1 block">
                  Welcoming {eventData.babyTitle}
                </span>
              )}
            </div>

            <div className="w-12 h-[1px] bg-[#C5A880]/50 my-4" />

            <div className="space-y-1.5 text-[#3D4C3A]">
              <p className="font-serif text-lg md:text-xl font-medium tracking-wide">
                {eventData.dateFormatted}
              </p>
              <p className="text-xs md:text-sm tracking-widest text-[#667A62] font-semibold">
                {eventData.timeFormatted}
              </p>
            </div>

            <div className="mt-5 space-y-0.5 text-xs md:text-sm text-[#4E5E4B] max-w-xs">
              <p className="font-semibold text-[#2D392B]">{eventData.venue.name}</p>
              <p>{eventData.venue.addressLine1}</p>
              <p>{eventData.venue.addressLine2}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#C5A880]/30 w-full flex flex-col items-center">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#71856C]">
                Kindly RSVP by {eventData.rsvpDeadlineFormatted}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
