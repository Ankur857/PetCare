# PetCare 🐾

PetCare is a modern, full-stack mobile application designed to help pet owners schedule veterinary appointments, submit doctor reviews, and report stray animal rescues (complete with geolocated coordinates and device-captured photos).

---

## 🚀 Key Features
1. **User Accounts & Authentication**: Secure Sign Up and Log In using MongoDB, Mongoose, and JWT tokens.
2. **Vet Appointment Scheduling**: Choose your pet, select a certified veterinarian, pick date and time slots, and schedule consultations.
3. **Doctor Reviews & Ratings**: Share ratings (1-5 stars) and comments to review your experiences with veterinary doctors.
4. **Animal Rescue Reporting**: Report emergency stray animal rescues. Captures a photo using the device camera, auto-detects current location using reverse-geocoding, and uploads the details directly to MongoDB.

---

## 🛠️ Tech Stack

### Frontend
- **React Native & Expo**: Framework for building universal native apps.
- **Expo Router**: File-based routing for navigation.
- **Expo Image Picker**: Access camera and gallery to capture rescue pictures.
- **Expo Location**: Fetch device GPS coordinates and reverse-geocode them to locality names.
- **AsyncStorage**: Store authentication tokens and user sessions.

### Backend
- **Node.js & Express**: Fast, lightweight web server.
- **Mongoose**: MongoDB object modeling (ODM).
- **JSON Web Tokens (JWT)**: Security token standard for secure authentication API calls.
- **Bcrypt.js**: Secure hashing of passwords before database storage.

---

## 📂 Project Structure

```text
├── app/                  # React Native / Expo Frontend Application
│   ├── _layout.js        # Root entry layout
│   ├── index.js          # App landing screen (handles auto-login check)
│   ├── login.js          # User Log In page
│   ├── signup.js         # User Sign Up page
│   ├── first.js          # Homepage with category grids & profile menu
│   ├── appointment.js    # Appointment scheduling calendar
│   ├── appointmentRecords.js # User appointment history
│   ├── doctorfeedback.js # Feedback review & rating screen
│   ├── rescue.js         # Capture photo & submit animal rescue report
│   ├── config.js         # Centralized API network settings
│   └── ...               # Dog breed details pages
│
├── backend/              # Node.js Express REST API
│   ├── config/           # Database configuration
│   ├── controllers/      # Route handler logical controllers
│   ├── middleware/       # Authentication filters
│   ├── models/           # Mongoose schemas (User, Appointment, Feedback, Rescue)
│   ├── routes/           # API router endpoints
│   ├── server.js         # Backend entry file
│   └── .env              # Environment config (Port, Database connection string, JWT key)
```

---

## ⚙️ Setup & Installation

### Prerequisite
Ensure you have [Node.js](https://nodejs.org) and [MongoDB](https://www.mongodb.com/try/download/community) installed and running on your local machine (or use a MongoDB Atlas cluster URI).

---

### Step 1: Configure & Start the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the server dependencies:
   ```bash
   npm install
   ```
3. Create/update the `.env` file in the `backend/` folder:
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   MONGO_URI=your_mongodb_connection_uri
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

The console should print:
```text
MongoDB Connected: <host_name>
Server is running on port 5000 in development mode.
```

---

### Step 2: Configure & Start the Frontend (Expo)

1. Open a new terminal in the project root directory.
2. Install the mobile dependencies:
   ```bash
   npm install
   ```
3. Configure the local API address in `app/config.js` to point to the backend server.
   - If testing on a **physical device** (with Expo Go), use your computer's local network IP:
     ```javascript
     export const API_URL = 'http://192.168.x.x:5000/api';
     ```
   - If testing on an **Android Emulator**, use loopback host:
     ```javascript
     export const API_URL = 'http://10.0.2.2:5000/api';
     ```
   - If testing on **iOS Simulator or Web**, use localhost:
     ```javascript
     export const API_URL = 'http://localhost:5000/api';
     ```
4. Launch the Expo bundler:
   ```bash
   npx expo start
   ```
5. Scan the QR code on your phone using Expo Go or run the Android/iOS simulators from the console commands.
