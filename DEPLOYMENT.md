# Deployment Guide: PetCare Full Stack

This guide details how to deploy the Node.js/Express backend and the Expo React Native frontend separately.

---

## 🌐 1. Backend Deployment

Since the backend is an Express server running in a subfolder (`/backend`), you can deploy it to developer-friendly cloud services like **Render**, **Railway**, or **Fly.io**.

### Option A: Deploying on Render (Recommended)
1. **Prepare your GitHub Repository**: Push your code to GitHub.
2. **Create a Web Service on Render**:
   - Go to [Render Dashboard](https://dashboard.render.com/) and click **New > Web Service**.
   - Connect your GitHub repository.
3. **Configure Settings**:
   - **Name**: `petcare-backend` (or custom name)
   - **Environment**: `Node`
   - **Region**: Select closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend` *(CRITICAL: This tells Render that your backend code is in the `/backend` subfolder)*
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Configure Environment Variables**:
   - Click the **Environment** tab on Render.
   - Add the following keys:
     - `MONGO_URI`: `mongodb+srv://ankverma72_db_user:<password>@cluster0.cnxay12.mongodb.net/?appName=Cluster0`
     - `JWT_SECRET`: `super_secret_petcare_token_key_123` (Use a strong secure key)
     - `NODE_ENV`: `production`
5. **Deploy**: Click **Create Web Service**. Once deployed, Render will provide a live HTTPS URL (e.g., `https://petcare-backend.onrender.com`).

---

## 📱 2. Frontend Deployment (Expo)

Before deploying the frontend, you must update it to point to your live, deployed backend URL instead of your local machine's IP address.

### Step 1: Update API Endpoint
Open [app/config.js](file:///c:/Users/Ankur/Documents/GitHub/PetCare/app/config.js) and replace the local IP with your live backend domain:
```javascript
// Sets backend API URL to the live deployed URL
export const API_URL = 'https://your-backend.onrender.com/api';
```

---

### Step 2: Build or Publish the Native App

To distribute the app, you can build an Android APK and iOS binary using **EAS (Expo Application Services)**, which uses cloud servers to compile your app.

#### 1. Setup EAS
In your local command prompt, log in to Expo (if you haven't already):
```bash
npm install -g eas-cli
eas login
```

#### 2. Configure EAS Build
Configure your project for EAS builds:
```bash
eas build:configure
```
*(This generates or updates [eas.json](file:///c:/Users/Ankur/Documents/GitHub/PetCare/eas.json) in your root directory).*

#### 3. Build an Android APK (For Testing)
To generate a shareable `.apk` file that you can install directly on any Android device:
```bash
eas build --platform android --profile preview
```
- Expo will build the APK on their cloud.
- Once finished, you will receive a downloadable link to download the `.apk` package.

#### 4. Build for App Store / Play Store (Production)
When ready for official app store distribution:
```bash
# Android App Bundle (.aab)
eas build --platform android --profile production

# iOS App (.ipa)
eas build --platform ios --profile production
```
