import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroContent } from '../../data/content';
import { trackCTAClick } from '../../utils/analytics';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { smoothScrollTo } from '../../utils/smoothScroll';
import { MatrixRain } from '../ui/MatrixRain';
import { TypewriterText } from '../ui/TypewriterText';
import { CountUp } from '../ui/CountUp';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onContactClick: () => void;
  startContent?: boolean;
  onHeroComplete?: () => void;
}

export function HeroSection({ onContactClick, startContent = true, onHeroComplete }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const perspectiveRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Sequence: title → subtitle → description → CTA + stats
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  const onTitleDone = useCallback(() => setShowSubtitle(true), []);
  const onSubtitleDone = useCallback(() => setShowDescription(true), []);
  const onDescriptionDone = useCallback(() => {
    setShowCTA(true);
    onHeroComplete?.();
  }, [onHeroComplete]);

  // 3D tilt parallax on mouse move (desktop only)
  useEffect(() => {
    if (isMobile || !perspectiveRef.current) return;

    const container = perspectiveRef.current;
    const xTo = gsap.quickTo(container, 'rotateY', { duration: 0.6, ease: 'power2.out' });
    const yTo = gsap.quickTo(container, 'rotateX', { duration: 0.6, ease: 'power2.out' });

    const handleMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      xTo(nx * 2.5);
      yTo(-ny * 2.5);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isMobile]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Fade content out as user scrolls past hero — no pinning
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -40,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full"
    >
      {/* Matrix Rain background — higher opacity for hero, interactive */}
      <div className="absolute inset-0 z-[3]">
        <MatrixRain opacity={0.3} className="absolute inset-0" interactive />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[4] bg-gradient-to-b from-black/40 via-black/20 to-black/60 opacity-40 pointer-events-none" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6"
      >
        <div
          ref={perspectiveRef}
          className="text-center max-w-6xl mx-auto"
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
          {/* Title — typewriter with scramble, starts after intro video */}
          <h1
            className="text-hero text-white mb-3 leading-tight tracking-tight"
            style={{ transform: 'translateZ(40px)' }}
          >
            {startContent && (
              <TypewriterText
                text={heroContent.title}
                delay={300}
                speed={35}
                scramble
                onComplete={onTitleDone}
              />
            )}
          </h1>

          {/* Subtitle — types after title finishes */}
          <h2
            className="text-sm sm:text-base text-bb-gray-300 mb-3 tracking-wide max-w-3xl mx-auto font-mono min-h-[1.2em]"
            style={{ transform: 'translateZ(20px)' }}
          >
            {showSubtitle && (
              <TypewriterText
                text={heroContent.subtitle}
                speed={30}
                scramble
                onComplete={onSubtitleDone}
              />
            )}
          </h2>

          {/* Description — types after subtitle finishes */}
          <p className="text-xs sm:text-sm text-bb-gray-400 mb-4 max-w-2xl mx-auto min-h-[1.5em]">
            {showDescription && (
              <TypewriterText
                text={heroContent.description}
                speed={15}
                scramble={false}
                onComplete={onDescriptionDone}
              />
            )}
          </p>

          {/* CTA — fades in after all text is typed */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={showCTA ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.button
              onClick={() => {
                trackCTAClick('Start Your Project');
                onContactClick();
              }}
              className="px-8 py-3 bg-bb-accent/20 border border-bb-accent/60 text-bb-accent rounded-full font-mono font-medium text-sm glow-btn transition-colors hover:bg-bb-accent/30"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Project
            </motion.button>
            <motion.button
              onClick={() => {
                trackCTAClick('View Our Work');
                smoothScrollTo('solutions');
              }}
              className="px-8 py-3 border border-bb-accent/30 text-white rounded-full font-mono font-medium text-sm hover:bg-bb-accent/10 hover:border-bb-accent/50 transition-colors"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View Our Work
            </motion.button>
          </motion.div>

          {/* Stats — CountUp */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={showCTA ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            {heroContent.stats.map((stat, i) => (
              <CountUp key={i} value={stat.number} label={stat.label} />
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}
