import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackPrivacyView } from '../../utils/analytics';

export function PrivacySection() {
  const [activeTab, setActiveTab] = useState<'privacy' | 'cookies'>('privacy');

  const handleTabChange = (tab: 'privacy' | 'cookies') => {
    setActiveTab(tab);
    trackPrivacyView(tab);
  };

  return (
    <section id="privacy" className="py-14 md:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-section text-white mb-4">Legal & Privacy</h2>
          <p className="text-subtitle-lg text-bb-gray-400">Transparency and trust</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-3 mb-10">
          {(['privacy', 'cookies'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-bb-gray-400 hover:bg-white/10'
              }`}
            >
              {tab === 'privacy' ? 'Privacy Policy' : 'Cookies Policy'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="glass rounded-3xl p-6 sm:p-8 md:p-10">
          <AnimatePresence mode="wait">
            {activeTab === 'privacy' ? (
              <motion.div
                key="privacy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="prose prose-invert max-w-none"
              >
                <div className="space-y-6 text-bb-gray-400 text-sm leading-relaxed">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Privacy Policy</h3>
                    <p>Last updated: January 2025</p>
                    <p>Bahbeta W.L.L. ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-white mb-2">Information We Collect</h4>
                    <p>We may collect personal information that you voluntarily provide when you fill out our contact form, including your name, email address, phone number, company name, and message content. We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and browsing behavior through cookies and similar technologies.</p>
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-white mb-2">How We Use Your Information</h4>
                    <p>We use the information we collect to respond to your inquiries and provide customer support, send you information about our services, improve our website and user experience, comply with legal obligations, and protect against unauthorized access.</p>
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-white mb-2">Data Protection</h4>
                    <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.</p>
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-white mb-2">Your Rights</h4>
                    <p>You have the right to access, correct, or delete your personal information. You may also object to or restrict the processing of your data. To exercise these rights, please contact us at support@bahbeta.com.</p>
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-white mb-2">Contact Us</h4>
                    <p>If you have questions about this Privacy Policy, please contact us at support@bahbeta.com or call +973 3316 5647.</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="cookies"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="prose prose-invert max-w-none"
              >
                <div className="space-y-6 text-bb-gray-400 text-sm leading-relaxed">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Cookies Policy</h3>
                    <p>Last updated: January 2025</p>
                    <p>This Cookies Policy explains how Bahbeta W.L.L. uses cookies and similar technologies on our website.</p>
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-white mb-2">What Are Cookies</h4>
                    <p>Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the website owners.</p>
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-white mb-2">How We Use Cookies</h4>
                    <p>We use essential cookies required for the website to function properly, analytics cookies (via Vercel Analytics) to understand how visitors interact with our website, and functional cookies to remember your preferences and settings.</p>
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-white mb-2">Third-Party Cookies</h4>
                    <p>We use Vercel Analytics which may set cookies to help us analyze website traffic and usage patterns. These cookies collect information anonymously and help us improve our website.</p>
                  </div>

                  <div>
                    <h4 className="text-base font-medium text-white mb-2">Managing Cookies</h4>
                    <p>You can control and manage cookies through your browser settings. Please note that removing or blocking cookies may impact your user experience and some features may no longer be available.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
