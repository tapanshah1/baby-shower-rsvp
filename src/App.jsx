import React from 'react';
import { Hero } from './components/Hero';
import { InvitationCard } from './components/InvitationCard';
import { EventDetails } from './components/EventDetails';
import { RSVPForm } from './components/RSVPForm';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-[#2D3748] bg-[#F8F9F5]">
      {/* Navigation bar with quick RSVP button */}
      <nav className="sticky top-0 z-40 bg-[#FAF9F5]/85 backdrop-blur-md border-b border-[#CAD4C7]/40 px-4 py-3 transition">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="font-serif text-lg md:text-xl font-medium tracking-tight text-[#2F3F2C]">
            Baby Shower 🌿
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => document.getElementById('rsvp-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-4 py-1.5 rounded-full bg-[#6B7F62] hover:bg-[#586A50] text-white text-xs font-semibold tracking-wide transition shadow-xs cursor-pointer"
            >
              RSVP
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Hero />
        <InvitationCard />
        <EventDetails />
        <RSVPForm />
      </main>

      <Footer />
    </div>
  );
}
