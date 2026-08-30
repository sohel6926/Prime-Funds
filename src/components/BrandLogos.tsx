import React from 'react';
import logoLight from '../assets/images/prime_funds_logo.jpg';
import logoDark from '../assets/images/prime_funds_logo_dark.jpg';

interface BrandLogoProps {
  isDark?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ isDark = false, className = '' }) => {
  return (
    <div className={`relative flex items-center select-none transition-all ${className}`}>
      {/* Light Theme Logo */}
      <img
        src={logoLight}
        alt="Prime Funds Solutions Pvt. Ltd. - All About Loans"
        className={`h-[40px] min-[380px]:h-[48px] sm:h-[56px] md:h-[64px] w-auto object-contain transition-opacity duration-300 absolute ${
          isDark ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-hidden={isDark}
      />
      {/* Dark Theme Logo */}
      <img
        src={logoDark}
        alt="Prime Funds Solutions Pvt. Ltd. - All About Loans"
        className={`h-[40px] min-[380px]:h-[48px] sm:h-[56px] md:h-[64px] w-auto object-contain transition-opacity duration-300 ${
          isDark ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isDark}
      />
    </div>
  );
};
