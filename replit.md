# Dikhr and Dua - Calculator App

## Overview

A simple, sleek, and functional calculator application built with React Native and Expo. It features a dark-themed UI with support for basic arithmetic operations, percentages, and parentheses. The app displays an Islamic education-themed logo on startup and in the header.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **Technology**: React Native with Expo SDK 54
- **Routing**: Expo Router with file-based routing
- **Rationale**: Expo provides a streamlined development experience, while expo-router offers easy navigation.

### Styling Architecture
- **Pattern**: StyleSheet-based styling inlined in the main screen for simplicity.
- **Theme**: Dark theme with blue and teal accents.

### App Branding
- **App Icon**: Student logo (Islamic students in traditional dress)
- **Splash Screen**: 2-second splash with logo display
- **App Name**: Dikhr and Dua

## Features
- Basic arithmetic (+, -, x, ÷)
- Parentheses support
- Percentage calculation
- Number formatting with commas
- Clear entry (C)
- Sleek dark mode design
- Student logo branding

## Build & Development Commands

### Local Development
```bash
npm run web          # Start web development server on port 5000
npm start            # Start general development
npm run android      # Build for Android
npm run ios          # Build for iOS
```

### Production Build
```bash
npm run web -- --prod              # Build optimized web version
npm run build                       # Create production bundle (if available)
```

### Testing & Quality
```bash
npm test             # Run Jest tests
npm run lint         # Run ESLint code linter
```

### Package Management
```bash
npm install --legacy-peer-deps    # Install dependencies (required for this project)
npm update                         # Update all packages
```

## Deployment Options

### ✅ 1. WEB PUBLISHING (Recommended - Fastest)
**Status:** Ready to deploy now!

```bash
npm run web    # Already running on port 5000
```

**Deploy:**
- Click **"Publish"** button in Replit GUI
- Get instant public URL
- Uses custom domain if configured

**Alternative - Export Static Files:**
```bash
npx expo export --platform web
```

### 2. Mobile Apps (iOS/Android via EAS)

**Prerequisites:**
```bash
npm install -g eas-cli
eas login                # Login to your Expo account
eas init                 # One-time setup
```

**Build Commands:**
```bash
# Android
eas build --platform android --profile preview

# iOS  
eas build --platform ios

# Both
eas build --platform all
```

**Note:** If EAS build fails due to environment issues, local build or web deployment is recommended.

**Publish to App Stores:**
```bash
# Apple App Store
eas build --platform ios --profile production --submit

# Google Play
eas build --platform android --profile production --submit
```

### 3. Push Updates (Code Changes Only)
After initial mobile app build:
```bash
eas update --platform ios,android
```

## Project Structure
```
├── app/
│   ├── index.jsx          # Main calculator screen
│   └── about.jsx          # About/menu screen
├── assets/
│   └── images/
│       ├── logo.png       # Student logo
│       ├── icon.png       # App icon fallback
│       └── favicon.png    # Web favicon
├── store/
│   └── authStore.js       # State management (Zustand)
├── app.json               # Expo configuration
├── metro.config.js        # Metro bundler config
├── package.json           # Dependencies
└── replit.md              # This file
```

## Configuration Files

- **app.json**: Expo configuration (app name, icon, splash screen, permissions)
- **metro.config.js**: Metro bundler configuration for web support
- **package.json**: Dependencies and scripts
- **tsconfig.json**: TypeScript configuration

## Development Tips

1. **Hot Reload**: Changes to files automatically reload in browser
2. **Metro**: Fast JavaScript bundler optimized for React Native
3. **Testing**: Press 'w' in console to open in browser
4. **Debugging**: Console logs appear in terminal
