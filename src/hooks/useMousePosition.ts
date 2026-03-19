import { useState, useEffect, useRef } from 'react';
import { useIsMobile } from './useMediaQuery';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

export function useMousePosition(throttleMs = 16) {
  const isMobile = useIsMobile();
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });
  const lastUpdate = useRef(0);

  useEffect(() => {
    if (isMobile) return;

    const handleMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdate.current < throttleMs) return;
      lastUpdate.current = now;

      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setPos({ x: e.clientX, y: e.clientY, normalizedX: nx, normalizedY: ny });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isMobile, throttleMs]);

  return pos;
}
