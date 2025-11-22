// Very small in-memory auth token store.
// You can replace this later with AsyncStorage or SecureStore for persistence.

let TOKEN: string | null = null;

export function setToken(token: string) {
  TOKEN = token;
}

export function getToken(): string | null {
  return TOKEN;
}

export function clearToken() {
  TOKEN = null;
}
