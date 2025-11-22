import { AUTH_BASE_URL } from "@/constants/api";

// Build a full auth API URL from a relative path
export function apiUrl(path: string): string {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${AUTH_BASE_URL}${path}`;
}

// Detect if a response contains JSON
export function isJsonResponse(res: Response): boolean {
  const contentType = res.headers.get("content-type") || "";
  return (
    contentType.includes("application/json") ||
    contentType.includes("application/ld+json")
  );
}

// Safely parse JSON from a response, returning null on failure or non-JSON
export async function parseJsonSafe<T = any>(res: Response): Promise<T | null> {
  if (!isJsonResponse(res)) return null;
  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

// Normalize common API error shapes into a message
export function getApiErrorMessage(data: any, fallback: string): string {
  if (!data) return fallback;
  try {
    return data.message || data.error || data.detail || data.title || fallback;
  } catch {
    return fallback;
  }
}

// Parse JSON if present; throw Error with a meaningful message when !ok; return parsed data otherwise
export async function ensureOk<T = any>(
  res: Response,
  fallback: string,
): Promise<T | null> {
  const data = await parseJsonSafe<T>(res);
  if (!res.ok) {
    const message = getApiErrorMessage(data, `${fallback} (${res.status})`);
    throw new Error(message);
  }
  return data;
}
