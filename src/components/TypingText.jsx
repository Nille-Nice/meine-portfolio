import { useEffect, useState } from 'react';

export default function TypingText({ text, speed = 50, delay = 0, onDone }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!text || currentIndex >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayedText(prev => prev + text[currentIndex]);
      setCurrentIndex(prev => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex(0);
      setDisplayedText('');
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (text && currentIndex === text.length && typeof onDone === 'function') {
      onDone();
    }
  }, [currentIndex, text, onDone]);

  return (
    <span className="font-mono">
      {displayedText}
      {currentIndex < text.length && <span className="animate-blink">|</span>}
    </span>
  );
}
