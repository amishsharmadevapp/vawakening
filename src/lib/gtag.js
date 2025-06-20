// Google Analytics 4 (GA4) helper functions
/** @type {string} */
export const GA_MEASUREMENT_ID = 'G-4CYW7KGPBQ';

/**
 * Log a pageview
 * @param {string} url
 */
export function pageview(url) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}

/**
 * Log specific events
 * @param {{ action: string, params: object }} param0
 */
export function event({ action, params }) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);
  }
}

// Dummy export to ensure this is a module
export default {}; 