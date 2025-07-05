import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function MontFortDivisions() {
  const [activeDiv, setActiveDiv] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.3 });

  const divisions = [
    {
      id: 'trading',
      title: 'Trading',
      description: 'Global commodity trading operations across multiple sectors',
      details: 'Leading international trading operations in energy, metals, and agricultural commodities with strategic partnerships worldwide.',
      icon: '📈',
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 'energy',
      title: 'Energy',
      description: 'Renewable energy investments and sustainable solutions',
      details: 'Developing and investing in renewable energy projects, including solar, wind, and innovative clean technology solutions.',
      icon: '⚡',
      color: 'from-green-600 to-green-800'
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure',
      description: 'Large-scale infrastructure development and investment',
      details: 'Strategic infrastructure investments in transportation, utilities, and urban development projects across emerging markets.',
      icon: '🏗️',
      color: 'from-purple-600 to-purple-800'
    },
    {
      id: 'technology',
      title: 'Technology',
      description: 'Innovation-driven technology investments and ventures',
      details: 'Investing in cutting-edge technology companies and digital transformation initiatives across various industries.',
      icon: '💻',
      color: 'from-indigo-600 to-indigo-800'
    },
    {
      id: 'finance',
      title: 'Finance',
      description: 'Financial services and investment management',
      details: 'Comprehensive financial services including investment management, advisory services, and capital market operations.',
      icon: '💰',
      color: 'from-amber-600 to-amber-800'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-24 bg-white" id="divisions">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="text-5xl lg:text-6xl font-light text-gray-900 tracking-wide mb-6">
            OUR DIVISIONS
          </h2>
          <div className="w-24 h-px bg-gray-400 mx-auto mb-8" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Five strategic business divisions driving growth and innovation across global markets
          </p>
        </motion.div>

        {/* Divisions grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {divisions.map((division, index) => (
            <motion.div
              key={division.id}
              className={`relative group cursor-pointer ${
                index === 2 ? 'lg:col-span-3 lg:mx-auto lg:max-w-md' : ''
              }`}
              variants={itemVariants}
              onMouseEnter={() => setActiveDiv(division.id)}
              onMouseLeave={() => setActiveDiv(null)}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${division.color} opacity-0 group-hover:opacity-90 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative p-8 z-10">
                  {/* Icon */}
                  <motion.div
                    className="text-4xl mb-6 transition-transform duration-300 group-hover:scale-110"
                    animate={activeDiv === division.id ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {division.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-light text-gray-900 group-hover:text-white transition-colors duration-300 mb-4 tracking-wide">
                    {division.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300 mb-6 leading-relaxed">
                    {division.description}
                  </p>

                  {/* Expandable details */}
                  <motion.div
                    className="overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={
                      activeDiv === division.id
                        ? { height: 'auto', opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    <div className="border-t border-gray-300 group-hover:border-white/20 pt-4 mt-4">
                      <p className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-300 leading-relaxed">
                        {division.details}
                      </p>
                    </div>
                  </motion.div>

                  {/* Learn more link */}
                  <motion.div
                    className="flex items-center mt-6 text-sm text-gray-500 group-hover:text-white transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span className="tracking-wide">LEARN MORE</span>
                    <motion.svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      animate={activeDiv === division.id ? { x: [0, 5, 0] } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </motion.div>
                </div>

                {/* Subtle border animation */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent"
                  animate={
                    activeDiv === division.id
                      ? { borderColor: 'rgba(255,255,255,0.3)' }
                      : { borderColor: 'transparent' }
                  }
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            className="inline-flex items-center px-8 py-4 border border-gray-300 text-gray-700 font-light tracking-wide hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>VIEW ALL DIVISIONS</span>
            <svg className="w-5 h-5 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}