// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8vxeFtLkKAgxvAnEOhP5AgnRG-OHymUU",
  authDomain: "netflixgpt-ef9cf.firebaseapp.com",
  projectId: "netflixgpt-ef9cf",
  storageBucket: "netflixgpt-ef9cf.firebasestorage.app",
  messagingSenderId: "277293758891",
  appId: "1:277293758891:web:c7c68164e37232265a3aee",
  measurementId: "G-L5L4988J3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();