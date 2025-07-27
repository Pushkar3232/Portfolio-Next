// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD_n6u0vmpG67ALLNjduzYwja1U1kGUn64",
  authDomain: "portfolio-60129.firebaseapp.com",
  projectId: "portfolio-60129",
  storageBucket: "portfolio-60129.firebasestorage.app",
  messagingSenderId: "538166770848",
  appId: "1:538166770848:web:8d390a6cda71a333251dc5",
  measurementId: "G-4S7RB3EFT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;