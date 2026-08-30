import React from 'react';
import {
  UserCheck,
  Home,
  Briefcase,
  Building2,
  Coins,
  Car,
  GraduationCap,
  Sprout,
  ShieldCheck,
  Users,
  ArrowLeftRight,
  Shield,
  HeartHandshake,
  TrendingUp,
  PiggyBank,
  SunMedium,
  Activity,
  Plane,
  Building,
  Scale,
  Lock,
  Layers,
  Zap,
  BadgeCheck,
  FileCheck2,
  Calculator,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Percent,
  IndianRupee,
  Calendar,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Sun,
  Moon,
  Send,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export const WhatsAppIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-5 h-5',
  size = 20
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    aria-label="WhatsApp"
  >
    <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.979-.276-.1-.477-.15-.678.15-.201.301-.778.979-.954 1.18-.176.201-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.897-.8-1.503-1.788-1.679-2.089-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.101-.201.05-.377-.025-.527-.075-.15-.678-1.633-.929-2.236-.245-.588-.493-.508-.678-.517-.176-.009-.377-.009-.577-.009s-.527.075-.803.377c-.276.301-1.054 1.03-1.054 2.512 0 1.482 1.079 2.912 1.23 3.113.15.201 2.124 3.244 5.145 4.549.719.311 1.28.497 1.718.636.722.23 1.378.197 1.897.12.578-.087 1.782-.728 2.033-1.431.251-.703.251-1.306.176-1.431-.075-.126-.276-.201-.577-.351z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.405A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2a8.17 8.17 0 01-4.394-1.272l-.315-.187-2.964.836.837-2.888-.206-.328A8.172 8.172 0 1112 20.2z"
    />
  </svg>
);

export const PhoneCallIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-5 h-5',
  size = 20
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    aria-label="Phone Call"
  >
    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.21 2.2z" />
  </svg>
);

export const EmailIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-5 h-5',
  size = 20
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    aria-label="Email"
  >
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

export const DynamicIcon: React.FC<{ name: string; className?: string }> = ({
  name,
  className = 'w-6 h-6'
}) => {
  const iconMap: Record<string, React.ElementType> = {
    UserCheck,
    Home,
    Briefcase,
    Building2,
    Coins,
    Car,
    GraduationCap,
    Sprout,
    ShieldCheck,
    Users,
    ArrowLeftRight,
    Shield,
    HeartHandshake,
    TrendingUp,
    PiggyBank,
    SunMedium,
    Activity,
    Plane,
    Building,
    Scale,
    Lock,
    Layers,
    Zap,
    BadgeCheck,
    FileCheck2,
    Calculator,
    PhoneCall,
    Mail,
    MapPin,
    Clock,
    CheckCircle2,
    Percent,
    IndianRupee,
    Calendar,
    Sparkles,
    ArrowRight,
    ChevronDown,
    ChevronUp,
    Menu,
    X,
    Sun,
    Moon,
    Send,
    HelpCircle,
    AlertCircle
  };

  const Component = iconMap[name] || Shield;
  return <Component className={className} />;
};
