import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { differentiators } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';
import { Icon } from '../ui/Icon';
import { TiltCard } from '../ui/TiltCard';
import { SpotlightCard } from '../ui/SpotlightCard';

gsap.registerPlugin(ScrollTrigger);

export function WhyChooseBahbeta() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.diff-card', {
        opacity: 0,
        y: 60,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why-choose" className="py-14 md:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Why Bahbeta"
          title="Built Different?"
          subtitle="What sets us apart from the competition"
          largeTitle
        />

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {differentiators.map((d, i) => (
            <TiltCard key={i} className="diff-card">
              <SpotlightCard className="glass rounded-2xl p-6 md:p-8 hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,132,255,0.15)] hover:border-bb-accent/20 h-full">
                <div className="hidden md:block mb-5 relative z-10"><Icon name={d.icon} className="w-10 h-10" /></div>
                <h3 className="text-xl font-medium text-white mb-3 relative z-10">{d.title}</h3>
                <p className="text-bb-gray-400 text-sm leading-relaxed relative z-10">{d.description}</p>
              </SpotlightCard>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
