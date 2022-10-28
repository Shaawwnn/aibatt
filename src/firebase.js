// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAk_oR6aFIGrDGIRetn_bEKyEGpYT238Jw",
  authDomain: "aibatt.firebaseapp.com",
  projectId: "aibatt",
  storageBucket: "aibatt.appspot.com",
  messagingSenderId: "984428326483",
  appId: "1:984428326483:web:2e1ee0615fb3b6a0b460a6",
  measurementId: "G-DR9S9NWCH8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
