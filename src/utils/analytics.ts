import { track } from '@vercel/analytics';

// Custom event tracking functions for important user interactions

export const trackContactFormSubmit = (formData: {
  service?: string;
  company?: string;
}) => {
  track('contact_form_submit', {
    service: formData.service || 'not_specified',
    has_company: !!formData.company,
  });
};

export const trackServiceClick = (serviceName: string) => {
  track('service_click', {
    service_name: serviceName,
  });
};

export const trackNavigationClick = (section: string) => {
  track('navigation_click', {
    section: section.toLowerCase(),
  });
};

export const trackCTAClick = (buttonName: string) => {
  track('cta_click', {
    button_name: buttonName,
  });
};

export const trackPrivacyView = (tab: 'privacy' | 'cookies') => {
  track('privacy_policy_view', {
    tab_viewed: tab,
  });
};

export const trackMobileMenuToggle = (isOpen: boolean) => {
  track('mobile_menu_toggle', {
    action: isOpen ? 'open' : 'close',
  });
};

export const trackScrollDepth = (percentage: number) => {
  // Only track at certain thresholds to avoid too many events
  const thresholds = [25, 50, 75, 100];
  const nearest = thresholds.find(t => percentage >= t && percentage < t + 25);
  
  if (nearest && percentage >= nearest && percentage < nearest + 1) {
    track('scroll_depth', {
      depth_percentage: nearest,
    });
  }
};

// Page view tracking (automatically handled by Vercel Analytics)
// but you can add custom page view events if needed
export const trackPageView = (pageName: string) => {
  track('page_view', {
    page_name: pageName,
  });
};