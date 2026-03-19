import Lenis from 'lenis';

let lenis: Lenis | null = null;

export function setLenisInstance(instance: Lenis) {
  lenis = instance;
}

export function getLenisInstance() {
  return lenis;
}

/**
 * Smooth-scroll to a section using Lenis.
 * Falls back to native scrollIntoView if Lenis isn't ready.
 */
export function smoothScrollTo(target: string | HTMLElement, offset = -80) {
  if (lenis) {
    lenis.scrollTo(target instanceof HTMLElement ? target : `#${target}`, { offset });
  } else {
    const el = typeof target === 'string' ? document.getElementById(target) : target;
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}
