import React from 'react';
import logoImage from '../assets/images/logo.png';

interface BrandLogoProps {
  isDark?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ isDark = false, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none transition-all ${className}`}>
      <img
        src={logoImage}
        alt="Prime Funds Solutions Pvt. Ltd. - All About Loans"
        className={`h-[58px] min-[360px]:h-[65px] min-[400px]:h-[70px] sm:h-[72px] md:h-[76px] w-auto max-w-[205px] min-[360px]:max-w-[245px] min-[400px]:max-w-[275px] sm:max-w-none object-contain transition-all duration-300 ${
          isDark
            ? 'filter drop-shadow-[0_0_18px_rgba(245,130,44,0.4)] drop-shadow-[0_0_10px_rgba(255,255,255,0.25)] brightness-105 contrast-105'
            : 'filter drop-shadow-[0_3px_10px_rgba(245,130,44,0.25)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.1)]'
        }`}
      />
    </div>
  );
};
