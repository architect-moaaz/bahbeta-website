import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Effect = 'slide' | 'blur' | 'scale' | 'rotate';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  className?: string;
  once?: boolean;
  effect?: Effect;
}

export function ScrollReveal({
  children,
  direction = 'up',
  distance = 60,
  duration = 0.8,
  delay = 0,
  className = '',
  once = true,
  effect = 'slide',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const fromVars: gsap.TweenVars = { opacity: 0 };

    switch (effect) {
      case 'slide':
        if (direction === 'up') fromVars.y = distance;
        if (direction === 'down') fromVars.y = -distance;
        if (direction === 'left') fromVars.x = distance;
        if (direction === 'right') fromVars.x = -distance;
        break;
      case 'blur':
        fromVars.filter = 'blur(12px)';
        fromVars.y = distance * 0.3;
        break;
      case 'scale':
        fromVars.scale = 0.85;
        fromVars.y = distance * 0.4;
        break;
      case 'rotate':
        fromVars.rotation = direction === 'left' ? -5 : 5;
        fromVars.y = distance * 0.5;
        break;
    }

    const tween = gsap.from(ref.current, {
      ...fromVars,
      duration,
      delay,
      ease: 'power3.out',
      clearProps: effect === 'blur' ? 'filter' : undefined,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [direction, distance, duration, delay, once, effect]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
