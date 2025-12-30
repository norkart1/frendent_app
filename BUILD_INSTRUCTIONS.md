# Building your Android App with EAS

This guide explains how to build your Calculator app for Android using Expo Application Services (EAS).

## 1. Install EAS CLI
You need to install the EAS CLI globally on your computer:
```bash
npm install -g eas-cli
```

## 2. Login to Expo
Log in to your Expo account:
```bash
eas login
```

## 3. Configure Project
If you haven't already, link the project to your account:
```bash
eas project:init
```

## 4. Run Build Command

### To build an APK for testing (Internal Distribution):
This will generate an `.apk` file that you can install directly on your phone.
```bash
eas build --platform android --profile preview
```

### To build for Google Play Store (Production):
This will generate an `.aab` file for uploading to the Play Store.
```bash
eas build --platform android --profile production
```

## 5. Download the Build
Once the build is complete, you will receive a link in the terminal to download your APK or AAB file.

## Build Profiles (eas.json)
- **development**: For local testing with a development client.
- **preview**: Generates an APK for quick testing on real devices.
- **production**: Optimizes the app for the Play Store.
