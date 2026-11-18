import React from 'react';
import { MapPin, Navigation, Calendar, Clock, Car } from 'lucide-react';
import { eventData } from '../config/eventData';
import { DelicateDivider } from './BotanicalDecorations';
import { getGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

export const EventDetails = () => {
  return (
    <section className="py-16 px-4 bg-[#F2F5ED]/60 border-y border-[#CAD4C7]/40">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#71856C] font-semibold">
            Celebrate With Us
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#2C3829] mt-2">
            Date & Location
          </h2>
          <DelicateDivider className="my-4" />
        </div>

        {/* Centered Luxury Venue Card */}
        <div className="glass-panel p-8 md:p-10 rounded-3xl botanical-shadow text-center flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-[#E8EFE5] flex items-center justify-center text-[#556B4E] mb-5 shadow-xs">
            <MapPin className="w-7 h-7" />
          </div>

          <span className="text-xs uppercase tracking-widest text-[#71856C] font-semibold">
            Venue & Address
          </span>

          <h3 className="font-serif text-3xl md:text-4xl text-[#2F3F2C] mt-2 mb-2">
            {eventData.venue.name}
          </h3>

          <p className="text-base text-[#4E5E4B] leading-relaxed max-w-md">
            {eventData.venue.addressLine1}, {eventData.venue.addressLine2}
          </p>

          <div className="w-16 h-[1px] bg-[#C5A880]/50 my-6" />

          {/* Date & Time Highlight */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-[#3E4F3B] mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#7A8E72]" />
              <span className="font-serif text-xl font-medium">{eventData.dateFormatted}</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#7A8E72]" />
              <span className="font-serif text-xl font-medium">{eventData.timeFormatted}</span>
            </div>
          </div>

          {/* Parking Note if exists */}
          {eventData.venue.parkingNote && (
            <div className="mb-8 p-3.5 rounded-2xl bg-white/70 border border-[#CAD4C7] flex items-center justify-center gap-2.5 text-xs text-[#52644F] max-w-md w-full">
              <Car className="w-4 h-4 shrink-0 text-[#71856C]" />
              <span>{eventData.venue.parkingNote}</span>
            </div>
          )}

          {/* Action Navigation & Calendar Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={eventData.venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#6B7F62] hover:bg-[#586A50] text-white text-xs font-semibold tracking-wider uppercase transition shadow-sm hover:shadow"
            >
              <Navigation className="w-4 h-4" />
              <span>Open in Google Maps</span>
            </a>

            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-[#F3F5EE] border border-[#CAD4C7] text-xs font-semibold tracking-wider uppercase text-[#3D4F39] transition shadow-xs hover:shadow"
            >
              <Calendar className="w-4 h-4 text-[#71856C]" />
              <span>Google Calendar</span>
            </a>

            <button
              onClick={downloadIcsFile}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-[#F3F5EE] border border-[#CAD4C7] text-xs font-semibold tracking-wider uppercase text-[#3D4F39] transition shadow-xs hover:shadow cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#71856C]" />
              <span>Apple Calendar (.ics)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
