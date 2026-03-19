import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function MontFortHero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrolled / windowHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-black">
      {/* Background video/image placeholder */}
      <motion.div 
        className="absolute inset-0"
        style={{ opacity, scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40" />
        
        {/* Hero background - using gradient as placeholder for video */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          {/* Animated overlay pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(120,119,198,0.2),transparent_50%)]" />
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative h-full flex items-center justify-center">
        <motion.div 
          className="text-center px-6"
          style={{ y }}
        >
          {/* Main title with split animation */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-light text-white tracking-wider"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              MONTFORT
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <p className="text-xl md:text-2xl text-white/80 font-light tracking-widest">
              GLOBAL INVESTMENT GROUP
            </p>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            className="w-32 h-px bg-white/50 mx-auto mt-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        animate={{ 
          opacity: scrollProgress > 0.1 ? 0 : [0.4, 1, 0.4],
          y: scrollProgress > 0.1 ? 20 : [0, 10, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: scrollProgress > 0.1 ? 0 : Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="flex flex-col items-center text-white/60">
          <span className="text-xs tracking-widest mb-3">SCROLL TO EXPLORE</span>
          <div className="w-6 h-10 border border-white/30 rounded-full relative">
            <motion.div
              className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-white/60 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>

      {/* Parallax elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border border-white/10 rounded-full"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 border border-white/10 rounded-full"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-16 h-16 border border-white/5 rounded-full"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
      />
    </div>
  );
}