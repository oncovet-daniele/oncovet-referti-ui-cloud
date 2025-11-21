import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Caricamento...</p>;
  if (!user) return <LoginPage />;

  return <DashboardPage />;
}
