import { useActiveSection } from '../../hooks/useActiveSection';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { smoothScrollTo } from '../../utils/smoothScroll';
import { sectionIds } from '../../data/navigation';

const DOTS = Object.entries(sectionIds).filter(
  ([key]) => !['privacy'].includes(key)
);

export function SectionDots() {
  const active = useActiveSection();
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
      {DOTS.map(([, id]) => (
        <button
          key={id}
          onClick={() => smoothScrollTo(id)}
          className="group relative w-3 h-3 flex items-center justify-center"
          aria-label={`Scroll to ${id}`}
        >
          <span
            className={`block rounded-full transition-all duration-300 ${
              active === id
                ? 'w-3 h-3 bg-bb-accent shadow-[0_0_8px_rgba(0,132,255,0.8)]'
                : 'w-2 h-2 bg-white/20 group-hover:bg-white/40'
            }`}
          />
        </button>
      ))}
    </div>
  );
}
