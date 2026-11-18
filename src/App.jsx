import React, { useState } from 'react';
import { QrCode, Smartphone, X, Copy, Check } from 'lucide-react';
import { Hero } from './components/Hero';
import { InvitationCard } from './components/InvitationCard';
import { EventDetails } from './components/EventDetails';
import { RSVPForm } from './components/RSVPForm';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const liveUrl = typeof window !== 'undefined' ? window.location.origin : "https://baby-shower-rsvp-sooty.vercel.app";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(liveUrl)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
              onClick={() => setIsQrOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-[#F3F5EE] border border-[#CAD4C7] text-xs font-medium text-[#4B5E46] transition shadow-2xs cursor-pointer"
              title="Open on your phone"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#6B7F62]" />
              <span className="hidden sm:inline">Phone View</span>
            </button>
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

      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

      {/* QR Code / Mobile Access Modal */}
      {isQrOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#FAF9F5] border border-[#CAD4C7] rounded-3xl w-full max-w-sm p-6 shadow-2xl relative text-center">
            <button
              onClick={() => setIsQrOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#EBF0E7] hover:bg-[#DCE5D7] flex items-center justify-center text-[#4B5E46] transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 bg-[#EBF0E7] rounded-2xl flex items-center justify-center mx-auto text-[#5B7153] mb-3">
              <QrCode className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-2xl text-[#2F3F2C]">
              Open on Your Mobile
            </h3>
            <p className="text-xs text-[#5D6F59] mt-1 mb-4">
              Scan with your phone's camera to open the invitation:
            </p>

            <div className="bg-white p-3.5 rounded-2xl border border-[#CAD4C7] inline-block shadow-sm mb-4">
              <img
                src={qrCodeUrl}
                alt="Scan to open on phone"
                className="w-48 h-48 mx-auto rounded-lg"
              />
            </div>

            <div className="bg-white px-3 py-2 rounded-xl border border-[#CAD4C7] flex items-center justify-between text-xs text-[#3E4F3B]">
              <span className="font-mono text-[11px] truncate">{liveUrl}</span>
              <button
                onClick={handleCopy}
                className="ml-2 p-1 text-[#6B7F62] hover:text-[#4A5D44] cursor-pointer"
                title="Copy URL"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
