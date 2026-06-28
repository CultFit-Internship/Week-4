# 🏋️ CultCoach — Fitness App Shell

A polished React Native + Expo Go fitness app shell with 4 screens, bottom tab navigation, and mock data. No backend required.

---

## 📱 Screens

| Screen | Description |
|---|---|
| **Home** | Dashboard with streak, weekly volume chart, today's workout, and recent sessions |
| **Workout Log** | Expandable workout cards with per-exercise set/rep/weight breakdown |
| **Exercise Library** | Searchable 2-column grid with muscle-group filter and detail modal |
| **Profile** | User stats, live BMI calculator with visual gauge, and settings |

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
cd CultCoach
npm install
```

### 2. Start Expo

```bash
npx expo start
```

### 3. Open on your phone
- Install **Expo Go** from the App Store or Google Play
- Scan the QR code in your terminal

---

## 📦 Dependencies

```
@react-navigation/native          ^6.x
@react-navigation/bottom-tabs     ^6.x
react-native-screens              ^3.x
react-native-safe-area-context    ^4.x
@expo/vector-icons                ^14.x  (bundled with Expo)
expo                              ~51.x
```

---

## 🗂 Project Structure

```
CultCoach/
├── App.js                    ← Navigation root (bottom tabs)
├── app.json                  ← Expo config
├── package.json
├── babel.config.js
├── data/
│   └── mockData.js           ← All mock data + theme colours
└── screens/
    ├── HomeScreen.js         ← Dashboard
    ├── WorkoutLogScreen.js   ← Expandable workout history
    ├── ExerciseLibraryScreen.js  ← Searchable exercise grid + modal
    └── ProfileScreen.js      ← BMI calculator + user stats
```

---

## 🎨 Design System

The app uses a consistent dark theme defined in `data/mockData.js`:

```js
COLORS.bg        = '#0F172A'  // Page background
COLORS.surface   = '#1E293B'  // Cards
COLORS.card      = '#263347'  // Nested cards
COLORS.accent    = '#6366F1'  // Indigo primary
COLORS.success   = '#22C55E'  // Green
COLORS.warning   = '#F59E0B'  // Amber
COLORS.danger    = '#EF4444'  // Red
```

---

## 🔧 Next Steps (when adding a backend)

- Replace `data/mockData.js` with API calls (Supabase / Firebase / REST)
- Add `AsyncStorage` for offline caching
- Wire up "Start Workout" → live timer screen
- Add auth (Expo Auth Session or Clerk)
- Persist BMI history with user profiles
