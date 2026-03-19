import { useEffect, useRef } from 'react';

interface MatrixRainProps {
  opacity?: number;
  className?: string;
  interactive?: boolean;
}

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
const FONT_SIZE = 14;
const COLORS = ['#0084FF', '#339DFF', '#66B8FF'];

export function MatrixRain({ opacity = 0.15, className = '', interactive = false }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    if (!interactive) return;
    const handleMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [interactive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let columns: number;
    let drops: number[];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / FONT_SIZE);
      // Preserve existing drops where possible, init new ones
      const oldDrops = drops || [];
      drops = Array.from({ length: columns }, (_, i) =>
        i < oldDrops.length ? oldDrops[i] : Math.random() * -100
      );
    };

    resize();
    window.addEventListener('resize', resize);

    // Reduce density on mobile
    const isMobile = window.innerWidth < 768;
    const skipFactor = isMobile ? 3 : 1;

    const FRAME_INTERVAL = 1000 / 30; // ~30fps
    const DROP_SPEED = 0.4; // fractional increment per frame
    let lastTime = 0;

    const draw = (now: number) => {
      animId = requestAnimationFrame(draw);

      if (now - lastTime < FRAME_INTERVAL) return;
      lastTime = now;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px monospace`;

      const REPEL_RADIUS = 120;

      for (let i = 0; i < columns; i++) {
        if (skipFactor > 1 && i % skipFactor !== 0) continue;

        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        const y = Math.floor(drops[i]) * FONT_SIZE;

        // Mouse repel void
        if (interactive) {
          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL_RADIUS) {
            ctx.globalAlpha = 0;
            drops[i] += DROP_SPEED;
            continue;
          }
        }

        // Head character is brightest
        const colorIdx = Math.floor(Math.random() * COLORS.length);
        ctx.fillStyle = COLORS[colorIdx];
        ctx.globalAlpha = 0.8 + Math.random() * 0.2;
        ctx.fillText(char, x, y);

        // Trail character slightly dimmer
        if (drops[i] > 1) {
          const trailChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          ctx.globalAlpha = 0.3;
          ctx.fillText(trailChar, x, y - FONT_SIZE);
        }

        ctx.globalAlpha = 1;

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += DROP_SPEED;
      }
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ opacity }}
    />
  );
}
