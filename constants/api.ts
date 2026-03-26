function normalizePublicEnv(value: string | undefined): string | undefined {
  const trimmedValue = value?.trim();
  return trimmedValue || undefined;
}

const PUBLIC_API_URL = normalizePublicEnv(process.env.EXPO_PUBLIC_API_URL);
const PUBLIC_GOOGLE_IOS_CLIENT_ID = normalizePublicEnv(
  process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
);
const PUBLIC_GOOGLE_ANDROID_CLIENT_ID = normalizePublicEnv(
  process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
);

function requirePublicEnv(
  value: string | undefined,
  name: "EXPO_PUBLIC_API_URL",
): string {
  if (!value) {
    throw new Error(`Missing required public environment variable: ${name}`);
  }

  return value;
}

export const API_URL = requirePublicEnv(PUBLIC_API_URL, "EXPO_PUBLIC_API_URL");
export const GOOGLE_IOS_CLIENT_ID = PUBLIC_GOOGLE_IOS_CLIENT_ID;
export const GOOGLE_ANDROID_CLIENT_ID = PUBLIC_GOOGLE_ANDROID_CLIENT_ID;
