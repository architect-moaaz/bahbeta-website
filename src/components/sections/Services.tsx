import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { coreSolutions, itServices } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';
import { Icon } from '../ui/Icon';
import { TiltCard } from '../ui/TiltCard';
import { SpotlightCard } from '../ui/SpotlightCard';

gsap.registerPlugin(ScrollTrigger);

const allServices = [...coreSolutions, ...itServices];

export function Services() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        opacity: 0,
        y: 50,
        stagger: 0.08,
        duration: 0.6,
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
    <section id="solutions" className="py-14 md:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Our Solutions"
          title="What We Do"
          subtitle="End-to-end technology solutions tailored for the Bahrain market"
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {allServices.map((service, i) => (
            <TiltCard key={i} className="service-card">
              <SpotlightCard className="glass rounded-2xl p-6 md:p-8 hover:bg-white/[0.08] transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,132,255,0.15)] hover:border-bb-accent/20 h-full">
                <div className="mb-5 relative z-10">
                  <Icon name={service.icon} className="w-10 h-10" />
                </div>

                <h3 className="text-lg font-medium text-white mb-1 relative z-10">
                  {service.title}
                </h3>
                <p className="text-bb-accent/60 font-mono text-xs uppercase tracking-wider mb-3 relative z-10">
                  {service.subtitle}
                </p>
                <p className="text-bb-gray-400 text-sm leading-relaxed mb-4 relative z-10">
                  {service.description}
                </p>

                <ul className="space-y-1.5 relative z-10">
                  {service.features.map((feature, j) => (
                    <li
                      key={j}
                      className="text-bb-gray-500 text-xs font-mono flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-bb-accent/40 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
