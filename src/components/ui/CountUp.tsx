import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface CountUpProps {
  value: string; // e.g. "50+", "24/7", "15+"
  label: string;
  className?: string;
}

export function CountUp({ value, label, className = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Parse numeric part
  const numericMatch = value.match(/^(\d+)/);
  const numericValue = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  const suffix = numericMatch ? value.slice(numericMatch[0].length) : value;
  const isNumeric = !!numericMatch;

  useEffect(() => {
    if (!ref.current || hasAnimated || !isNumeric) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: numericValue,
            duration: 1.5,
            ease: 'power2.out',
            snap: { val: 1 },
            onUpdate: () => {
              if (ref.current) ref.current.textContent = `${obj.val}${suffix}`;
            },
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated, numericValue, suffix, isNumeric]);

  return (
    <div className={`text-center ${className}`}>
      <span ref={ref} className="text-2xl sm:text-3xl font-bold text-white font-mono glow-text">
        {isNumeric ? `0${suffix}` : value}
      </span>
      <p className="text-bb-gray-400 text-xs sm:text-sm mt-1 font-mono">{label}</p>
    </div>
  );
}
