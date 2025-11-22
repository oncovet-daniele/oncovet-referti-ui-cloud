import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASCVTJRcrs4YI-7Wo-9-bdVjvWW3yT3lk",
  authDomain: "oncovet-referti.firebaseapp.com",
  projectId: "oncovet-referti",
  storageBucket: "oncovet-referti.appspot.com",
  messagingSenderId: "653250727711",
  appId: "1:653250727711:web:XXXXXXXXXXXXXXX"
};

// 🚀 Init Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
