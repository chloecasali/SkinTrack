export const AUTH_PATHS = {
  login: "/auth/login",
  register: "/auth/register",
  password: "/auth/password",
} as const;

export const APP_PATHS = {
  root: "/",
  home: "/home",
  profile: "/profile",
} as const;

export const API_PATHS = {
  authLogin: "/auth/login",
  authRegister: "/auth/register",
  googleAuth: "/auth/google",
  me: "/me",
  users: "/users",
} as const;
