import { companyInfo } from '../../data/content';
import { navItems } from '../../data/navigation';
import { trackNavigationClick } from '../../utils/analytics';
import { smoothScrollTo } from '../../utils/smoothScroll';

interface FooterProps {
  onContactClick: () => void;
}

export function Footer({ onContactClick }: FooterProps) {
  const scrollTo = (id: string) => {
    trackNavigationClick(id);
    smoothScrollTo(id);
  };

  return (
    <footer className="relative border-t border-bb-accent/10 bg-bb-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src="/bahbeta-logo.png"
              alt="BahBeta"
              className="h-[72px] w-auto mb-4"
            />
            <p className="text-bb-gray-400 text-sm leading-relaxed mb-6">
              Bahbeta, headquartered in Bahrain, delivers AI, ML, LLM, IT development, FinTech, and enterprise automation, serving clients globally across GCC, Africa, and beyond.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.sectionId}>
                  <button
                    onClick={() => scrollTo(item.sectionId)}
                    className="font-mono text-bb-gray-400 hover:text-bb-accent text-sm transition-colors hover:glow-text"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => scrollTo('privacy')}
                  className="font-mono text-bb-gray-400 hover:text-bb-accent text-sm transition-colors hover:glow-text"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-bb-gray-400 text-sm">
              <li>
                <a href={`mailto:${companyInfo.email}`} className="hover:text-white transition-colors">
                  {companyInfo.email}
                </a>
              </li>
              <li>
                <a href={`tel:${companyInfo.phone}`} className="hover:text-white transition-colors">
                  {companyInfo.phone}
                </a>
                {companyInfo.phoneSecondary && (
                  <>
                    {' | '}
                    <a href={`tel:${companyInfo.phoneSecondary}`} className="hover:text-white transition-colors">
                      {companyInfo.phoneSecondary}
                    </a>
                  </>
                )}
              </li>
              <li>{companyInfo.address}</li>
              <li>{companyInfo.city}</li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Get Started</h4>
            <p className="text-bb-gray-400 text-sm mb-6">
              Ready to transform your business with technology?
            </p>
            <button
              onClick={onContactClick}
              className="px-6 py-2.5 bg-transparent border border-bb-accent/60 text-bb-accent rounded-full text-sm font-mono font-medium glow-btn transition-colors hover:bg-bb-accent/10"
            >
              Schedule Consultation
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-bb-accent/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-bb-gray-500 text-xs">
            &copy; {new Date().getFullYear()} {companyInfo.name} All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a
              href={companyInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-bb-gray-500 hover:text-bb-accent transition-colors text-xs hover:glow-text"
            >
              LinkedIn
            </a>
            <a
              href={companyInfo.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-bb-gray-500 hover:text-bb-accent transition-colors text-xs hover:glow-text"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
