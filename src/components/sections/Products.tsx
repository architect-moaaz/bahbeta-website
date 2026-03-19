import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { nfcProducts, posFeatures } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';
import { Icon } from '../ui/Icon';

gsap.registerPlugin(ScrollTrigger);

type CardType = 'metal' | 'pvc';

export function Products() {
  const [activeCard, setActiveCard] = useState<CardType>('metal');
  const cardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const product = nfcProducts.find((p) => p.type === activeCard)!;

  // Horizontal scroll driven by vertical scroll
  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const scrollDistance = track.scrollWidth - window.innerWidth;

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

  // 3D card rotation on scroll (scrub, no pin)
  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { rotateY: -15 },
        {
          rotateY: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [activeCard]);

  return (
    <section ref={sectionRef} id="products" className="relative w-full overflow-hidden">
      {/* Pinned container */}
      <div className="h-screen flex flex-col justify-center">
        {/* Heading */}
        <div className="px-4 sm:px-6 mb-10">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              eyebrow="Our Products"
              title="NFC Cards & Payment Solutions"
              subtitle="Premium products that elevate your business presence"
              className="mb-0 md:mb-0"
            />
          </div>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex gap-6 items-start will-change-transform px-4 sm:px-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
          style={{ width: 'max-content' }}
        >
          {/* ── Card 1: NFC Business Cards ──────────────── */}
          <div className="shrink-0 w-[85vw] sm:w-[70vw] lg:w-[42rem] glass rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <Icon name="credit-card" className="w-8 h-8" />
              <span className="text-white/10 font-mono text-3xl font-extralight">01</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* 3D Card Preview */}
              <div className="flex justify-center" style={{ perspective: '1000px' }}>
                <div
                  ref={cardRef}
                  className="w-full max-w-[300px] aspect-[1.6/1] rounded-2xl relative will-change-transform"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div
                    className={`absolute inset-0 rounded-2xl border p-5 flex flex-col justify-between transition-colors duration-500 ${
                      activeCard === 'metal'
                        ? 'bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-900 border-white/20'
                        : 'bg-gradient-to-br from-bb-accent/20 via-bb-accent/10 to-black border-bb-accent/30'
                    }`}
                  >
                    <div>
                      <p className="text-white/80 font-mono text-xs tracking-widest uppercase">BahBeta</p>
                      <p className="text-white text-base font-light mt-1">{product.title}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex gap-2">
                        <div className="w-7 h-5 rounded-sm bg-white/20 border border-white/10" />
                        <div className="w-4 h-4 rounded-full bg-white/15 border border-white/10" />
                      </div>
                      <p className="text-bb-accent font-mono text-sm glow-text">{product.price}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* NFC Content */}
              <div>
                <div className="flex gap-3 mb-4">
                  {(['metal', 'pvc'] as const).map((type) => (
                    <motion.button
                      key={type}
                      onClick={() => setActiveCard(type)}
                      className={`px-4 py-1.5 rounded-full font-mono text-xs transition-colors ${
                        activeCard === type
                          ? 'bg-bb-accent/20 border border-bb-accent/60 text-bb-accent glow-btn'
                          : 'border border-white/15 text-bb-gray-400 hover:border-white/30'
                      }`}
                      whileTap={{ scale: 0.97 }}
                    >
                      {type === 'metal' ? 'Metal' : 'PVC'}
                    </motion.button>
                  ))}
                </div>

                <h3 className="text-xl md:text-2xl font-light text-white mb-1">{product.title}</h3>
                <p className="text-bb-accent/60 font-mono text-[10px] uppercase tracking-wider mb-3">{product.subtitle}</p>
                <p className="text-bb-gray-400 text-sm leading-relaxed mb-4">{product.description}</p>

                <ul className="space-y-1.5">
                  {product.features.map((f, i) => (
                    <li key={i} className="text-bb-gray-500 text-xs font-mono flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-bb-accent/40 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ── Card 2: Smart POS Terminals ─────────────── */}
          <div className="shrink-0 w-[85vw] sm:w-[70vw] lg:w-[42rem] glass rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <Icon name="storefront" className="w-8 h-8" />
              <span className="text-white/10 font-mono text-3xl font-extralight">02</span>
            </div>

            <h3 className="text-xl md:text-2xl font-light text-white mb-1">{posFeatures.terminal.title}</h3>
            <p className="text-bb-accent/60 font-mono text-[10px] uppercase tracking-wider mb-3">{posFeatures.terminal.subtitle}</p>
            <p className="text-bb-gray-400 text-sm leading-relaxed mb-6">{posFeatures.terminal.description}</p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {posFeatures.terminal.features.map((f, i) => (
                <li key={i} className="text-bb-gray-500 text-xs font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-bb-accent/40 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Card 3: Payment Gateway ────────────────── */}
          <div className="shrink-0 w-[85vw] sm:w-[70vw] lg:w-[42rem] glass rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <Icon name="shield" className="w-8 h-8" />
              <span className="text-white/10 font-mono text-3xl font-extralight">03</span>
            </div>

            <h3 className="text-xl md:text-2xl font-light text-white mb-1">{posFeatures.gateway.title}</h3>
            <p className="text-bb-accent/60 font-mono text-[10px] uppercase tracking-wider mb-3">{posFeatures.gateway.subtitle}</p>
            <p className="text-bb-gray-400 text-sm leading-relaxed mb-6">{posFeatures.gateway.description}</p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {posFeatures.gateway.features.map((f, i) => (
                <li key={i} className="text-bb-gray-500 text-xs font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-bb-accent/40 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* End spacer */}
          <div className="shrink-0 w-[10vw]" />
        </div>
      </div>
    </section>
  );
}
