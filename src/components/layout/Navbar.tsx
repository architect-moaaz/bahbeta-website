import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '../../data/navigation';
import { trackNavigationClick, trackMobileMenuToggle } from '../../utils/analytics';
import { smoothScrollTo } from '../../utils/smoothScroll';
import { useActiveSection } from '../../hooks/useActiveSection';

interface NavbarProps {
  onContactClick: () => void;
}

export function Navbar({ onContactClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection();

  const scrollTo = (sectionId: string) => {
    trackNavigationClick(sectionId);
    smoothScrollTo(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 w-full z-[55] backdrop-blur-xl bg-black/80 border-b border-bb-accent/10 scanlines"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => scrollTo('hero')}
          >
            <img
              src="/bahbeta-logo.png"
              alt="BahBeta"
              className="h-[60px] sm:h-[72px] w-auto"
            />
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, i) => (
              <motion.button
                key={item.sectionId}
                onClick={() => scrollTo(item.sectionId)}
                className={`relative text-sm font-mono font-normal tracking-wide transition-colors ${
                  activeSection === item.sectionId
                    ? 'text-bb-accent glow-text'
                    : 'text-white/80 hover:text-bb-accent hover:glow-text'
                }`}
                whileHover={{ y: -1 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.08 }}
              >
                {item.label}
                {activeSection === item.sectionId && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-bb-accent rounded-full"
                    style={{
                      boxShadow: '0 0 8px rgba(0,132,255,0.6), 0 0 16px rgba(0,132,255,0.3)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Desktop CTA */}
          <motion.button
            onClick={onContactClick}
            className="hidden md:block px-5 py-2 bg-transparent border border-bb-accent/60 text-bb-accent rounded-full font-mono font-medium text-sm glow-btn transition-colors hover:bg-bb-accent/10"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.2 }}
          >
            Get Started
          </motion.button>

          {/* Mobile hamburger */}
          <motion.button
            onClick={() => {
              const next = !mobileMenuOpen;
              setMobileMenuOpen(next);
              trackMobileMenuToggle(next);
            }}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl"
            >
              <div className="px-4 py-6 space-y-1">
                {navItems.map((item) => (
                  <motion.button
                    key={item.sectionId}
                    onClick={() => scrollTo(item.sectionId)}
                    className={`block w-full text-left font-mono text-lg py-3 transition-colors ${
                      activeSection === item.sectionId
                        ? 'text-bb-accent glow-text'
                        : 'text-white/90 hover:text-bb-accent'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => {
                    onContactClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full mt-4 px-6 py-3 bg-transparent border border-bb-accent/60 text-bb-accent rounded-full font-mono font-medium text-base glow-btn"
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
