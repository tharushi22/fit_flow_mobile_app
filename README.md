# FitFlow – Smart AI Fitness Companion 🏋️‍♀️✨

[![React Native](https://img.shields.io/badge/React_Native-0.86.3-61DAFB?logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo SDK](https://img.shields.io/badge/Expo_SDK-57.0-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![Android](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-3DDC84?logo=android&logoColor=white)](https://android.com)
[![Build](https://img.shields.io/badge/Build-v1.0.1%20(Code%202)-6C4BFF)](#)
[![License](https://img.shields.io/badge/License-Academic%20Evaluation-blue.svg)](#)

FitFlow is an intelligent mobile fitness companion designed to empower users with personalized workout splits, interactive macro & hydration tracking, dynamic volume analytics, and an active fitness community.

**GitHub Repository:** [https://github.com/tharushi22/fit_flow_mobile_app](https://github.com/tharushi22/fit_flow_mobile_app)

---

## 📱 Key Features

- **Personalized Onboarding**: Tailored fitness goal setup, activity level assessment, and health preference onboarding.
- **Dynamic Home Dashboard**: Live activity rings, calories burned, heart rate tracking, and quick access to daily workouts.
- **AI Workout Planner**: Intelligent 7-day training routine generator with goal, intensity, and duration parameters.
- **Nutrition & Hydration Logger**: Real-time water tracking, calorie counting, and macronutrient balance (Protein, Carbs, Fats).
- **Progress & Volume Analytics**: Interactive weekly and monthly volume tracking, consistency streak counters, and milestone records.
- **Community Feed & Social Sharing**: Workout kudos/likes, motivational posts, user comments, and fitness leaderboards.
- **Privacy & Safety First**: Comprehensive in-app Privacy Policy, Apple Review Guideline 1.4 compliance, and transparent data practices.
- **Modern Android 15 & Adaptive Icon**: Full adaptive icon safe-zone alignment, splash screen with official Android branding, and standalone offline execution.

---

## 🛠️ Technology Stack

- **Framework**: React Native 0.86.3
- **Platform**: Expo SDK 57 (Expo Router file-based navigation)
- **Languages**: TypeScript, React, Java/Kotlin (Android Native)
- **Styling**: React Native StyleSheet, LinearGradient, Vector Icons
- **Build System**: Android Gradle 9.3.1 / AGP 8.8.2 / R8 ProGuard Minification
- **Cryptographic Signing**: Android Keystore (RSA 2048-bit, APK Signature Scheme v2)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- Android SDK (API 34/35/36) & Android Studio
- PowerShell or Bash

### Installation

```bash
# Clone the repository
git clone https://github.com/tharushi22/fit_flow_mobile_app.git
cd fit_flow_mobile_app

# Install project dependencies
npm install
```

### Running Locally

```bash
# Start the Metro bundler
npx expo start

# Run directly on an active Android emulator / connected device
npx expo run:android
```

---

## 📦 Production Builds (Signed APK & AAB)

```bash
# 1. Export offline JavaScript bundle
npx expo export:embed --entry-file node_modules/expo-router/entry.js \
  --platform android --dev false \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res/

# 2. Build signed release APK
cd android
./gradlew.bat app:assembleRelease

# 3. Build signed Google Play App Bundle (AAB)
./gradlew.bat app:bundleRelease
```

- **Signed Release APK**: `android/app/build/outputs/apk/release/app-release.apk`
- **Signed Release AAB**: `android/app/build/outputs/bundle/release/app-release.aab`

---

## 📄 Documentation & Reports

- **Submission Portfolio (Markdown)**: [`LAB_REPORT_IT3060.md`](LAB_REPORT_IT3060.md)
- **Privacy Policy**: [`PRIVACY_POLICY.md`](PRIVACY_POLICY.md) | [`docs/privacy-policy.html`](docs/privacy-policy.html)
- **Release Notes v1.0.1**: [`RELEASE_NOTES.md`](RELEASE_NOTES.md)
- **Store Assets & Graphics**: [`store_assets/`](store_assets/)

---

## 👥 Authors & Academic Record

- **Course Module**: IT3060 – Human Computer Interaction
- **Academic Term**: Year 3 / Semester 2 – 2026
- **Project Team**: FitFlow Development Team
