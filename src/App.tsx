import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./layouts/Navbar";
import DashboardPage from "./pages/DashboardPage";
import RefertiPage from "./pages/RefertiPage";
import LoginPage from "./pages/LoginPage";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

export default function App() {
  const [user, loading] = useAuthState(auth);

  // 🔄 Stato di caricamento
  if (loading) return <p>Caricamento...</p>;

  // 🔐 Utente non autenticato → Login
  if (!user) return <LoginPage />;

  // 🔓 Utente autenticato → Dashboard + routing
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/referti" element={<RefertiPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}
