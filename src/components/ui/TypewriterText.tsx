import { useState, useEffect } from 'react';

const SCRAMBLE_CHARS = 'アイウエオカキクケコ01#$%&@';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  scramble?: boolean;
  className?: string;
  onComplete?: () => void;
}

export function TypewriterText({
  text,
  delay = 0,
  speed = 40,
  scramble = true,
  className = '',
  onComplete,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  // Wait for delay before starting
  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Type out characters
  useEffect(() => {
    if (!started) return;

    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index > text.length) {
        clearInterval(interval);
        setDisplayed(text);
        setDone(true);
        onComplete?.();
        return;
      }

      const revealed = text.slice(0, index);
      if (scramble && index < text.length) {
        // Add 1-2 scrambled chars after the revealed portion
        const scrambled = Array.from({ length: Math.min(2, text.length - index) }, () =>
          SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        ).join('');
        setDisplayed(revealed + scrambled);
      } else {
        setDisplayed(revealed);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed, scramble, onComplete]);

  if (!started) return <span className={className}>&nbsp;</span>;

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="inline-block w-[2px] h-[1em] bg-bb-accent animate-blink ml-0.5 align-middle" />}
    </span>
  );
}
