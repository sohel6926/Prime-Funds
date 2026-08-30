import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        setScrollPercentage(progress);
      }

      if (scrollTop > 280) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercentage / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 transform ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className="relative group w-12 h-12 rounded-full bg-white dark:bg-[#151E32] text-[#12245C] dark:text-[#F1F3F8] shadow-lg border border-[#E5E9F2] dark:border-[#2A3550] flex items-center justify-center hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
      >
        <svg className="w-12 h-12 -rotate-90 pointer-events-none absolute inset-0" viewBox="0 0 44 44">
          {/* Background Track Ring */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-slate-200 dark:stroke-slate-700"
            strokeWidth="2.5"
            fill="transparent"
          />
          {/* Live Progress Ring */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            stroke="#F5822C"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-100 ease-out"
          />
        </svg>

        <ChevronUp className="w-5 h-5 text-[#F5822C] group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </div>
  );
};
