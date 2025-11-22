import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import RefertiPage from "./pages/RefertiPage";
import PazientiPage from "./pages/PazientiPage";
import PazientePage from "./pages/PazientePage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p className="p-6">Caricamento...</p>;
  if (!user) return <LoginPage />;

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<PazientiPage />} />
          <Route path="/paziente/:id" element={<PazientePage />} />
          <Route path="/referti" element={<RefertiPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
