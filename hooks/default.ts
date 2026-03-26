// Shared auth helpers to keep hooks small and consistent
import type { TFunction } from "i18next";
import {
  AUTH_FETCH_ACCOUNT_FAILED_ERROR,
  AUTH_LOGIN_FAILED_ERROR,
  AUTH_NO_TOKEN_RECEIVED_ERROR,
  AUTH_REGISTER_FAILED_ERROR,
  PROFILE_FETCH_FAILED_ERROR,
} from "@/constants/errors";
import type { MeResponse } from "@/services/auth/me";

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// Simple but solid email validation (no RFC rocket science)
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export function isEmailValid(email: string): boolean {
  return emailRegex.test(normalizeEmail(email));
}

// Password validator used by registration
// Returns null when valid, otherwise a human-readable message
export function validatePassword(
  password: string,
  t: TFunction,
): string | null {
  if (!password || password.length < 8) {
    return t("validation.passwordMin");
  }
  const uppercase = /[A-Z]/.test(password);
  const lowercase = /[a-z]/.test(password);
  const number = /\d/.test(password);
  const special = /[^A-Za-z0-9]/.test(password);

  if (!uppercase || !lowercase || !number || !special) {
    return t("validation.passwordComplex");
  }
  return null;
}

// Choose the best available firstname field from /me response
export function extractFirstname(
  data: MeResponse | null | undefined,
): string | null {
  if (!data) return null;
  return (
    (data as any).firstname ??
    (data as any).firstName ??
    (data as any).givenName ??
    null
  );
}

// Extract a consistent error message from unknown error shapes
export function getErrorMessage(
  err: unknown,
  fallback = "Unexpected error occurred.",
): string {
  if (!err) return fallback;
  if (typeof err === "string") return err;
  if (err instanceof Error) return err.message || fallback;
  try {
    // Many API error shapes use { message } or { error }
    const anyErr = err as Record<string, any>;
    return (
      anyErr?.message ||
      anyErr?.error ||
      anyErr?.detail ||
      anyErr?.title ||
      fallback
    );
  } catch {
    return fallback;
  }
}

const APP_ERROR_TRANSLATION_KEYS = {
  [AUTH_FETCH_ACCOUNT_FAILED_ERROR]: "errors.fetchAccountFailed",
  [AUTH_LOGIN_FAILED_ERROR]: "errors.loginFailed",
  [AUTH_NO_TOKEN_RECEIVED_ERROR]: "errors.noTokenReceived",
  [AUTH_REGISTER_FAILED_ERROR]: "errors.registrationFailed",
  [PROFILE_FETCH_FAILED_ERROR]: "errors.fetchProfileFailed",
} as const;

export function getLocalizedErrorMessage(
  err: unknown,
  t: TFunction,
  fallbackKey = "errors.unexpected",
): string {
  const rawMessage = getErrorMessage(err);
  const normalizedMessage =
    typeof rawMessage === "string"
      ? rawMessage.replace(/\s*\(\d+\)\s*$/, "")
      : rawMessage;
  const translationKey =
    APP_ERROR_TRANSLATION_KEYS[
      normalizedMessage as keyof typeof APP_ERROR_TRANSLATION_KEYS
    ];

  if (translationKey) {
    return t(translationKey);
  }

  if (!err || rawMessage === "Unexpected error occurred.") {
    return t(fallbackKey);
  }

  return rawMessage;
}
