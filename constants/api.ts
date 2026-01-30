export const AUTH_BASE_URL =
  process.env.EXPO_PUBLIC_AUTH_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:8001";
