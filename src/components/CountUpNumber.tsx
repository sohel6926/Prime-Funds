import React, { useState, useEffect, useRef } from 'react';

interface CountUpNumberProps {
  /** Target numeric value to count up to */
  end: number;
  /** Starting numeric value (default 0) */
  start?: number;
  /** Duration of animation in milliseconds (default 2000ms) */
  duration?: number;
  /** Prefix to display before the number (e.g., "₹") */
  prefix?: string;
  /** Suffix to display after the number (e.g., "+ Cr", "%", "+") */
  suffix?: string;
  /** Formatting locale (default 'en-IN' for Indian numbering commas) */
  locale?: string;
  /** Additional CSS classes */
  className?: string;
}

export const CountUpNumber: React.FC<CountUpNumberProps> = ({
  end,
  start = 0,
  duration = 2200,
  prefix = '',
  suffix = '',
  locale = 'en-IN',
  className = ''
}) => {
  const [count, setCount] = useState<number>(start);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    // Cubic ease-out curve for natural deceleration
    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutCubic(progress);

      const currentVal = Math.round(start + (end - start) * easedProgress);
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [hasAnimated, start, end, duration]);

  const formattedNumber = count.toLocaleString(locale);

  return (
    <span ref={elementRef} className={`inline-flex items-baseline ${className}`}>
      {prefix && <span className="mr-0.5 select-none">{prefix}</span>}
      <span className="tabular-nums tracking-tight">{formattedNumber}</span>
      {suffix && <span className="ml-0.5 select-none">{suffix}</span>}
    </span>
  );
};
