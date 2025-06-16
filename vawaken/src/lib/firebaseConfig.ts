
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getAnalytics, type Analytics } from "firebase/analytics"; // Added Analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK1VBo5R5VgmIGV5rEChIomnPBBTagwBg",
  authDomain: "vafssologin.firebaseapp.com",
  projectId: "vafssologin",
  storageBucket: "vafssologin.appspot.com", // Corrected common typo: .appspot.com for storageBucket
  messagingSenderId: "830109782052",
  appId: "1:830109782052:web:08b7d3f46884a776de88b1",
  measurementId: "G-JE0CMHY0Q8"
};

let app: FirebaseApp;
let auth: Auth;
let analytics: Analytics | undefined; // Optional analytics

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
auth = getAuth(app);

// Initialize Analytics only in client-side environments if measurementId is present
if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
  analytics = getAnalytics(app);
}

export { app, auth, analytics };
