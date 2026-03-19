import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useIsMobile } from '../../hooks/useMediaQuery';

// Digital blast particle system
function createBlastCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  Object.assign(canvas.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '9998',
    pointerEvents: 'none',
  });
  document.body.appendChild(canvas);
  return canvas;
}

const MATRIX_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789@#$%&';
const COLORS = ['#0084FF', '#339DFF', '#66B8FF'];

interface MatrixDrop {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  chars: string[];
  spacing: number;
  fontSize: number;
}

function spawnBlast(canvas: HTMLCanvasElement, mx: number, my: number) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const drops: MatrixDrop[] = [];

  for (let i = 0; i < 20; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.3 + Math.random() * 1.5;
    const len = 3 + Math.floor(Math.random() * 6);
    const fontSize = 10 + Math.floor(Math.random() * 6);
    drops.push({
      x: mx,
      y: my,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed + 0.5, // slight downward bias like rain
      alpha: 1,
      decay: 0.004 + Math.random() * 0.006,
      chars: Array.from({ length: len }, () =>
        MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
      ),
      spacing: fontSize + 2,
      fontSize,
    });
  }

  let animId: number;

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let alive = false;
    for (const d of drops) {
      if (d.alpha <= 0) continue;
      alive = true;

      d.x += d.vx;
      d.y += d.vy;
      d.vx *= 0.98;
      d.vy *= 0.98;
      d.alpha -= d.decay;

      ctx.font = `${d.fontSize}px monospace`;

      // Scramble a random char each frame
      const scrambleIdx = Math.floor(Math.random() * d.chars.length);
      d.chars[scrambleIdx] = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];

      d.chars.forEach((ch, j) => {
        const charAlpha = d.alpha * (1 - j * 0.12);
        if (charAlpha <= 0) return;

        ctx.globalAlpha = Math.max(0, charAlpha);
        // Head char is brightest white-blue, trail fades to darker blue
        ctx.fillStyle = j === 0 ? '#ffffff' : COLORS[Math.min(j, COLORS.length - 1)];
        ctx.shadowColor = '#0084FF';
        ctx.shadowBlur = j === 0 ? 8 : 3;
        ctx.fillText(ch, d.x, d.y + j * d.spacing);
      });
    }

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    if (alive) {
      animId = requestAnimationFrame(draw);
    }
  };

  animId = requestAnimationFrame(draw);
  return () => cancelAnimationFrame(animId);
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const holdTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile || !dotRef.current || !ringRef.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    // Create persistent canvas for blast effects
    const canvas = createBlastCanvas();
    canvasRef.current = canvas;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power2.out' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power2.out' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power2.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power2.out' });

    const move = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const grow = () => gsap.to(ring, { scale: 1.5, duration: 0.3, ease: 'power2.out' });
    const shrink = () => gsap.to(ring, { scale: 1, duration: 0.3, ease: 'power2.out' });

    // Click-and-hold blast
    const onDown = () => {
      // Initial burst
      spawnBlast(canvas, mousePos.current.x, mousePos.current.y);
      // Ring pulse on cursor
      gsap.to(ring, { scale: 2, borderColor: 'rgba(0,132,255,0.8)', duration: 0.2 });

      // Continuous blasts while holding
      holdTimer.current = setInterval(() => {
        spawnBlast(canvas, mousePos.current.x, mousePos.current.y);
      }, 300);
    };

    const onUp = () => {
      if (holdTimer.current) {
        clearInterval(holdTimer.current);
        holdTimer.current = null;
      }
      gsap.to(ring, { scale: 1, borderColor: 'rgba(0,132,255,0.4)', duration: 0.3, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    const interactives = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });

    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
      newInteractives.forEach((el) => {
        el.removeEventListener('mouseenter', grow);
        el.removeEventListener('mouseleave', shrink);
        el.addEventListener('mouseenter', grow);
        el.addEventListener('mouseleave', shrink);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('resize', handleResize);
      if (holdTimer.current) clearInterval(holdTimer.current);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', grow);
        el.removeEventListener('mouseleave', shrink);
      });
      observer.disconnect();
      canvas.remove();
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: '50%',
          backgroundColor: '#0084FF',
          boxShadow: '0 0 6px rgba(0,132,255,0.8)',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          borderRadius: '50%',
          border: '1px solid rgba(0,132,255,0.4)',
          boxShadow: '0 0 8px rgba(0,132,255,0.15)',
        }}
      />
    </>
  );
}
