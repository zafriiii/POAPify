// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

//  web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvNROR6ylWl5EQn8MjisnCLWIA9KUFjIA",
  authDomain: "proof-of-attendance-protocol.firebaseapp.com",
  databaseURL: "https://proof-of-attendance-protocol-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "proof-of-attendance-protocol",
  storageBucket: "proof-of-attendance-protocol.appspot.com",
  messagingSenderId: "476010957794",
  appId: "1:476010957794:web:888da46a8994f9266347bb",
  measurementId: "G-7CYW6V8LTJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firebase Realtime Database and get a reference to the service
export const db = getDatabase(app);
