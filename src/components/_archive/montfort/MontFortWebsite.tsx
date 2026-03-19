import { useState, useEffect } from 'react';
import { MontFortNav } from './MontFortNav';
import { MontFortHero } from './MontFortHero';
import { MontFortDivisions } from './MontFortDivisions';
import { MontFortGlobalOffices } from './MontFortGlobalOffices';
import { MontFortSustainability } from './MontFortSustainability';
import { MontFortFooter } from './MontFortFooter';
import { motion, AnimatePresence } from 'framer-motion';

export function MontFortWebsite() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate page load
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 bg-white z-50 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-4xl font-light tracking-widest"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              MONTFORT
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <MontFortNav />
      <MontFortHero />
      <MontFortDivisions />
      <MontFortGlobalOffices />
      <MontFortSustainability />
      <MontFortFooter />
    </div>
  );
}