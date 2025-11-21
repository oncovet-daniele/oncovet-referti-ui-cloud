// 📦 Storage Cloud
export const storage = getStorage(app);
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASCVTJRcrs4YI-7Wo-9-bdVjvWW3yT3lk",
  authDomain: "oncovet-referti.firebaseapp.com",
  projectId: "oncovet-referti",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
