import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { eventData } from '../config/eventData';
import { DelicateDivider } from './BotanicalDecorations';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 px-4 bg-[#F2F5ED]/40 border-t border-[#CAD4C7]/40">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#71856C] font-semibold">
            Common Questions
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#2C3829] mt-2">
            Frequently Asked
          </h2>
          <DelicateDivider className="my-4" />
        </div>

        <div className="space-y-3">
          {eventData.faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white/80 rounded-2xl border border-[#CAD4C7]/60 overflow-hidden transition shadow-xs hover:border-[#8F9E8B]"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 md:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-serif text-lg md:text-xl text-[#2F3F2C]">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#71856C] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#3D4F39]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 md:px-5 pt-0 text-xs md:text-sm text-[#5D6F59] leading-relaxed border-t border-[#EBF0E7]/60">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
