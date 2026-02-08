// Shared auth helpers to keep hooks small and consistent
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
export function validatePassword(password: string): string | null {
  if (!password || password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  const uppercase = /[A-Z]/.test(password);
  const lowercase = /[a-z]/.test(password);
  const number = /\d/.test(password);
  const special = /[^A-Za-z0-9]/.test(password);

  if (!uppercase || !lowercase || !number || !special) {
    return "Password must include uppercase, lowercase, number and special character.";
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
  } catch (_) {
    return fallback;
  }
}
