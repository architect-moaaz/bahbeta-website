# Vercel Analytics Setup Guide

## Overview

Vercel Analytics has been integrated into the BahBeta website to track user interactions and provide insights into website performance and user behavior.

## Installation

The following package has been installed:
```bash
npm i @vercel/analytics
```

## Implementation

### 1. Analytics Component

The Analytics component is imported and added to the main App component:

```typescript
// src/App.tsx
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <DirectImageDisplay />
      <Analytics />
    </>
  );
}
```

### 2. Custom Event Tracking

Custom analytics functions have been created in `src/utils/analytics.ts` to track important user interactions:

#### Available Tracking Functions:

- **`trackContactFormSubmit`**: Tracks when users submit the contact form
  - Captures: service selected, whether company was provided
  
- **`trackNavigationClick`**: Tracks navigation menu clicks
  - Captures: which section was clicked
  
- **`trackCTAClick`**: Tracks call-to-action button clicks
  - Captures: button name (e.g., "Start Your Project", "View Our Work")
  
- **`trackPrivacyView`**: Tracks privacy policy tab views
  - Captures: whether privacy or cookies tab was viewed
  
- **`trackMobileMenuToggle`**: Tracks mobile menu interactions
  - Captures: open/close actions
  
- **`trackServiceClick`**: Tracks service card clicks
  - Captures: which service was clicked
  
- **`trackScrollDepth`**: Tracks how far users scroll
  - Captures: scroll percentage at 25%, 50%, 75%, 100%

## Events Currently Tracked

### 1. Form Submissions
- Event: `contact_form_submit`
- Data: service type, company presence
- Trigger: Successful form submission

### 2. CTA Interactions
- Event: `cta_click`
- Data: button name
- Triggers:
  - "Start Your Project" button
  - "View Our Work" button
  - "Get Started" button
  - "Schedule Consultation" button

### 3. Privacy Policy
- Event: `privacy_policy_view`
- Data: tab viewed (privacy/cookies)
- Trigger: Tab click in "We Care For You" section

### 4. Mobile Menu
- Event: `mobile_menu_toggle`
- Data: action (open/close)
- Trigger: Hamburger menu click

### 5. Navigation
- Event: `navigation_click`
- Data: section name
- Trigger: Navigation menu item click

## Viewing Analytics

Once deployed to Vercel:

1. Go to your Vercel dashboard
2. Select the BahBeta project
3. Click on the "Analytics" tab
4. View real-time and historical data

### Available Metrics:

- **Web Vitals**: Performance metrics (LCP, FID, CLS, etc.)
- **Audience**: Visitors, page views, unique visitors
- **Pages**: Most visited pages, time on page
- **Events**: Custom events we've implemented
- **Geography**: Visitor locations
- **Devices**: Browser, OS, screen size data

## Best Practices

1. **Event Naming**: Use consistent, descriptive event names
2. **Data Collection**: Only collect necessary data
3. **Performance**: Events are non-blocking and won't affect site performance
4. **Privacy**: No personal data is tracked in events

## Testing Analytics Locally

Analytics events will only be sent in production. To test:

1. Deploy to Vercel preview branch
2. Visit the preview URL
3. Perform tracked actions
4. Check Analytics dashboard (may take a few minutes)

## Adding New Events

To add new tracking events:

1. Add a new function to `src/utils/analytics.ts`
2. Import and use in the component
3. Follow the naming convention: `track[Action]`

Example:
```typescript
export const trackNewEvent = (data: any) => {
  track('event_name', {
    property: data.value,
  });
};
```

## Privacy Compliance

- Analytics respects Do Not Track settings
- No personally identifiable information is collected
- Complies with GDPR and privacy regulations
- Users can opt out via browser settings

## Support

For issues or questions about analytics:
- Check Vercel Analytics documentation
- Review the Vercel dashboard for errors
- Contact Vercel support for platform issues