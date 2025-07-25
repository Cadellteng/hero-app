// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// import { getStorage } from 'firebase/storage';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// API Key deactivated
const firebaseConfig = {
  apiKey: "AIzaSyAXp__cEoGICwwjpTxEs6NSVVEVYSXNxfw",
  authDomain: "hero-app-98294.firebaseapp.com",
  projectId: "hero-app-98294",
  storageBucket: "hero-app-98294.firebasestorage.app",
  messagingSenderId: "226702082115",
  appId: "1:226702082115:web:e9e1662557d5b8000ed4f6",
  measurementId: "G-NK1786SHR6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const storage = getStorage(app);
// const analytics = getAnalytics(app);

export { auth };
