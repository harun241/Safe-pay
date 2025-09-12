// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyApNnVfcSiBh705nhv54Htaz2GrLXXQfLY",
  authDomain: "safe-pay-2e6dc.firebaseapp.com",
  projectId: "safe-pay-2e6dc",
  storageBucket: "safe-pay-2e6dc.firebasestorage.app",
  messagingSenderId: "1043813139616",
  appId: "1:1043813139616:web:e01c7d943ad76e85a9b5c5",
  measurementId: "G-Z4DS6BN63W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);

// Analytics শুধু browser এ চালাও
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;
