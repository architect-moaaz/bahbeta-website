import { useState, useEffect } from 'react';
import { sectionIds } from '../data/navigation';

const SECTION_ORDER = Object.values(sectionIds);

export function useActiveSection() {
  const [active, setActive] = useState<string>('hero');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleSections = new Map<string, number>();

    SECTION_ORDER.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }

          // Pick the section with the highest ratio
          let best = '';
          let bestRatio = 0;
          visibleSections.forEach((ratio, sectionId) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              best = sectionId;
            }
          });
          if (best) setActive(best);
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1] }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}
