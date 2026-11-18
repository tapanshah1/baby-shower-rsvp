import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Calendar, MapPin, Heart, AlertCircle, Sparkles } from 'lucide-react';
import { eventData } from '../config/eventData';
import { getGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';
import { DelicateDivider } from './BotanicalDecorations';

export const RSVPForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    attending: 'yes', // 'yes' or 'no'
    guestCount: '1',
    guestNames: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8FA486', '#C5A880', '#A3B89B', '#D4AF37', '#6B7F62']
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const submissionPayload = {
      ...formData,
      timestamp: new Date().toISOString()
    };

    try {
      // 1. Save to local storage for local tracking / admin review
      const existing = JSON.parse(localStorage.getItem('baby_shower_rsvps') || '[]');
      existing.push(submissionPayload);
      localStorage.setItem('baby_shower_rsvps', JSON.stringify(existing));

      // 2. If Google Sheets URL is provided, send data to Google Apps Script Webhook
      if (eventData.googleSheetScriptUrl && eventData.googleSheetScriptUrl.trim() !== '') {
        try {
          await fetch(eventData.googleSheetScriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'text/plain;charset=utf-8'
            },
            body: JSON.stringify(submissionPayload)
          });
        } catch (webhookErr) {
          console.warn('Webhook post encountered error, but local storage succeeded:', webhookErr);
        }
      }

      setStatus('success');
      if (formData.attending === 'yes') {
        triggerCelebration();
      }
    } catch (err) {
      console.error('Submission failed', err);
      setStatus('error');
      setErrorMessage('Something went wrong submitting your RSVP. Please try again or reach out to the hosts directly.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      attending: 'yes',
      guestCount: '1',
      guestNames: '',
      message: ''
    });
  };

  return (
    <section id="rsvp-section" className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#71856C] font-semibold">
            We hope you can make it
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#2C3829] mt-2">
            Kindly Respond
          </h2>
          <p className="text-sm md:text-base text-[#5F705A] mt-2">
            Please let us know if you can join our celebration by <strong className="text-[#344431]">{eventData.rsvpDeadlineFormatted}</strong>.
          </p>
          <DelicateDivider className="my-4" />
        </div>

        <div className="glass-panel p-6 md:p-10 rounded-3xl botanical-shadow">
          {status === 'success' ? (
            <div className="text-center py-6 space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-[#E8EFE5] rounded-full flex items-center justify-center mx-auto text-[#5B7153]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-serif text-3xl text-[#2F3F2C]">
                  {formData.attending === 'yes' ? 'We Can’t Wait to See You!' : 'Thank You for Letting Us Know'}
                </h3>
                <p className="text-[#5F705A] text-sm md:text-base mt-2 max-w-md mx-auto">
                  {formData.attending === 'yes'
                    ? `Thank you, ${formData.fullName}. Your RSVP has been received. We look forward to celebrating with ${eventData.parentsNames}!`
                    : `We will miss you, ${formData.fullName}! Thank you so much for your warm thoughts and wishes.`}
                </p>
              </div>

              {formData.attending === 'yes' && (
                <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#C5A880]/30 max-w-md mx-auto space-y-3">
                  <p className="text-xs uppercase tracking-wider text-[#71856C] font-semibold">
                    Don't forget to mark your calendar!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                    <a
                      href={getGoogleCalendarUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#6B7F62] hover:bg-[#586A50] text-white text-xs font-medium transition"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Add to Google Calendar
                    </a>
                    <button
                      onClick={downloadIcsFile}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#F3F5EE] border border-[#A3B89B]/50 text-[#3D4F39] text-xs font-medium transition cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Apple / Outlook (.ics)
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="text-xs text-[#71856C] hover:text-[#3D4F39] underline cursor-pointer"
                >
                  Submit another response or edit
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'error' && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Attendance Choice */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#5A6D56] font-semibold mb-2.5">
                  Will you be able to attend? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`flex items-center justify-center p-3.5 rounded-2xl border cursor-pointer transition text-center ${
                      formData.attending === 'yes'
                        ? 'border-[#6B7F62] bg-[#EBF0E7] text-[#2F3F2C] font-semibold shadow-sm'
                        : 'border-[#D5DDD2] bg-white/70 text-[#61745D] hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={formData.attending === 'yes'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span>🌿 Joyfully Accepts</span>
                  </label>

                  <label
                    className={`flex items-center justify-center p-3.5 rounded-2xl border cursor-pointer transition text-center ${
                      formData.attending === 'no'
                        ? 'border-[#B49A76] bg-[#FAF5EE] text-[#4A3D2A] font-semibold shadow-sm'
                        : 'border-[#D5DDD2] bg-white/70 text-[#61745D] hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={formData.attending === 'no'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span>🕊️ Regretfully Declines</span>
                  </label>
                </div>
              </div>

              {/* Guest Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-[#5A6D56] mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CAD4C7] focus:border-[#6B7F62] focus:ring-2 focus:ring-[#8F9E8B]/30 outline-none text-sm transition"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#5A6D56] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="eleanor@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CAD4C7] focus:border-[#6B7F62] focus:ring-2 focus:ring-[#8F9E8B]/30 outline-none text-sm transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-[#5A6D56] mb-1.5">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CAD4C7] focus:border-[#6B7F62] focus:ring-2 focus:ring-[#8F9E8B]/30 outline-none text-sm transition"
                  />
                </div>

                {formData.attending === 'yes' && (
                  <div>
                    <label htmlFor="guestCount" className="block text-xs font-semibold uppercase tracking-wider text-[#5A6D56] mb-1.5">
                      Total Guests Attending
                    </label>
                    <select
                      id="guestCount"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CAD4C7] focus:border-[#6B7F62] focus:ring-2 focus:ring-[#8F9E8B]/30 outline-none text-sm transition"
                    >
                      <option value="1">Just Me (1 guest)</option>
                      <option value="2">2 Guests (+1)</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5+">5+ Guests (Family)</option>
                    </select>
                  </div>
                )}
              </div>

              {formData.attending === 'yes' && Number(formData.guestCount) > 1 && (
                <div>
                  <label htmlFor="guestNames" className="block text-xs font-semibold uppercase tracking-wider text-[#5A6D56] mb-1.5">
                    Names of Additional Guests
                  </label>
                  <input
                    type="text"
                    id="guestNames"
                    name="guestNames"
                    placeholder="e.g. Partner, child name"
                    value={formData.guestNames}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CAD4C7] focus:border-[#6B7F62] focus:ring-2 focus:ring-[#8F9E8B]/30 outline-none text-sm transition"
                  />
                </div>
              )}

              {/* Sweet Note / Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#5A6D56] mb-1.5">
                  Wishes or Note for the Parents-to-be
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  placeholder="Share your warm thoughts, advice, or love..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#CAD4C7] focus:border-[#6B7F62] focus:ring-2 focus:ring-[#8F9E8B]/30 outline-none text-sm transition resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#6B7F62] hover:bg-[#586A50] text-white font-serif text-lg tracking-wide transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
              >
                {status === 'submitting' ? (
                  <span>Sending Your RSVP...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Confirm RSVP</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
