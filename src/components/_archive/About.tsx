import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { number: '33', label: 'Islands' },
    { number: '1.5M', label: 'Population' },
    { number: '780', label: 'km² Area' },
    { number: '5000', label: 'Years of History' },
  ];

  return (
    <section id="about" className="relative py-24 bg-gradient-to-b from-transparent to-gray-900/20">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Discover Bahrain
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            An archipelago of natural beauty, rich heritage, and modern innovation
            in the heart of the Arabian Gulf.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-2">
                {stat.number}
              </div>
              <div className="text-white/60 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-white mb-4">Heritage</h3>
            <p className="text-white/60">
              Home to one of the oldest civilizations, with archaeological sites
              dating back to the Dilmun era.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-white mb-4">Innovation</h3>
            <p className="text-white/60">
              A thriving hub for finance, technology, and sustainable development
              in the Middle East.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-white mb-4">Culture</h3>
            <p className="text-white/60">
              A unique blend of traditional Arabian culture and cosmopolitan
              lifestyle.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}