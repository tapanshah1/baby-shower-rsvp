import React from 'react';
import { Calendar, Heart, MapPin, ArrowDown } from 'lucide-react';
import { eventData } from '../config/eventData';
import { EucalyptusBranch, DelicateDivider } from './BotanicalDecorations';
import { getGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

export const Hero = () => {
  const scrollToRSVP = () => {
    document.getElementById('rsvp-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="relative flex flex-col items-center justify-center text-center px-4 pt-12 md:pt-16 pb-6 md:pb-8 overflow-hidden">
      {/* Background Decorative Branches */}
      <div className="absolute -top-12 -left-12 opacity-40 pointer-events-none md:opacity-60">
        <EucalyptusBranch className="w-56 h-56 md:w-80 md:h-80" />
      </div>
      <div className="absolute -top-12 -right-12 opacity-40 pointer-events-none md:opacity-60 scale-x-[-1]">
        <EucalyptusBranch className="w-56 h-56 md:w-80 md:h-80" />
      </div>

      {/* Main Wreath & Headings */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Soft Gold Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF0E7] border border-[#CAD4C7] text-[#4F624A] text-xs uppercase tracking-[0.2em] font-semibold mb-6">
          <Heart className="w-3.5 h-3.5 fill-[#8FA486] text-[#8FA486]" />
          <span>Baby Shower Celebration</span>
        </div>

        <p className="font-script text-3xl md:text-5xl text-[#9E7B4F] mb-1">
          {eventData.subheadline}
        </p>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#2A3627] tracking-tight leading-tight md:leading-tight">
          {eventData.parentsNames}
        </h1>

        <p className="text-sm md:text-base tracking-[0.2em] uppercase text-[#6B7F62] font-medium mt-3">
          {eventData.babyTitle ? `Welcoming ${eventData.babyTitle}` : 'Welcoming Our Little Blessing'}
        </p>

        <DelicateDivider className="my-6" />

        {/* Date, Time & Venue Summary Card */}
        <div className="glass-panel px-5 sm:px-7 py-3.5 sm:py-4 rounded-2xl max-w-2xl mx-auto mb-8 botanical-shadow">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-[#3E4F3B]">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <Calendar className="w-4 h-4 text-[#7A8E72] shrink-0" />
              <span className="font-medium">{eventData.dateFormatted}</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0" />
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="font-medium">{eventData.timeFormatted}</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0" />
            <div className="flex items-center gap-2 whitespace-nowrap">
              <MapPin className="w-4 h-4 text-[#7A8E72] shrink-0" />
              <span className="font-medium">{eventData.venue.name}</span>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={scrollToRSVP}
            className="px-7 py-3 rounded-full bg-[#6B7F62] hover:bg-[#586A50] text-white font-serif text-base md:text-lg tracking-wide transition shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <span>RSVP Today</span>
            <ArrowDown className="w-4 h-4" />
          </button>

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
    </header>
  );
};
