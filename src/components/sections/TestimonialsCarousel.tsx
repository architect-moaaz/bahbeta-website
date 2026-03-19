import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials, industries } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';
import { Icon } from '../ui/Icon';

const carouselVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 80 : -80,
    rotateY: direction > 0 ? 5 : -5,
    scale: 0.95,
  }),
  center: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -80 : 80,
    rotateY: direction > 0 ? -5 : 5,
    scale: 0.95,
  }),
};

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => {
    setDirection(1);
    setCurrent((p) => (p + 1) % testimonials.length);
  };
  const prev = () => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, []);

  // Double industries for seamless marquee
  const industryItems = [...industries, ...industries];

  return (
    <section id="testimonials" className="py-14 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Testimonials"
            title="What Our Clients Say"
            subtitle="Trusted by industry leaders across Bahrain"
          />

          {/* Carousel with perspective */}
          <div className="relative" style={{ perspective: '1200px' }}>
            <div className="overflow-hidden rounded-3xl">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={carouselVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                  className="w-full"
                >
                  <div className="glass-strong rounded-3xl p-8 sm:p-10 md:p-14 max-w-4xl mx-auto">
                    <div className="text-center">
                      <div className="mb-6">
                        <h4 className="text-xl md:text-2xl font-medium text-white mb-1">
                          {testimonials[current].service}
                        </h4>
                        <p className="text-bb-gray-400">
                          {testimonials[current].company}
                        </p>
                      </div>

                      <blockquote className="text-lg md:text-xl text-bb-gray-300 mb-8 leading-relaxed font-light italic max-w-3xl mx-auto">
                        "{testimonials[current].testimonial}"
                      </blockquote>

                      <div className="border-t border-white/10 pt-6">
                        <p className="text-white font-medium">
                          — {testimonials[current].author}
                        </p>
                        <p className="text-bb-gray-500 text-sm mt-1">
                          {testimonials[current].organization}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Nav Arrows */}
            <motion.button
              onClick={prev}
              className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              onClick={next}
              className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 gap-2.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Industry Cloud / Marquee */}
          <div className="mt-16 overflow-hidden border-t border-bb-accent/10 pt-8">
            <p className="text-center text-bb-gray-500 font-mono text-xs uppercase tracking-widest mb-6">
              Industries We Serve
            </p>
            <div className="marquee-track">
              {industryItems.map((ind, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-6 text-sm font-mono text-bb-gray-500 whitespace-nowrap"
                >
                  <Icon name={ind.icon} className="w-4 h-4 opacity-40" />
                  {ind.title}
                  <span className="ml-4 text-bb-accent/20">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
}
