import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Analytics } from '@vercel/analytics/react';
import { motion, AnimatePresence } from 'framer-motion';

// Layout
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/layout/ScrollProgress';

// Sections
import { HeroSection } from './components/sections/HeroSection';
import { Services } from './components/sections/Services';
import { Products } from './components/sections/Products';
import { WhyChooseBahbeta } from './components/sections/WhyChooseBahbeta';
import { OurTeam } from './components/sections/OurTeam';
import { TestimonialsCarousel } from './components/sections/TestimonialsCarousel';
import { ContactCTA } from './components/sections/ContactCTA';
import { PrivacySection } from './components/sections/PrivacySection';

// UI
import { ContactFormModal } from './components/ui/ContactFormModal';
import { MatrixRain } from './components/ui/MatrixRain';
import { CustomCursor } from './components/ui/CustomCursor';
import { SectionDots } from './components/ui/SectionDots';
import { MarqueeTicker } from './components/ui/MarqueeTicker';

// Utils
import { setLenisInstance } from './utils/smoothScroll';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

// Phase 1: Terminal boot text
function TerminalLoading({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);

  const bootSequence = [
    '> INITIALIZING BAHBETA SYSTEMS...',
    '> LOADING MODULES...',
    '> ESTABLISHING SECURE CONNECTION...',
    '> ACCESS GRANTED',
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const delays = [0, 200, 400, 600];

    delays.forEach((delay, i) => {
      timers.push(
        setTimeout(() => {
          setLines((prev) => [...prev, bootSequence[i]]);
        }, delay)
      );
    });

    // Signal complete after last line + short pause
    timers.push(setTimeout(onComplete, 1000));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="text-left max-w-md mx-auto px-6">
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`font-mono text-sm mb-1 ${
            line.includes('ACCESS GRANTED')
              ? 'text-bb-accent glow-text font-bold'
              : 'text-bb-accent/70'
          }`}
        >
          {line}
        </motion.p>
      ))}
      <span className="inline-block w-2 h-4 bg-bb-accent animate-blink ml-1" />
    </div>
  );
}

// Phase 2: Intro video
function IntroVideo({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      // Autoplay blocked — skip video
      onComplete();
    });
  }, []);

  return (
    <video
      ref={videoRef}
      src="/intro.mp4"
      muted
      playsInline
      onEnded={onComplete}
      onError={onComplete}
      className="w-full h-full object-contain"
    />
  );
}

type LoadPhase = 'terminal' | 'video' | 'ready';

// Section IDs for clip-path reveals (skip hero — it has its own animation)
const REVEAL_SECTIONS = ['solutions', 'products', 'why-choose', 'our-team', 'testimonials', 'contact', 'privacy'];

function App() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [phase, setPhase] = useState<LoadPhase>('terminal');
  const mainRef = useRef<HTMLElement>(null);

  // Lenis smooth scroll — synced with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: false,
    });

    setLenisInstance(lenis);

    // Sync Lenis scroll events → GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP ticker for frame-perfect sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Alternating bg tint on sections
  useEffect(() => {
    if (phase !== 'ready') return;

    const timer = setTimeout(() => {
      REVEAL_SECTIONS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;

        // Alternating faint blue tint on even sections
        if (i % 2 === 0) {
          gsap.fromTo(
            el,
            { backgroundColor: 'rgba(0,132,255,0)' },
            {
              backgroundColor: 'rgba(0,132,255,0.02)',
              scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                end: 'top 30%',
                scrub: true,
              },
            }
          );
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <>
      {/* Phase 1: Terminal boot */}
      <AnimatePresence>
        {phase === 'terminal' && (
          <motion.div
            key="terminal"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            <MatrixRain opacity={0.1} className="fixed inset-0 z-0" />
            <div className="relative z-10">
              <TerminalLoading onComplete={() => setPhase('video')} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Intro video with rain overlay */}
      <AnimatePresence>
        {phase === 'video' && (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            <IntroVideo onComplete={() => setPhase('ready')} />
            <MatrixRain opacity={0.15} className="fixed inset-0 z-[1]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Global Matrix Rain Background */}
      <MatrixRain opacity={0.15} className="fixed inset-0 z-0" />

      <div className="relative z-10 bg-transparent text-white">
        {/* Scanlines & CRT inside content — pointer-events-none so they don't block clicks */}
        <div className="fixed inset-0 z-[1] scanlines-overlay pointer-events-none" />
        <div className="fixed inset-0 z-[2] crt-curve pointer-events-none" />
        <ScrollProgress />
        <Navbar onContactClick={() => setShowContactForm(true)} />

        {/* Section Dots */}
        <SectionDots />

        <main ref={mainRef}>
          <HeroSection
            onContactClick={() => setShowContactForm(true)}
            startContent={phase === 'ready'}
          />
          <Services />
          <Products />
          <WhyChooseBahbeta />
          {/* Marquee Ticker between WhyChoose and OurTeam */}
          <MarqueeTicker />
          <OurTeam />
          <TestimonialsCarousel />
          <ContactCTA onContactClick={() => setShowContactForm(true)} />
          <PrivacySection />
        </main>

        <Footer onContactClick={() => setShowContactForm(true)} />
      </div>

      {/* Overlays */}
      <ContactFormModal
        isOpen={showContactForm}
        onClose={() => setShowContactForm(false)}
      />

      <Analytics />
    </>
  );
}

export default App;
