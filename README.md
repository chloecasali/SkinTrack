# SkinTrack

## Setup

Create a local env file before running the app:

```bash
cp .env.example .env.local
```

Required public mobile variables:

- `EXPO_PUBLIC_API_URL`
- `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`
- `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID`

Do not keep backend-only secrets in the Expo app env. Values such as Google client secrets and JWT signing secrets belong in the backend only.

The mobile app expects a backend Google exchange endpoint:

- `POST /auth/google`
- Request body: `{ "idToken": "google-id-token" }`
- Success response: `{ "token": "your-app-jwt" }`

Expected backend behavior:

- Verify the Google ID token and require a verified email.
- Sign in an existing user when the email already exists.
- Auto-create a user when the email does not exist yet.
- Return the same app token shape used by password login.

## Get started

### Launch on ios

1. Ensure XCode is installed on your Mac and launch it.
2. Launch the app on your iOS device by using :
   ```bash
   make run-ios
   ```

### Launch on android

1. Launch the app on your Android device by using :
   ```bash
   make run-android
   ```

### Before commit

```bash
   make lint
```
