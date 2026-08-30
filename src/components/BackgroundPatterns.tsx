import React from 'react';

/**
 * Ambient Glow Aura with subtle blur and responsive positioning
 */
export const GlowAura: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'hero-split';
  variant?: 'orange' | 'navy' | 'cyan' | 'mixed' | 'emerald';
  opacity?: string;
  className?: string;
}> = ({ position = 'top-right', variant = 'mixed', opacity = 'opacity-60 dark:opacity-40', className = '' }) => {
  const getGradient = () => {
    switch (variant) {
      case 'orange':
        return 'from-[#F5822C]/30 via-[#F5822C]/10 to-transparent';
      case 'cyan':
        return 'from-[#3FB6D3]/30 via-[#3FB6D3]/10 to-transparent';
      case 'emerald':
        return 'from-emerald-500/25 via-emerald-500/10 to-transparent';
      case 'navy':
        return 'from-[#12245C]/35 via-[#3FB6D3]/15 to-transparent dark:from-[#3FB6D3]/20 dark:to-transparent';
      case 'mixed':
      default:
        return 'from-[#F5822C]/25 via-[#3FB6D3]/20 to-transparent dark:from-[#F5822C]/20 dark:via-[#12245C]/40 dark:to-transparent';
    }
  };

  const getPosition = () => {
    switch (position) {
      case 'top-left':
        return '-top-32 -left-32 w-[450px] h-[450px] sm:w-[600px] sm:h-[600px]';
      case 'top-right':
        return '-top-32 -right-32 w-[450px] h-[450px] sm:w-[600px] sm:h-[600px]';
      case 'bottom-left':
        return '-bottom-32 -left-32 w-[450px] h-[450px] sm:w-[600px] sm:h-[600px]';
      case 'bottom-right':
        return '-bottom-32 -right-32 w-[450px] h-[450px] sm:w-[600px] sm:h-[600px]';
      case 'center':
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px]';
      case 'hero-split':
        return 'top-0 right-0 w-full h-full';
    }
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${getPosition()} ${opacity} rounded-full blur-3xl bg-radial ${getGradient()} ${className}`}
    />
  );
};

/**
 * Geometric Micro-Dot Grid Pattern with smooth radial fade mask
 */
export const DotGridPattern: React.FC<{
  className?: string;
  size?: number;
  gap?: number;
  maskRadial?: boolean;
}> = ({ className = '', size = 1.75, gap = 26, maskRadial = true }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        className="w-full h-full text-slate-400/40 dark:text-slate-400/25"
        style={{
          maskImage: maskRadial ? 'radial-gradient(ellipse at center, black 50%, transparent 88%)' : undefined,
          WebkitMaskImage: maskRadial ? 'radial-gradient(ellipse at center, black 50%, transparent 88%)' : undefined,
        }}
      >
        <defs>
          <pattern
            id={`dot-grid-${gap}-${size}`}
            x="0"
            y="0"
            width={gap}
            height={gap}
            patternUnits="userSpaceOnUse"
          >
            <circle cx={gap / 2} cy={gap / 2} r={size} fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dot-grid-${gap}-${size})`} />
      </svg>
    </div>
  );
};

/**
 * High-tech Architectural Financial Grid with subtle lines and crosshair coordinates
 */
