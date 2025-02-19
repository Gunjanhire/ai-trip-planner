// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOBfhbnMhypNHBIfdA9Zu40jLhrkFsmJA",
  authDomain: "ai-trip-planner-64b01.firebaseapp.com",
  projectId: "ai-trip-planner-64b01",
  storageBucket: "ai-trip-planner-64b01.firebasestorage.app",
  messagingSenderId: "808959071054",
  appId: "1:808959071054:web:397e0ca3358c0c9966841f",
  measurementId: "G-TFS45HXH0Y",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
