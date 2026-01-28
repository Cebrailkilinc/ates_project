// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFypSCGLqm4gdtNqIE2MzrUQTPsRBbtDI",
  authDomain: "ates-app-e8ffc.firebaseapp.com",
  projectId: "ates-app-e8ffc",
  storageBucket: "ates-app-e8ffc.firebasestorage.app",
  messagingSenderId: "1050059734700",
  appId: "1:1050059734700:web:571deace687238c5656909",
  measurementId: "G-5SPZF45RDS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);