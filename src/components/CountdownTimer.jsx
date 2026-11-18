import React, { useState, useEffect } from 'react';
import { eventData } from '../config/eventData';

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(eventData.eventDateTimeISO) - +new Date();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPassed: false,
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  if (timeLeft.isPassed) {
    return (
      <div className="inline-block px-6 py-2 rounded-full bg-[#EBF0E9] border border-[#A3B89B] text-[#4A5D44] font-medium tracking-wide">
        The celebration has arrived! 🎉
      </div>
    );
  }

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-3 md:gap-5">
      {units.map((unit, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="w-16 h-18 md:w-20 md:h-22 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#A3B89B]/40 shadow-sm flex items-center justify-center">
            <span className="font-serif text-2xl md:text-3xl font-semibold text-[#3D4F39]">
              {String(unit.value).padStart(2, '0')}
            </span>
          </div>
          <span className="mt-1.5 text-[10px] md:text-xs tracking-widest text-[#71856C] font-semibold uppercase">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};
