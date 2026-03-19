import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teamMembers } from '../../data/content';

gsap.registerPlugin(ScrollTrigger);

export function OurTeam() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = totalWidth - viewportWidth;

    if (scrollDistance <= 0) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="our-team"
      className="relative h-screen w-full overflow-hidden"
    >
      <div className="h-full flex items-center">
        <div
          ref={trackRef}
          className="flex items-center h-full will-change-transform"
          style={{ width: 'max-content' }}
        >
          {/* ── Heading Panel ──────────────────────────── */}
          <div className="w-[90vw] sm:w-[45vw] h-full flex flex-col justify-center px-8 lg:px-16 shrink-0">
            <p className="text-bb-accent font-mono text-xs tracking-[0.25em] uppercase mb-5 glow-text">
              Our Team
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extralight text-white leading-[1.1] mb-6">
              The Minds<br />Behind<br />BahBeta
            </h2>
            <p className="text-bb-gray-500 text-sm lg:text-base max-w-sm mb-8">
              Scroll to explore our world-class expertise and the people who make it happen.
            </p>

            {/* Scroll hint */}
            <div className="flex items-center gap-3 text-bb-gray-600 font-mono text-xs uppercase tracking-widest">
              <span>Scroll</span>
              <div className="w-12 h-px bg-bb-accent/40 relative overflow-hidden">
                <div className="absolute inset-0 bg-bb-accent animate-pulse" />
              </div>
            </div>
          </div>

          {/* ── Divider ───────────────────────────────── */}
          <div className="w-px h-[60%] bg-white/10 shrink-0" />

          {/* ── Team Members ────────────────────────── */}
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="w-[85vw] sm:w-[500px] xl:w-[550px] h-full shrink-0 flex items-center border-r border-white/[0.06] group relative overflow-hidden"
            >
              {/* Background photo */}
              {member.image && (
                <div className="absolute right-4 bottom-0 w-[280px] h-[450px] pointer-events-none opacity-[0.35] group-hover:opacity-[0.45] transition-opacity duration-700">
                  <img
                    src={member.image}
                    alt=""
                    className="w-full h-full object-contain object-bottom"
                  />
                </div>
              )}
              <div className="px-8 sm:px-10 xl:px-14 py-12 w-full relative z-10">
                {/* Number + line */}
                <div className="flex items-baseline gap-5 mb-6">
                  <span className="text-6xl sm:text-7xl xl:text-8xl font-extralight text-white/[0.08] font-mono leading-none group-hover:text-bb-accent/20 transition-colors duration-700">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="h-px flex-1 bg-white/[0.06] group-hover:bg-bb-accent/20 transition-colors duration-700" />
                </div>

                {/* Info */}
                <div className="mb-5">
                  {/* Role tag */}
                  <p className="text-bb-accent/60 font-mono text-[10px] tracking-[0.3em] uppercase mb-2 group-hover:text-bb-accent transition-colors duration-500">
                    {member.role}
                  </p>
                  {/* Name */}
                  <h3 className="text-2xl xl:text-3xl font-light text-white mb-1">
                    {member.name}
                  </h3>
                  {/* Expertise */}
                  <p className="text-bb-accent/50 font-mono text-sm group-hover:text-bb-accent/80 transition-colors duration-500">
                    {member.expertise}
                  </p>
                </div>

                {/* Description */}
                <p className="text-bb-gray-500 text-sm leading-[1.8] group-hover:text-bb-gray-400 transition-colors duration-500">
                  {member.description}
                </p>
              </div>
            </div>
          ))}

          {/* End spacer */}
          <div className="w-[10vw] shrink-0" />
        </div>
      </div>
    </section>
  );
}
