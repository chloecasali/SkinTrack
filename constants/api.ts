// Central place to configure backend endpoints used by the app
// Set EXPO_PUBLIC_AUTH_BASE_URL in your environment to override the default.
// Example: EXPO_PUBLIC_AUTH_BASE_URL=http://127.0.0.1:8000

export const AUTH_BASE_URL =
  process.env.EXPO_PUBLIC_AUTH_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:8001";
