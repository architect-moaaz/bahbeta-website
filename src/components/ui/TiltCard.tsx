import { useRef, useCallback } from 'react';
import { useIsMobile } from '../../hooks/useMediaQuery';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className = '', maxTilt = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isMobile) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(600px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg)`;
    },
    [isMobile, maxTilt]
  );

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.4s ease-out';
    el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
    setTimeout(() => {
      if (el) el.style.transition = '';
    }, 400);
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={className}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  );
}
