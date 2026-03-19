import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function MontFortNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const divisions = [
    'Trading',
    'Energy',
    'Infrastructure',
    'Technology',
    'Finance'
  ];

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="text-2xl font-light tracking-widest cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={isScrolled ? 'text-gray-900' : 'text-white'}>
              MONTFORT
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-12">
            <div className="relative">
              <button
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
                className={`flex items-center space-x-2 text-sm tracking-wide transition-colors ${
                  isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
                }`}
              >
                <span>DIVISIONS</span>
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ rotate: showDropdown ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                    className="absolute top-full left-0 mt-4 w-48 bg-white rounded-lg shadow-xl py-2"
                  >
                    {divisions.map((division, index) => (
                      <motion.a
                        key={division}
                        href={`#${division.toLowerCase()}`}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {division}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#about"
              className={`text-sm tracking-wide transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
              }`}
            >
              ABOUT
            </a>

            <a
              href="#sustainability"
              className={`text-sm tracking-wide transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
              }`}
            >
              SUSTAINABILITY
            </a>

            <a
              href="#contact"
              className={`text-sm tracking-wide transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
              }`}
            >
              CONTACT
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-6 h-5 focus:outline-none"
          >
            <span
              className={`absolute w-full h-0.5 transition-all duration-300 ${
                isScrolled ? 'bg-gray-900' : 'bg-white'
              } ${isMobileMenuOpen ? 'top-2 rotate-45' : 'top-0'}`}
            />
            <span
              className={`absolute w-full h-0.5 top-2 transition-all duration-300 ${
                isScrolled ? 'bg-gray-900' : 'bg-white'
              } ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <span
              className={`absolute w-full h-0.5 transition-all duration-300 ${
                isScrolled ? 'bg-gray-900' : 'bg-white'
              } ${isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white shadow-lg"
          >
            <div className="container mx-auto px-6 py-4">
              <a
                href="#divisions"
                className="block py-3 text-gray-700 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                DIVISIONS
              </a>
              <a
                href="#about"
                className="block py-3 text-gray-700 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ABOUT
              </a>
              <a
                href="#sustainability"
                className="block py-3 text-gray-700 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                SUSTAINABILITY
              </a>
              <a
                href="#contact"
                className="block py-3 text-gray-700 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CONTACT
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}