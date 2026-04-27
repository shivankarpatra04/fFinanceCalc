import { useEffect } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "wouter";

/**
 * Google Analytics component to handle initialization and automatic page view tracking.
 * Place this once at the root of your application (inside the Router).
 */
export function GoogleAnalytics() {
  const [location] = useLocation();
  const gaId = import.meta.env.VITE_GA_ID || import.meta.env.VITE_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (gaId) {
      // Initialize GA4
      ReactGA.initialize(gaId);
      
      // Track initial page view
      ReactGA.send({ 
        hitType: "pageview", 
        page: window.location.pathname + window.location.search 
      });
    }
  }, [gaId]);

  useEffect(() => {
    if (gaId) {
      // Track page views on route changes
      ReactGA.send({ 
        hitType: "pageview", 
        page: location + window.location.search 
      });
    }
  }, [location, gaId]);

  return null;
}

/**
 * Utility to track custom events professionally.
 * @param category - Typically the object that was interacted with (e.g. 'Button')
 * @param action - The type of interaction (e.g. 'Click')
 * @param label - Useful for categorizing events (e.g. 'CTA / Get Started')
 * @param value - A numeric value associated with the event
 */
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  if (import.meta.env.VITE_GA_ID || import.meta.env.VITE_GA_MEASUREMENT_ID) {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
  }
};
