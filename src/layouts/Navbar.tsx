import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "text-blue-600 font-semibold" : "text-gray-700";

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between select-none">
      
      {/* LOGO */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="text-2xl">⚡</div>
        <span className="text-xl font-bold text-blue-700">OSR Dashboard</span>
      </div>

      {/* MENU */}
      <div className="flex items-center gap-8 text-lg">

        <button
          className={`hover:text-blue-600 transition ${isActive("/")}`}
          onClick={() => navigate("/")}
        >
          Pazienti
        </button>

        <button
          className={`hover:text-blue-600 transition ${isActive("/referti")}`}
          onClick={() => navigate("/referti")}
        >
          Referti
        </button>

        <button
          className={`hover:text-blue-600 transition ${isActive("/dashboard")}`}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

        {/* LOGOUT */}
        <button
          className="ml-6 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
