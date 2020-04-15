import * as Sentry from "@sentry/browser";

export const initSentry = () => {
  if (!process.env.REACT_APP_SENTRY_DNS) {
    throw new Error("not provid REACT_APP_SENTRY_DNS.");
  }
  Sentry.init({
    environment: process.env.NODE_ENV,
    dsn: process.env.REACT_APP_SENTRY_DNS,
  });
};
