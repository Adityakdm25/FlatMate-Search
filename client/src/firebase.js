// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "home-quest-17e31.firebaseapp.com",
    projectId: "home-quest-17e31",
    storageBucket: "home-quest-17e31.appspot.com",
    messagingSenderId: "329032933674",
    appId: "1:329032933674:web:da5740cc11fd1993ed3e53",
    measurementId: "G-E6JEJLD115"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
