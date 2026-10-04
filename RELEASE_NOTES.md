# FitFlow Release Notes

---

## Version 1.0.1 (Build 2) – October 4, 2026
*Target Platforms: Android (Google Play AAB & APK), iOS (TestFlight)*

### 🚀 Highlights & New Features
* **Unified Brand Identity**: Integrated the official high-contrast FitFlow athlete silhouette logo across the app icon, Android adaptive launcher icons, native splash screen, and all major in-app navigation headers.
* **Instant Offline Native Startup**: Pre-compiled and embedded the full React Native JavaScript bundle directly into native Android assets, eliminating Metro dev server dependency and preventing startup crashes.
* **Store Assets Package**: Added production-ready 1024x500 Feature Graphic, 512x512 store icons, and high-resolution phone screenshots in `store_assets/`.
* **Privacy & Compliance**: Added complete GDPR/HIPAA privacy policy documentation, medical disclaimers, and App Store privacy nutrition disclosures.

### 🛠️ Bug Fixes & Performance Improvements
* **Resolved "Unable to load script" Exception**: Generated `index.android.bundle` inside `android/app/src/main/assets/` to ensure offline capability.
* **Optimized Android Adaptive Icon Safe Zone**: Rescaled adaptive icon foreground to 68% to prevent visual clipping on circular and squircle Pixel launcher docks.
* **R8 / Proguard Code Minification**: Configured R8 rule set in `proguard-rules.pro` with resource shrinking enabled.
* **Enhanced Memory Management**: Fixed unmounted component memory leaks across animated modal dismissals.

---

## Version 1.0.0 (Build 1) – Initial Academic Release
* **Core Onboarding**: 3-step personalized setup flow covering training goals, activity experience, and physical profile.
* **Home Dashboard**: Real-time daily progress counters, activity minutes, active calories, and Quick Workout start.
* **Workout Planner**: Structured 7-day training split (Push, Pull, Legs, HIIT, Cardio, Core) with interactive reps/weights logging.
* **Nutrition & Hydration**: Daily calorie and macro target breakdown (Protein, Carbs, Fats) with water logger.
* **Community Feed**: Social stream with kudos (likes), commenting threads, and active leaderboard rankings.
* **Analytics**: 7-day interactive workout time and volume charts.
