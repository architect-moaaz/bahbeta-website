import { motion } from 'framer-motion';
import { companyInfo } from '../../data/content';
import { trackCTAClick } from '../../utils/analytics';

interface ContactCTAProps {
  onContactClick: () => void;
}

export function ContactCTA({ onContactClick }: ContactCTAProps) {
  return (
    <section id="contact" className="py-14 md:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-section text-white mb-6 md:mb-8">
            Ready to Transform Your Business?
          </h2>
          <p className="text-subtitle-lg text-bb-gray-400 mb-12 max-w-2xl mx-auto">
            Let's build something extraordinary together. Get in touch and
            we'll get back to you within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16">
            <motion.button
              onClick={() => {
                trackCTAClick('Schedule Consultation');
                onContactClick();
              }}
              className="px-10 py-4 bg-bb-accent hover:bg-bb-accent-light text-white rounded-full font-medium text-lg transition-colors"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule Consultation
            </motion.button>
            <motion.a
              href={`mailto:${companyInfo.email}`}
              className="px-10 py-4 border border-white/30 text-white rounded-full font-medium text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Email Us Directly
            </motion.a>
          </div>

          {/* Contact info */}
          <div className="flex flex-col items-center justify-center gap-4 text-bb-gray-500 text-sm">
            <a
              href={`mailto:${companyInfo.email}`}
              className="hover:text-white transition-colors"
            >
              {companyInfo.email}
            </a>
            <div className="flex items-center gap-2">
              <a
                href={`tel:${companyInfo.phone}`}
                className="hover:text-white transition-colors"
              >
                {companyInfo.phone}
              </a>
              {companyInfo.phoneSecondary && (
                <>
                  <span className="text-bb-gray-600">|</span>
                  <a
                    href={`tel:${companyInfo.phoneSecondary}`}
                    className="hover:text-white transition-colors"
                  >
                    {companyInfo.phoneSecondary}
                  </a>
                </>
              )}
            </div>
            <span>{companyInfo.city}</span>
          </div>
        </div>
    </section>
  );
}
