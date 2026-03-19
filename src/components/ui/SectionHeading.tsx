import { useRef, useState, useEffect } from 'react';
import { TypewriterText } from './TypewriterText';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  largeTitle?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
  largeTitle = false,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [titleDone, setTitleDone] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`max-w-4xl mb-10 md:mb-14 ${alignClass} ${className}`}>
      {eyebrow && inView && (
        <p className="text-bb-accent font-mono font-medium text-sm tracking-widest uppercase mb-4 glow-text">
          <TypewriterText text={eyebrow} speed={50} scramble onComplete={() => {}} />
        </p>
      )}
      <h2 className={`${largeTitle ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl' : 'text-section'} text-white mb-4 md:mb-6 min-h-[1.2em]`}>
        {inView && (
          <TypewriterText
            text={title}
            delay={eyebrow ? 400 : 0}
            speed={60}
            scramble
            onComplete={() => setTitleDone(true)}
          />
        )}
      </h2>
      {subtitle && (
        <p className="text-subtitle-lg text-bb-gray-400 min-h-[1.5em]">
          {titleDone && (
            <TypewriterText text={subtitle} speed={30} scramble={false} />
          )}
        </p>
      )}
    </div>
  );
}
