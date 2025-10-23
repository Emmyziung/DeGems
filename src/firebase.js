// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "degems-de23f.firebaseapp.com",
  projectId: "degems-de23f",
  storageBucket: "degems-de23f.firebasestorage.app",
  messagingSenderId: "792543691717",
  appId: "1:792543691717:web:e13281b1993d5a279841ac",
  measurementId: "G-V3L3WPXGRC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);