import React from 'react';
import logoImage from '../assets/images/logo.png';

interface BrandLogoProps {
  isDark?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ isDark = false, className = '' }) => {
  return (
    <div className={`relative flex items-center select-none transition-all ${className}`}>
      <img
        src={logoImage}
        alt="Prime Funds Solutions Pvt. Ltd. - All About Loans"
        className={`h-[56px] min-[380px]:h-[62px] sm:h-[62px] md:h-[68px] w-auto max-w-[210px] min-[380px]:max-w-[240px] sm:max-w-none object-contain transition-all duration-300 ${
          isDark
            ? 'filter drop-shadow-[0_0_14px_rgba(255,255,255,0.22)] brightness-105 contrast-105'
            : 'filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
        }`}
      />
    </div>
  );
};
