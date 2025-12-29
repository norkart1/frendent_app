# Dikhr and Dua

## Overview

Dikhr and Dua is a React Native mobile application built with Expo, designed to help Muslims with their daily religious practices. The app provides features for Islamic prayers (dikhr/dhikr) and supplications (dua), along with prayer timing functionality based on the user's location.

The application is cross-platform, supporting iOS, Android, and web deployments through Expo's unified development approach.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **Technology**: React Native with Expo SDK 52
- **Routing**: Expo Router with file-based routing and typed routes enabled
- **Rationale**: Expo provides a streamlined development experience with managed native dependencies, while expo-router offers Next.js-like file-based routing for React Native

### State Management
- **Technology**: Zustand
- **Pattern**: Simple store-based state management with async persistence
- **Rationale**: Lightweight alternative to Redux, provides a minimal API with good TypeScript support

### Local Storage
- **Technology**: AsyncStorage (@react-native-async-storage/async-storage)
- **Usage**: Persisting user authentication tokens and user data locally
- **Rationale**: Standard solution for key-value storage in React Native apps

### Prayer Time Calculation
- **Technology**: Adhan library
- **Purpose**: Calculates Islamic prayer times based on geographic coordinates
- **Integration**: Combined with expo-location for automatic location detection

### Styling Architecture
- **Pattern**: StyleSheet-based styling with centralized color constants
- **Structure**: Styles separated into individual files per screen/component in `assets/styles/`
- **Theme**: Supports multiple color themes (Modern Green active, with Retro and Ocean alternatives commented)

### Navigation Structure
- **Pattern**: Bottom tab navigation using @react-navigation/bottom-tabs
- **Screens**: Home, Prayer Timing, Profile, and authentication screens

### UI Components
- **Animations**: react-native-reanimated for smooth animations
- **Gestures**: react-native-gesture-handler for touch interactions
- **Haptics**: expo-haptics for tactile feedback
- **Images**: expo-image for optimized image loading

## External Dependencies

### Backend API
- **Endpoint**: `https://backend2-1-9wxt.onrender.com/api/`
- **Authentication**: REST API with token-based auth
- **Endpoints Used**:
  - `POST /auth/register` - User registration

### Expo Application Services (EAS)
- **Project ID**: `2afaac55-15fb-4d03-847a-1620f0165fa0`
- **Build Profiles**:
  - Development: APK with development client
  - Preview: Internal distribution APK
  - Production: Android App Bundle for Play Store

### Location Services
- **Technology**: expo-location
- **Purpose**: Obtaining user coordinates for prayer time calculations
- **Permissions**: Requires location permission from user

### Third-Party Libraries
- **adhan**: Islamic prayer time calculation engine
- **intl-pluralrules**: Internationalization support for pluralization
- **react-native-webview**: Embedded web content display