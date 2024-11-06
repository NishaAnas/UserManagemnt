// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "default_test_key",
  authDomain: "usermanagement-64f1a.firebaseapp.com",
  projectId: "usermanagement-64f1a",
  storageBucket: "usermanagement-64f1a.appspot.com",
  messagingSenderId: "140802042187",
  appId: "1:140802042187:web:8a75434e4d5525cc5520ce"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);