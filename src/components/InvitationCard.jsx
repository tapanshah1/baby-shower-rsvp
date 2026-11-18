import React, { useRef, useState } from 'react';
import { toPng, toBlob } from 'html-to-image';
import { Download, Copy, Check, Share2, MessageCircle, X, ExternalLink, Image as ImageIcon, Sparkles } from 'lucide-react';
import { eventData } from '../config/eventData';
import { CornerLeaves, DelicateDivider } from './BotanicalDecorations';

export const InvitationCard = () => {
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [imageSaved, setImageSaved] = useState(false);

  const getInvitationText = () => {
    return (
      `🌿 *You're Invited to a Baby Shower!* 🌿\n\n` +
      `Celebrating the Parents-to-be: *${eventData.parentsNames}*\n\n` +
      `📅 *Date:* ${eventData.dateFormatted}\n` +
      `⏰ *Time:* ${eventData.timeFormatted}\n` +
      `📍 *Venue:* ${eventData.venue.name}\n` +
      `${eventData.venue.addressLine1}, ${eventData.venue.addressLine2}\n` +
      `🗺️ *Directions:* ${eventData.venue.googleMapsUrl}\n\n` +
      `💌 *Please RSVP by ${eventData.rsvpDeadlineFormatted}:*\n` +
      `${window.location.href}\n\n` +
      `We can't wait to celebrate together! 🤍`
    );
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      setDownloading(true);
      await new Promise((r) => setTimeout(r, 100));
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2.5,
        backgroundColor: '#FAF9F5',
      });
      const link = document.createElement('a');
      link.download = `Baby-Shower-Invitation-${eventData.parentsNames.replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
      setImageSaved(true);
    } catch (err) {
      console.error('Failed to export image', err);
    } finally {
      setDownloading(false);
    }
  };

  // Try native image file share if supported
  const handleShareImageOnly = async () => {
    if (!cardRef.current) return;
    try {
      setDownloading(true);
      const blob = await toBlob(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2.5,
        backgroundColor: '#FAF9F5',
      });

      if (blob && navigator.share) {
        const file = new File([blob], `Baby-Shower-Invitation.png`, { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `Baby Shower - ${eventData.parentsNames}`,
            files: [file],
          });
          setImageSaved(true);
          return;
        }
      }
      // If native file share not supported, fall back to download
      handleDownload();
    } catch (err) {
      if (err.name !== 'AbortError') {
        handleDownload();
      }
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyText = () => {
    const text = getInvitationText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const openWhatsApp = () => {
    const text = getInvitationText();
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-[0.25em] text-[#71856C] font-semibold">
          Digital Keepsake & Shareable Card
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-[#2C3829] mt-2">
          Your Invitation Card
        </h2>
        <p className="text-sm md:text-base text-[#5C6E57] max-w-md mx-auto mt-2">
          Send to family and friends on WhatsApp with the card photo, event details, and RSVP link.
        </p>
      </div>

      {/* The Printable / Downloadable Card Container */}
      <div className="flex justify-center">
        <div
          ref={cardRef}
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
              honoring the parents-to-be
            </p>

            <DelicateDivider className="my-3" />

            <div className="my-2">
              <span className="font-serif text-3xl md:text-4xl font-semibold text-[#2F3F2C] tracking-wide block">
                {eventData.parentsNames}
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

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        {/* Open Guided WhatsApp Sharing Modal */}
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-semibold transition shadow-md hover:shadow-lg cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Share on WhatsApp</span>
        </button>

        {/* Download Card PNG */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#6B7F62] hover:bg-[#586A50] text-white text-sm font-medium transition shadow-sm hover:shadow disabled:opacity-75 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>{downloading ? 'Saving Image...' : 'Save Card Image (PNG)'}</span>
        </button>

        {/* Copy Message with RSVP Link */}
        <button
          onClick={handleCopyText}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-[#F3F5EE] border border-[#CAD4C7] text-[#3D4F39] text-sm font-medium transition shadow-xs hover:shadow cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#71856C]" />}
          <span>{copied ? 'Copied Invitation!' : 'Copy Text & Link'}</span>
        </button>
      </div>

      {/* Guided WhatsApp Sharing Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#FAF9F5] border border-[#CAD4C7] rounded-3xl w-full max-w-md p-6 shadow-2xl relative text-left">
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#EBF0E7] hover:bg-[#DCE5D7] flex items-center justify-center text-[#4B5E46] transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-xl bg-[#E8F8EE] flex items-center justify-center text-[#25D366]">
                <MessageCircle className="w-5 h-5 fill-[#25D366]" />
              </div>
              <h3 className="font-serif text-2xl text-[#2F3F2C]">
                Share on WhatsApp
              </h3>
            </div>

            <p className="text-xs text-[#5D6F59] mb-5 leading-relaxed">
              WhatsApp does not allow websites to automatically attach photos and messages simultaneously. Follow these 2 easy steps to send both to your guests:
            </p>

            <div className="space-y-3.5">
              {/* Step 1 */}
              <div className="p-4 rounded-2xl bg-white border border-[#CAD4C7] shadow-2xs">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6B7F62]">
                    Step 1: Save Card to Photos
                  </span>
                  {imageSaved && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                      <Check className="w-3.5 h-3.5" /> Saved!
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#5C6E57] mb-3">
                  Download the high-resolution invitation card image to your phone's camera roll.
                </p>
                <button
                  onClick={handleShareImageOnly}
                  disabled={downloading}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#6B7F62] hover:bg-[#586A50] text-white text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>{downloading ? 'Preparing Image...' : 'Save / Share Card Photo'}</span>
                </button>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-2xl bg-[#E8F8EE]/60 border border-[#BDE8CB] shadow-2xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1B803E] block mb-1">
                  Step 2: Open WhatsApp
                </span>
                <p className="text-xs text-[#3E654C] mb-3">
                  Opens WhatsApp with the invitation details & RSVP link already typed in. Simply attach the photo from your camera roll and tap Send!
                </p>
                <button
                  onClick={openWhatsApp}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Open WhatsApp with Message & Link</span>
                </button>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#CAD4C7]/60 flex items-center justify-between text-xs text-[#71856C]">
              <span>Or copy text only:</span>
              <button
                onClick={handleCopyText}
                className="inline-flex items-center gap-1 text-[#4A5D44] font-semibold hover:underline cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Text & Link'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
