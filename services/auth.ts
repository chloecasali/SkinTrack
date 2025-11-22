import { AUTH_BASE_URL } from "@/constants/api";

export async function login(email: string, password: string) {
  const res = await fetch(`${AUTH_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify({ email, password }),
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson =
    contentType.includes("application/json") ||
    contentType.includes("application/ld+json");

  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    const message =
      (data && (data.error || data.message)) || `Login failed (${res.status})`;

    throw new Error(message);
  }

  if (!data?.token) {
    throw new Error("No token received from server.");
  }

  return data.token;
}
