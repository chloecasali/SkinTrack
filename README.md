# SkinTrack

Mobile app built with Expo and React Native.

## Install

```bash
make install
```

## Configure environment

Create your local env file:

```bash
cp .env.example .env.local
```

Required variables:

- `EXPO_PUBLIC_API_URL`
- `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`
- `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID`

Google sign-in requires both mobile client IDs.

## Run the app

Run on iOS:

```bash
make run-ios
```

Run on Android:

```bash
make run-android
```

## Useful commands

Lint:

```bash
make lint
```

Prettier:

```bash
make prettier
```

Clear Expo cache:

```bash
make cache
```

List available commands:

```bash
make help
```
