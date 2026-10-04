# Apple App Store Connect & TestFlight Listing Metadata

## App Information
* **App Name**: FitFlow: AI Workout & Fitness (30 chars - within 30 char limit)
* **Subtitle**: Smart Plans, Macros & Social (29 chars - within 30 char limit)
* **Bundle ID**: `com.fitflow.app`
* **SKU**: `FITFLOW-IOS-001`
* **Primary Category**: Health & Fitness
* **Secondary Category**: Lifestyle

---

## Store Descriptions & Copy

### Promotional Text (Max 170 chars)
> Kickstart your training with personalized AI workout plans, seamless nutrition logging, and an active community that keeps you inspired every day.

### Keywords (Max 100 chars, comma-separated)
> workout,fitness,gym,tracker,planner,exercise,nutrition,macros,calorie,bodybuilding,strength,health

### Support URL
> `https://fitflow.app/support`

### Marketing URL
> `https://fitflow.app`

### Privacy Policy URL
> `https://fitflow.app/privacy`

---

## App Privacy Nutrition Labels
According to App Store Connect privacy requirements:

| Data Type | Collected? | Linked to User? | Used for Tracking? | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Contact Info** (Email, Name) | Yes | Yes | No | Account login & user profile |
| **Health & Fitness** (Workouts, Activity) | Yes | Yes | No | App functionality & progress charts |
| **User Content** (Comments, Posts) | Yes | Yes | No | Community interaction |
| **Usage Data** (App interactions) | Yes | No | No | Product analytics & crash prevention |
| **Diagnostics** (Crash logs) | Yes | No | No | App stability & bug fixes |

---

## Apple Review Guidelines Compliance (Health & Medical)
* **Guideline 1.4.1 (Physical Harm & Safety)**:
  * FitFlow incorporates prominent medical and safety disclaimers in onboarding, workouts, and privacy policy reminding users to consult health professionals before beginning rigorous exercise.
* **Guideline 5.1.1 (Data Collection & Storage)**:
  * Users can manage and request deletion of personal information directly within app settings.
* **Guideline 2.1 (Performance)**:
  * Standalone offline bundle integrated into native container ensuring 0 initial launch latency and smooth 60fps animations.

---

## TestFlight Beta Testing Deployment Strategy
### 1. Internal Testing Group
* **Group Name**: `FitFlow Core QA`
* **Testers**: 10 internal developers & QA engineers.
* **Build Access**: Automatic distribution immediately upon successful CI/CD build processing.
* **Test Focus**: Regression testing, offline bundle stability, memory consumption, deep link navigation.

### 2. External Beta Testing Group
* **Group Name**: `FitFlow Community Beta Testers`
* **Testers**: Up to 1,000 public beta invitees via public TestFlight link.
* **Beta App Review**: Submitted with demo credentials and test scenario guide.
* **Build Expiration**: 90 days per build iteration.
* **Feedback Mechanism**: Native TestFlight screenshot feedback and integrated in-app support modal.
