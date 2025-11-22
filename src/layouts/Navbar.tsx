import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between">
      {/* LOGO / TITOLO */}
      <div
        className="text-xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        OSR Dashboard
      </div>

      {/* MENU */}
      <div className="flex items-center gap-6">
        <button
          className="hover:text-blue-600"
          onClick={() => navigate("/")}
        >
          Pazienti
        </button>

        <button
          className="hover:text-blue-600"
          onClick={() => navigate("/referti")}
        >
          Referti
        </button>

        <button
          className="hover:text-blue-600"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

        {/* LOGOUT */}
        <button
          className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
