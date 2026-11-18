import React from 'react';
import { Gift, ExternalLink, Heart } from 'lucide-react';
import { eventData } from '../config/eventData';
import { DelicateDivider } from './BotanicalDecorations';

export const Registry = () => {
  if (!eventData.registries || eventData.registries.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#71856C] font-semibold">
            Honoring Baby
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#2C3829] mt-2">
            Baby Registry
          </h2>
          <p className="text-sm md:text-base text-[#5F705A] mt-2 max-w-lg mx-auto leading-relaxed">
            Your presence, love, and warm wishes are the greatest gift of all! If you wish to bless the parents-to-be with something special, registries have been set up below.
          </p>
          <DelicateDivider className="my-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {eventData.registries.map((reg, index) => (
            <div
              key={index}
              className="glass-panel p-6 rounded-2xl botanical-shadow flex flex-col justify-between hover:-translate-y-1 transition duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] flex items-center justify-center text-[#9E7B4F]">
                    <Gift className="w-5 h-5" />
                  </div>
                  {reg.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#EBF0E7] text-[#556950]">
                      {reg.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl text-[#2F3F2C] mb-1">
                  {reg.name}
                </h3>
                <p className="text-xs text-[#5D6F59] mb-4">
                  {reg.description}
                </p>
              </div>

              <a
                href={reg.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-white hover:bg-[#F3F5EE] border border-[#CAD4C7] text-xs font-semibold text-[#3D4F39] transition group-hover:border-[#6B7F62]"
              >
                <span>Visit Registry</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#71856C]" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
