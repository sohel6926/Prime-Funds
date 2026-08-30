import React from 'react';

interface BrandLogoProps {
  isDark?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ isDark = false, className = '' }) => {
  return (
    <div className={`relative flex items-center select-none w-[175px] min-[380px]:w-[210px] sm:w-[260px] md:w-[280px] h-[36px] min-[380px]:h-[42px] sm:h-[48px] md:h-[54px] transition-all ${className}`}>
      {/* Light Theme Logo Asset (Logo Asset 2: Transparent Lockup) */}
      <div
        className={`absolute inset-0 flex items-center transition-opacity duration-300 ${
          isDark ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-hidden={isDark}
      >
        <svg
          viewBox="0 0 280 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-contain"
        >
          {/* Emblem Icon */}
          <g>
            <rect x="4" y="5" width="44" height="44" rx="10" fill="#12245C" />
            {/* Geometric P & Growth Arrows */}
            <path
              d="M16 39V15H27C31.4 15 34.5 18 34.5 22.5C34.5 27 31.4 30 27 30H22V39H16Z"
              fill="#FFFFFF"
            />
            <path
              d="M22 20.5H26.5C28.2 20.5 29.5 21.3 29.5 22.5C29.5 23.7 28.2 24.5 26.5 24.5H22V20.5Z"
              fill="#12245C"
            />
            {/* Dynamic Orange Growth Wave */}
            <path
              d="M32 37C37 34 40 28 41 23"
              stroke="#F5822C"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Teal Accent Dot */}
            <circle cx="41" cy="21" r="2.5" fill="#3FB6D3" />
          </g>

          {/* Text Lockup */}
          <text
            x="58"
            y="23"
            fill="#12245C"
            fontFamily="'Outfit', sans-serif"
            fontWeight="800"
            fontSize="14.5"
            letterSpacing="-0.2px"
          >
            PRIME FUNDS
          </text>
          <text
            x="154"
            y="23"
            fill="#F5822C"
            fontFamily="'Outfit', sans-serif"
            fontWeight="700"
            fontSize="13"
            letterSpacing="-0.2px"
          >
            SOLUTIONS
          </text>
          <text
            x="58"
            y="35"
            fill="#5B6377"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="600"
            fontSize="9"
            letterSpacing="0.8px"
          >
            PVT. LTD.
          </text>

          {/* Tagline Badge */}
          <rect x="110" y="27" width="102" height="18" rx="9" fill="#F5822C" fillOpacity="0.12" />
          <path
            d="M117 36L120 33L123 36"
            stroke="#F5822C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="126"
            y="39.5"
            fill="#F5822C"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="700"
            fontSize="9"
            letterSpacing="0.2px"
          >
            ALL ABOUT LOANS
          </text>
        </svg>
      </div>

      {/* Dark Theme Logo Asset (Logo Asset 1: 3D Badge on Charcoal Plate) */}
      <div
        className={`absolute inset-0 flex items-center transition-opacity duration-300 ${
          isDark ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isDark}
      >
        <svg
          viewBox="0 0 280 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="charcoalPlate" x1="0" y1="0" x2="280" y2="54" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1E293B" />
              <stop offset="1" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="goldEmboss" x1="16" y1="15" x2="35" y2="39" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFA654" />
              <stop offset="1" stopColor="#F5822C" />
            </linearGradient>
            <linearGradient id="metalBorder" x1="0" y1="0" x2="280" y2="54" gradientUnits="userSpaceOnUse">
              <stop stopColor="#334155" />
              <stop offset="0.5" stopColor="#1E293B" />
              <stop offset="1" stopColor="#475569" />
            </linearGradient>
          </defs>

          {/* Charcoal Background Plate with Beveled Rim */}
          <rect x="1" y="2" width="278" height="50" rx="10" fill="url(#charcoalPlate)" stroke="url(#metalBorder)" strokeWidth="1" />

          {/* 3D Emblem Badge */}
          <g>
            <rect x="7" y="7" width="40" height="40" rx="8" fill="#151E32" stroke="#2A3550" strokeWidth="1" />
            {/* Embossed Letterform */}
            <path
              d="M17 37V16H27C31 16 33.8 18.8 33.8 23C33.8 27.2 31 30 27 30H22.5V37H17Z"
              fill="url(#goldEmboss)"
            />
            <path
              d="M22.5 21H26.5C27.9 21 29 21.8 29 23C29 24.2 27.9 25 26.5 25H22.5V21Z"
              fill="#0F172A"
            />
            {/* Vivid Teal Accent Light */}
            <circle cx="37" cy="18" r="2.5" fill="#4FC3E0" />
            <path
              d="M30 36C34.5 33.5 37 28 38 22"
              stroke="#4FC3E0"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>

          {/* Typography on Dark */}
          <text
            x="56"
            y="23"
            fill="#F1F3F8"
            fontFamily="'Outfit', sans-serif"
            fontWeight="800"
            fontSize="14"
            letterSpacing="-0.1px"
          >
            PRIME FUNDS
          </text>
          <text
            x="150"
            y="23"
            fill="#F5822C"
            fontFamily="'Outfit', sans-serif"
            fontWeight="700"
            fontSize="13"
            letterSpacing="-0.1px"
          >
            SOLUTIONS
          </text>
          <text
            x="56"
            y="35"
            fill="#9BA3B7"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="600"
            fontSize="9"
            letterSpacing="0.8px"
          >
            PVT. LTD.
          </text>

          {/* Tagline Badge on Charcoal */}
          <rect x="108" y="27" width="102" height="17" rx="8.5" fill="#F5822C" fillOpacity="0.2" stroke="#F5822C" strokeOpacity="0.4" strokeWidth="0.8" />
          <text
            x="116"
            y="38.5"
            fill="#FFA654"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="700"
            fontSize="8.5"
            letterSpacing="0.4px"
          >
            ★ ALL ABOUT LOANS
          </text>
        </svg>
      </div>
    </div>
  );
};