export const ArchitecturalGridPattern: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden opacity-45 dark:opacity-30 ${className}`}
    >
      <svg
        className="w-full h-full text-slate-300 dark:text-[#2A3550]"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
        }}
      >
        <defs>
          <pattern
            id="arch-grid"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 64 0 L 0 0 0 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
            <path d="M 0 32 L 6 32 M 32 0 L 32 6" stroke="currentColor" strokeWidth="0.75" />
            <circle cx="0" cy="0" r="2" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#arch-grid)" />
      </svg>
    </div>
  );
};

/**
 * Hero Background Illustration:
 * Shows interconnected financial banking hubs, upward trajectory paths, and floating stylized rupee badges
 */
export const HeroFinancialIllustration: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
    >
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-6 left-1/4 w-80 h-80 rounded-full bg-[#F5822C]/15 dark:bg-[#F5822C]/20 blur-3xl" />
      <div className="absolute top-1/4 right-8 w-[450px] h-[450px] rounded-full bg-[#3FB6D3]/15 dark:bg-[#3FB6D3]/20 blur-3xl" />
      <div className="absolute -bottom-16 left-8 w-96 h-96 rounded-full bg-[#12245C]/10 dark:bg-[#12245C]/40 blur-3xl" />

      {/* Main SVG Vector Artwork Layer */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="hero-chart-gradient-1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F5822C" stopOpacity="0.1" />
            <stop offset="45%" stopColor="#F5822C" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#3FB6D3" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="hero-chart-gradient-2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#12245C" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#3FB6D3" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F5822C" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="area-fill-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5822C" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#3FB6D3" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#3FB6D3" stopOpacity="0.0" />
          </linearGradient>

          <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5822C" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F5822C" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="node-glow-cyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3FB6D3" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3FB6D3" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Curved Financial Upward Trajectories */}
        <path
          d="M -100,580 C 250,550 480,480 750,380 C 1020,280 1200,160 1540,110"
          stroke="url(#hero-chart-gradient-1)"
          strokeWidth="3"
          strokeDasharray="8 6"
          className="opacity-75 dark:opacity-90"
        />

        <path
          d="M -50,650 C 300,600 520,520 820,410 C 1120,300 1300,190 1550,140"
          stroke="url(#hero-chart-gradient-2)"
          strokeWidth="2"
          className="opacity-60 dark:opacity-80"
        />

        {/* Area under curve fill */}
        <path
          d="M -100,580 C 250,550 480,480 750,380 C 1020,280 1200,160 1540,110 L 1540,700 L -100,700 Z"
          fill="url(#area-fill-gradient)"
          className="opacity-60 dark:opacity-50"
        />

        {/* 2. Network Nodes & Connected Banking Vertices */}
        <g className="opacity-90">
          <circle cx="320" cy="520" r="22" fill="url(#node-glow)" />
          <circle cx="320" cy="520" r="5" fill="#F5822C" />
          <line x1="320" y1="520" x2="440" y2="460" stroke="#F5822C" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="3 3" />
        </g>

        <g className="opacity-95">
          <circle cx="580" cy="440" r="28" fill="url(#node-glow-cyan)" />
          <circle cx="580" cy="440" r="6" fill="#3FB6D3" />
          <circle cx="580" cy="440" r="14" stroke="#3FB6D3" strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="580" y1="440" x2="750" y2="380" stroke="#3FB6D3" strokeWidth="1.5" strokeOpacity="0.6" />
        </g>

        <g className="opacity-100">
          <circle cx="750" cy="380" r="36" fill="url(#node-glow)" />
          <circle cx="750" cy="380" r="7" fill="#F5822C" />
          <circle cx="750" cy="380" r="18" stroke="#F5822C" strokeWidth="1.5" strokeOpacity="0.7" strokeDasharray="4 2" />
          <line x1="750" y1="380" x2="980" y2="290" stroke="#F5822C" strokeWidth="1.5" strokeOpacity="0.6" />
        </g>

        <g className="opacity-90">
          <circle cx="980" cy="290" r="26" fill="url(#node-glow-cyan)" />
          <circle cx="980" cy="290" r="6" fill="#3FB6D3" />
          <line x1="980" y1="290" x2="1240" y2="170" stroke="#3FB6D3" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="4 4" />
        </g>

        {/* 3. Floating Stylized Financial Watermarks */}
        {/* Large Aesthetic Rupee Sign in upper right */}
        <g transform="translate(1160, 60)" className="opacity-20 dark:opacity-25 text-[#12245C] dark:text-[#4FC3E0]" fill="currentColor">
          <circle cx="90" cy="90" r="85" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="10 6" />
          <circle cx="90" cy="90" r="72" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2 4" />
          <text x="90" y="125" fontSize="105" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" textAnchor="middle">₹</text>
        </g>

        {/* Shield outline in left region */}
        <g transform="translate(70, 130)" className="opacity-20 dark:opacity-25 text-[#F5822C]" stroke="currentColor" fill="none" strokeWidth="2.5">
          <path d="M60 20 L110 40 V90 C110 135 60 165 60 165 C60 165 10 135 10 90 V40 Z" />
          <path d="M40 90 L55 105 L85 70" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Floating Percentage and Growth Arrow */}
        <g transform="translate(480, 110)" className="opacity-20 dark:opacity-25 text-[#3FB6D3]">
          <circle cx="25" cy="25" r="24" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
          <text x="25" y="33" fontSize="22" fontWeight="800" textAnchor="middle" fill="currentColor">%</text>
        </g>

        {/* Abstract Concentric Circles in corner */}
        <g transform="translate(1360, 420)" className="opacity-25 dark:opacity-30 stroke-[#3FB6D3] dark:stroke-[#4FC3E0]" fill="none" strokeWidth="1">
          <circle cx="0" cy="0" r="50" strokeDasharray="4 4" />
          <circle cx="0" cy="0" r="90" strokeDasharray="2 6" />
          <circle cx="0" cy="0" r="140" strokeOpacity="0.6" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Trust & Statistics Background Art
 * Illustrates shield protection, 40+ bank network connections, and geometric badge rings
 */
export const TrustStatsBackgroundArt: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
    >
      <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-[#3FB6D3]/15 dark:bg-[#3FB6D3]/20 blur-3xl" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-[#F5822C]/15 dark:bg-[#F5822C]/20 blur-3xl" />

      <svg
        className="absolute inset-0 w-full h-full opacity-35 dark:opacity-40"
        viewBox="0 0 1200 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Subtle geometric connection web */}
        <path d="M 0,200 Q 300,100 600,200 T 1200,200" stroke="#3FB6D3" strokeWidth="1.5" strokeDasharray="6 6" />
        <path d="M 0,250 Q 300,350 600,250 T 1200,250" stroke="#F5822C" strokeWidth="1.5" strokeDasharray="4 6" />
        <path d="M 150,50 L 1050,350" stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1" strokeDasharray="8 8" />

        {/* Ring clusters */}
        <g transform="translate(260, 200)">
          <circle cx="0" cy="0" r="45" stroke="#3FB6D3" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="0" cy="0" r="30" stroke="#3FB6D3" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="0" cy="0" r="4" fill="#3FB6D3" />
        </g>

        <g transform="translate(940, 200)">
          <circle cx="0" cy="0" r="55" stroke="#F5822C" strokeWidth="1.5" strokeDasharray="6 4" />
          <circle cx="0" cy="0" r="35" stroke="#F5822C" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="0" cy="0" r="4" fill="#F5822C" />
        </g>

        {/* Bank Network Node Grid */}
        <g className="text-slate-400 dark:text-slate-600">
          <circle cx="600" cy="200" r="6" fill="#F5822C" />
          <circle cx="600" cy="200" r="18" stroke="#F5822C" strokeWidth="1" strokeDasharray="2 2" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Services Section Background Art:
 * Rich floating outline emblems for Home, Commercial Highrise, Vehicles, Rupee Seals, and Architectural Nodes
 */
export const ServicesBackgroundArt: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-[#12245C]/10 dark:bg-[#3FB6D3]/15 blur-3xl" />
      <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] rounded-full bg-[#F5822C]/10 dark:bg-[#F5822C]/15 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#3FB6D3]/10 blur-3xl" />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Architectural grid overlay lines */}
        <line x1="140" y1="0" x2="140" y2="900" stroke="currentColor" className="text-slate-300/60 dark:text-slate-700/50" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="1300" y1="0" x2="1300" y2="900" stroke="currentColor" className="text-slate-300/60 dark:text-slate-700/50" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="0" y1="450" x2="1440" y2="450" stroke="currentColor" className="text-slate-300/50 dark:text-slate-700/40" strokeWidth="1" strokeDasharray="6 12" />

        {/* Floating Outline Illustration: House / Home Loan Blueprint (Top Right) */}
        <g transform="translate(1220, 80)" className="opacity-20 dark:opacity-25 text-[#12245C] dark:text-[#4FC3E0]" stroke="currentColor" strokeWidth="2.5" fill="none">
          <path d="M 0,50 L 55,10 L 110,50 V 110 H 0 Z" />
          <rect x="40" y="65" width="30" height="45" />
          <circle cx="55" cy="55" r="75" strokeDasharray="6 6" />
          <path d="M -20,110 L 130,110" strokeWidth="2" strokeDasharray="3 3" />
        </g>

        {/* Floating Outline Illustration: Corporate Highrise / Business Loan (Bottom Left) */}
        <g transform="translate(60, 640)" className="opacity-20 dark:opacity-25 text-[#F5822C]" stroke="currentColor" strokeWidth="2" fill="none">
          <rect x="0" y="20" width="70" height="110" rx="4" />
          <line x1="15" y1="40" x2="30" y2="40" strokeWidth="3" />
          <line x1="40" y1="40" x2="55" y2="40" strokeWidth="3" />
          <line x1="15" y1="65" x2="30" y2="65" strokeWidth="3" />
          <line x1="40" y1="65" x2="55" y2="65" strokeWidth="3" />
          <line x1="15" y1="90" x2="30" y2="90" strokeWidth="3" />
          <line x1="40" y1="90" x2="55" y2="90" strokeWidth="3" />
          <rect x="75" y="50" width="60" height="80" rx="4" />
          <line x1="90" y1="75" x2="120" y2="75" strokeWidth="3" />
          <line x1="90" y1="100" x2="120" y2="100" strokeWidth="3" />
        </g>

        {/* Floating Rupee Circle watermark (Center Right) */}
        <g transform="translate(1310, 520)" className="opacity-15 dark:opacity-20 text-[#3FB6D3]" fill="currentColor">
          <circle cx="0" cy="0" r="95" stroke="currentColor" strokeWidth="2.5" fill="none" strokeDasharray="8 6" />
          <circle cx="0" cy="0" r="75" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="3 4" />
          <text x="0" y="38" fontSize="110" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" textAnchor="middle">₹</text>
        </g>

        {/* Crosshair coordinate markers */}
        <g className="text-slate-400 dark:text-slate-500 opacity-30">
          <path d="M 140,440 L 140,460 M 130,450 L 150,450" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 1300,440 L 1300,460 M 1290,450 L 1310,450" stroke="currentColor" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Insurance Section Background Art:
 * Floating medical crosses, life safety shields, heartbeat ECG waves, and umbrella contours
 */
export const InsuranceBackgroundArt: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
    >
      {/* Background ambient glows */}
      <div className="absolute top-10 right-1/4 w-[480px] h-[480px] rounded-full bg-[#3FB6D3]/15 dark:bg-[#3FB6D3]/20 blur-3xl" />
      <div className="absolute bottom-10 left-1/4 w-[480px] h-[480px] rounded-full bg-[#F5822C]/15 dark:bg-[#F5822C]/20 blur-3xl" />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* ECG Heartbeat pulse line across background */}
        <path
          d="M 0,350 L 300,350 L 330,310 L 360,400 L 390,270 L 420,380 L 440,350 L 1440,350"
          stroke="#3FB6D3"
          strokeWidth="2"
          strokeDasharray="8 6"
          className="opacity-25 dark:opacity-30"
        />

        {/* Large Security Shield Watermark (Top Right) */}
        <g transform="translate(1220, 100)" className="opacity-20 dark:opacity-25 text-[#12245C] dark:text-[#4FC3E0]" stroke="currentColor" fill="none" strokeWidth="3">
          <path d="M 60,10 L 120,35 V 95 C 120,150 60,185 60,185 C 60,185 0,150 0,95 V 35 Z" />
          <circle cx="60" cy="85" r="28" strokeDasharray="4 3" />
          <path d="M 46,85 L 56,95 L 76,73" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Umbrella Motif (Bottom Left) */}
        <g transform="translate(90, 620)" className="opacity-20 dark:opacity-25 text-[#F5822C]" stroke="currentColor" fill="none" strokeWidth="2.5">
          <path d="M 0,60 C 0,20 45,0 90,0 C 135,0 180,20 180,60 Z" />
          <line x1="90" y1="0" x2="90" y2="110" strokeWidth="3" />
          <path d="M 90,110 C 90,125 105,125 105,110" strokeWidth="3" />
          <line x1="0" y1="60" x2="180" y2="60" strokeDasharray="4 4" />
        </g>

        {/* Plus / Health Medical Crosses */}
        <g transform="translate(1320, 560)" className="opacity-20 dark:opacity-25 text-[#3FB6D3]" fill="currentColor">
          <rect x="25" y="0" width="15" height="65" rx="3" />
          <rect x="0" y="25" width="65" height="15" rx="3" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Calculator Section Background Art:
 * Visual mathematics, pie charts, percentage indicators, bar graph trajectories
 */
export const CalculatorBackgroundArt: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
    >
      <div className="absolute top-10 left-10 w-[450px] h-[450px] rounded-full bg-[#F5822C]/15 dark:bg-[#F5822C]/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-[#3FB6D3]/15 dark:bg-[#3FB6D3]/20 blur-3xl" />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Pie / Donut Chart Motif (Top Right) */}
        <g transform="translate(1040, 160)" className="opacity-20 dark:opacity-25 text-[#12245C] dark:text-[#4FC3E0]" stroke="currentColor" strokeWidth="3" fill="none">
          <circle cx="0" cy="0" r="85" strokeDasharray="10 6" />
          <circle cx="0" cy="0" r="45" strokeDasharray="4 4" />
          <path d="M 0,0 L 0,-85 A 85 85 0 0 1 80,28 Z" fill="currentColor" fillOpacity="0.25" />
          <line x1="0" y1="0" x2="-60" y2="60" />
        </g>

        {/* Isometric Bar Graph Motif (Bottom Left) */}
        <g transform="translate(60, 480)" className="opacity-20 dark:opacity-25 text-[#F5822C]" fill="currentColor">
          <rect x="0" y="90" width="24" height="70" rx="4" />
          <rect x="34" y="60" width="24" height="100" rx="4" />
          <rect x="68" y="30" width="24" height="130" rx="4" />
          <rect x="102" y="0" width="24" height="160" rx="4" />
          {/* Trend arrow */}
          <path d="M 0,80 Q 50,30 130,-20" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="4 4" />
        </g>

        {/* Percentage Floating Accents */}
        <g transform="translate(150, 130)" className="opacity-20 dark:opacity-25 text-[#3FB6D3]" fill="currentColor">
          <text x="0" y="0" fontSize="95" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800">%</text>
        </g>

        {/* Currency Rupee Emblem */}
        <g transform="translate(980, 560)" className="opacity-20 dark:opacity-25 text-[#F5822C]" fill="currentColor">
          <circle cx="40" cy="40" r="50" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="6 4" />
          <text x="40" y="58" fontSize="55" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" textAnchor="middle">₹</text>
        </g>
      </svg>
    </div>
  );
};

/**
 * About Us Section Background Art:
 * Trajectory roadmap, trust pillars, and mission target rings
 */
export const AboutUsBackgroundArt: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
    >
      <div className="absolute top-10 left-10 w-[450px] h-[450px] rounded-full bg-[#F5822C]/15 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-[#3FB6D3]/15 blur-3xl" />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Target Bullseye Rings */}
        <g transform="translate(1260, 180)" className="opacity-20 dark:opacity-25 text-[#12245C] dark:text-[#4FC3E0]" stroke="currentColor" fill="none" strokeWidth="1.5">
          <circle cx="0" cy="0" r="30" />
          <circle cx="0" cy="0" r="65" strokeDasharray="6 4" />
          <circle cx="0" cy="0" r="105" strokeDasharray="3 6" />
          <line x1="-120" y1="0" x2="120" y2="0" strokeDasharray="4 4" />
          <line x1="0" y1="-120" x2="0" y2="120" strokeDasharray="4 4" />
        </g>

        {/* Milestone Growth Trajectory Curve */}
        <path
          d="M 50,600 C 350,550 650,450 950,280 C 1150,160 1350,180 1440,150"
          stroke="#F5822C"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          className="opacity-25 dark:opacity-35"
        />

        {/* Pillars / Bank Column Motif (Bottom Left) */}
        <g transform="translate(80, 520)" className="opacity-20 dark:opacity-25 text-[#3FB6D3]" stroke="currentColor" strokeWidth="2" fill="none">
          <path d="M 0,20 L 60,0 L 120,20 H 0 Z" />
          <rect x="10" y="25" width="15" height="75" rx="2" />
          <rect x="40" y="25" width="15" height="75" rx="2" />
          <rect x="68" y="25" width="15" height="75" rx="2" />
          <rect x="95" y="25" width="15" height="75" rx="2" />
          <rect x="0" y="100" width="120" height="15" rx="2" />
        </g>
      </svg>
    </div>
  );
};

/**
 * CTA / Contact & Quick Enquiry Background Art:
 * Radar arcs, compass coordinates, and communication pulse waves
 */
export const ContactBackgroundArt: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
    >
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-[#F5822C]/15 dark:bg-[#F5822C]/20 blur-3xl" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-[#3FB6D3]/15 dark:bg-[#3FB6D3]/20 blur-3xl" />

      <svg
        className="absolute inset-0 w-full h-full opacity-40 dark:opacity-35"
        viewBox="0 0 1200 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Radar Rings radiating from center */}
        <circle cx="600" cy="250" r="130" stroke="#F5822C" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="4 6" />
        <circle cx="600" cy="250" r="230" stroke="#3FB6D3" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="6 8" />
        <circle cx="600" cy="250" r="350" stroke="#12245C" strokeWidth="1.5" strokeOpacity="0.35" className="dark:stroke-[#4FC3E0]/30" />

        {/* Diagonal Light Trails */}
        <line x1="150" y1="0" x2="1050" y2="500" stroke="#F5822C" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="12 12" />
        <line x1="1050" y1="0" x2="150" y2="500" stroke="#3FB6D3" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="12 12" />
      </svg>
    </div>
  );
};
