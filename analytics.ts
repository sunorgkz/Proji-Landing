import * as amplitude from '@amplitude/analytics-browser';

const API_KEY = import.meta.env.VITE_AMPLITUDE_API_KEY;

let initialized = false;

const CONSENT_KEY = 'proji.cookie-consent';

export const getConsent = (): 'all' | 'necessary' | null => {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === 'all' || v === 'necessary' ? v : null;
  } catch {
    return null;
  }
};

export const setConsent = (value: 'all' | 'necessary') => {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable */
  }
  if (value === 'all') initAnalytics();
};

export const initAnalytics = () => {
  if (!API_KEY || initialized || getConsent() !== 'all') return;

  amplitude.init(API_KEY, undefined, {
    defaultTracking: {
      sessions: true,
      pageViews: true,
      formInteractions: true,
      fileDownloads: true,
    },
  });

  initialized = true;
};

export const trackEvent = (eventName: string, eventProperties?: Record<string, any>) => {
  if (!API_KEY || !initialized) return;
  amplitude.track(eventName, eventProperties);
};

