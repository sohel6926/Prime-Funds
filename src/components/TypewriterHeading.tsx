import React, { useState, useEffect } from 'react';

interface TypewriterHeadingProps {
  /** Single text or array of texts to type out sequentially in a loop */
  phrases: string[];
  /** Optional static prefix */
  prefix?: string;
  /** Optional static suffix */
  suffix?: string;
  /** Typing speed in ms per character (default 45ms) */
  typingSpeed?: number;
  /** Deleting speed in ms per character (default 25ms) */
  deletingSpeed?: number;
  /** Pause duration at full text before deleting (default 2800ms) */
  pauseDuration?: number;
  /** Additional CSS class for the heading container */
  className?: string;
  /** Custom highlight phrase or word inside the typed text */
  highlightWords?: string[];
  /** CSS class for the highlighted word */
  highlightClassName?: string;
  /** Show blinking cursor caret */
  showCursor?: boolean;
  /** Cursor color/styling */
  cursorClassName?: string;
}

export const TypewriterHeading: React.FC<TypewriterHeadingProps> = ({
  phrases,
  prefix = '',
  suffix = '',
  typingSpeed = 45,
  deletingSpeed = 25,
  pauseDuration = 3000,
  className = '',
  highlightWords = ['Prime Funds', 'Prime Funds Solutions'],
  highlightClassName = 'text-[#F5822C]',
  showCursor = true,
  cursorClassName = 'text-[#F5822C]'
}) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;

    const fullPhrase = phrases[phraseIndex % phrases.length];

    // When paused at the end of a full typed sentence
    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        // If there's only 1 phrase and it's full, don't delete unless multiple phrases exist
        if (phrases.length > 1) {
          setIsDeleting(true);
        }
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }

    // Typing or Deleting
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing forward
        if (currentText.length < fullPhrase.length) {
          setCurrentText(fullPhrase.slice(0, currentText.length + 1));
        } else {
          // Finished typing phrase
          setIsPaused(true);
        }
      } else {
        // Deleting backward
        if (currentText.length > 0) {
          setCurrentText(fullPhrase.slice(0, currentText.length - 1));
        } else {
          // Finished deleting, go to next phrase
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    };

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, isPaused, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  // Helper to highlight specific words inside the current typed slice
  const renderFormattedText = (text: string) => {
    if (!highlightWords || highlightWords.length === 0) {
      return text;
    }

    // Find if any highlight word overlaps with currentText
    let matchedWord: string | null = null;
    let matchIndex = -1;

    for (const hw of highlightWords) {
      const idx = text.indexOf(hw);
      if (idx !== -1) {
        matchedWord = hw;
        matchIndex = idx;
        break;
      }
    }

    if (matchedWord && matchIndex !== -1) {
      const before = text.substring(0, matchIndex);
      const highlighted = text.substring(matchIndex, matchIndex + matchedWord.length);
      const after = text.substring(matchIndex + matchedWord.length);

      return (
        <>
          {before}
          <span className={highlightClassName}>{highlighted}</span>
          {after}
        </>
      );
    }

    // Also check if currentText is partially typing one of the highlight words
    for (const hw of highlightWords) {
      // If the full phrase has the highlight word, and current text has entered that range
      const fullPhrase = phrases[phraseIndex % phrases.length];
      const startIdx = fullPhrase.indexOf(hw);
      if (startIdx !== -1 && text.length > startIdx) {
        const before = text.substring(0, startIdx);
        const highlightedPortion = text.substring(startIdx);
        return (
          <>
            {before}
            <span className={highlightClassName}>{highlightedPortion}</span>
          </>
        );
      }
    }

    return text;
  };

  return (
    <span className={`inline-block ${className}`}>
      {prefix && <span>{prefix} </span>}
      <span>{renderFormattedText(currentText)}</span>
      {suffix && <span> {suffix}</span>}
      {showCursor && (
        <span
          className={`inline-block font-normal ml-0.5 animate-pulse select-none ${cursorClassName}`}
          aria-hidden="true"
        >
          |
        </span>
      )}
    </span>
  );
};
