# 🏋️ CultCoach — Week 4: Connect App to API

React Native (Expo) fitness app connected to a Flask REST API. Users can register, log in, and log/view real workout sessions — all data is real, fetched from and posted to a live backend (no more mock data for auth/workouts).

---

## ✅ What's implemented

- **Auth flow**: Register → Login → JWT access & refresh tokens stored in `AsyncStorage`
- **Persistent login**: closing and reopening the app keeps the user logged in until they log out
- **Workout Log screen**: fetches real workout sessions from `GET /api/workouts`
- **Add Session form**: posts new sessions to `POST /api/workouts`, with client-side validation (required fields, positive numbers for duration/sets/reps)
- **Loading states**: spinners shown while auth checks and API calls are in progress
- **Error handling**: toast notifications (via `react-native-toast-message`) for failed requests (invalid login, validation errors, network issues)

---

## 🗂 New files added this week
---

## 🔌 Backend dependency

This app expects the **Week 2 Flask API** (`fitness_api`) to be running locally.

### Running the backend

```bash
cd fitness_api
python -m venv venv
.\venv\Scripts\activate        # Windows
pip install -r requirements.txt
copy .env.example .env         # fill in SECRET_KEY and JWT_SECRET_KEY with random values
python app.py
```

The API will run on `http://<your-local-ip>:5000`.

### Pointing the app at your backend

Open `api/axiosConfig.js` and set `baseURL` to your machine's local network IP (not `localhost` — required for physical devices/Expo Go):

```js
baseURL: 'http://YOUR_LOCAL_IP:5000/api',
```

Find your IP with `ipconfig` (Windows) or `ifconfig` (Mac/Linux). Both the phone running Expo Go and the computer running Flask must be on the **same WiFi network**.

---

## 🚀 Running the app

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS).

---

## 🔑 Auth endpoints used

| Method | Path | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Create account (`username`, `email`, `password`) |
| POST | `/api/auth/login` | Log in (`username`, `password`) → returns `access_token`, `refresh_token`, `user` |
| GET | `/api/auth/profile` | Get current logged-in user (used to restore session on app restart) |

## 🏋️ Workout endpoints used

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/workouts` | Fetch all workout sessions for the logged-in user |
| POST | `/api/workouts` | Create a new workout session, optionally with nested exercises |

---

## ⚠️ Known limitations

- Access token refresh (`/api/auth/refresh`) is not yet wired up — tokens expire after 1 hour, requiring re-login
- Editing/deleting existing workout sessions is not yet implemented (create + view only)
- Exercise Library and Profile screens still use mock data (out of scope for this week's task)