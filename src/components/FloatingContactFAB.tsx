import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { WhatsAppIcon, PhoneCallIcon, EmailIcon } from './BrandIcons';
import { useData } from '../context/DataContext';

export const FloatingContactFAB: React.FC = () => {
  const { brandDetails: BRAND_DETAILS } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  const contactOptions = [
    {
      id: 'fab-whatsapp',
      label: 'WhatsApp Chat',
      sublabel: BRAND_DETAILS.phone,
      href: BRAND_DETAILS.whatsappUrl(`Hi ${BRAND_DETAILS.contactPerson || 'Saikiran'}, I want to inquire about loans and financial services.`),
      bgColor: 'bg-[#25D366] hover:bg-[#20bd5a] text-white',
      icon: <WhatsAppIcon size={20} className="w-5 h-5" />,
      delay: 'delay-[100ms]'
    },
    {
      id: 'fab-call',
      label: 'Direct Phone Call',
      sublabel: BRAND_DETAILS.phone,
      href: BRAND_DETAILS.callUrl,
      bgColor: 'bg-[#12245C] dark:bg-[#1E293B] hover:bg-[#0c1840] text-white border border-slate-700',
      icon: <PhoneCallIcon size={19} className="w-5 h-5 text-[#4FC3E0]" />,
      delay: 'delay-[50ms]'
    },
    {
      id: 'fab-email',
      label: 'Send Email',
      sublabel: BRAND_DETAILS.email,
      href: BRAND_DETAILS.emailUrl,
      bgColor: 'bg-[#F5822C] hover:bg-[#e0711f] text-white',
      icon: <EmailIcon size={19} className="w-5 h-5" />,
      delay: 'delay-[0ms]'
    }
  ];

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 left-6 z-40 flex flex-col items-start select-none"
    >
      {/* Expanded Menu Options */}
      <div
        className={`flex flex-col gap-3 mb-3 transition-all duration-300 transform origin-bottom-left ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
        }`}
      >
        {contactOptions.map(opt => (
          <a
            key={opt.id}
            href={opt.href}
            target={opt.id === 'fab-whatsapp' ? '_blank' : undefined}
            rel={opt.id === 'fab-whatsapp' ? 'noopener noreferrer' : undefined}
            className={`group flex items-center gap-3 px-4 py-2.5 rounded-full shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 ${opt.bgColor}`}
          >
            <div className="flex items-center justify-center">{opt.icon}</div>
            <div className="flex flex-col text-left pr-1">
              <span className="text-xs font-bold leading-tight tracking-wide">{opt.label}</span>
              <span className="text-[10px] opacity-90 leading-none">{opt.sublabel}</span>
            </div>
          </a>
        ))}
      </div>

      {/* Main Floating Trigger Button */}
      <button
        onClick={toggleOpen}
        aria-label="Quick Contact Options"
        aria-expanded={isOpen}
        className={`group relative flex items-center justify-center w-13 h-13 rounded-full shadow-2xl transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#F5822C]/40 ${
          isOpen
            ? 'bg-slate-800 text-white rotate-90'
            : 'bg-[#F5822C] text-white hover:scale-110'
        }`}
      >
        {/* Pulse beacon effect when closed */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3FB6D3] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#3FB6D3]"></span>
          </span>
        )}

        {isOpen ? (
          <X className="w-6 h-6 transition-transform duration-200" />
        ) : (
          <MessageSquare className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" />
        )}
      </button>
    </div>
  );
};
