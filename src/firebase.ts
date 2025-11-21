// ========================================================
// OSR Firebase Client - Frontend (React + Vite)
// ========================================================

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 🔐 Configurazione Firebase Web (riempi SOLO apiKey)
const firebaseConfig = {
  apiKey: "AIzaSyASCVTJRcrs4YI-7Wo-9-bdVjvWW3yT3lk",
  authDomain: "oncovet-referti.firebaseapp.com",
  projectId: "oncovet-referti",
  storageBucket: "oncovet-referti.firebasestorage.app",
  messagingSenderId: "655307527711",
  appId: "1:655307527711:web:39320995c5c8232903a72a"
};

// 🔥 Inizializza Firebase
export const app = initializeApp(firebaseConfig);

// 🔐 Modulo di autenticazione
export const auth = getAuth(app);

// 🗂 Firestore (database cloud)
export const db = getFirestore(app);

// 📦 Storage Cloud
export const storage = getStorage(app);
