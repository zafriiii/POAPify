// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

//  web app's Firebase configuration
const firebaseConfig = {
  apiKey: "INSERT_API_KEY",
  authDomain: "INSERT_AUTHENTICATION_DOMAIN",
  databaseURL: "INSERT_DATABASE_URL",
  projectId: "INSERT_PROJECT_ID",
  storageBucket: "INSERT_STORAGE_BUCKET",
  messagingSenderId: "INSERT_SENDER_ID",
  appId: "INSERT_APP_ID",
  measurementId: "INSERT_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firebase Realtime Database and get a reference to the service
export const db = getDatabase(app);
