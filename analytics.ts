import * as amplitude from '@amplitude/analytics-browser';

const API_KEY = import.meta.env.VITE_AMPLITUDE_API_KEY;

let initialized = false;

export const initAnalytics = () => {
  if (!API_KEY || initialized) return;

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
  if (!API_KEY) return;
  amplitude.track(eventName, eventProperties);
};

