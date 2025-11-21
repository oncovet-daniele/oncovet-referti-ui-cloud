import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import LoginPage from "./pages/LoginPage";
import { testFirestore } from "./testFirestore";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        testFirestore();  // 🔥 esegue il test dopo login
      } else {
        setLoggedIn(false);
      }
    });
    return () => unsub();
  }, []);

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />;
  }

  return <div style={{ padding: 20 }}>✔ Logged In – Testing Firestore…</div>;
}
