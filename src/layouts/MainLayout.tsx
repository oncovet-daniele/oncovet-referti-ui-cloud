import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function MainLayout({ children }: any) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? "bg-blue-100 text-blue-700 font-semibold"
      : "text-slate-600 hover:text-blue-600";

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r shadow-sm p-6 flex flex-col">
        {/* LOGO */}
        <div className="flex items-center gap-2 mb-10 cursor-pointer"
             onClick={() => navigate("/")}>
          <div className="text-3xl">⚡</div>
          <h1 className="text-xl font-bold text-blue-700">OSR Dashboard</h1>
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-3">
          <button
            className={`text-left px-3 py-2 rounded-md ${isActive("/")}`}
            onClick={() => navigate("/")}
          >
            Pazienti
          </button>

          <button
            className={`text-left px-3 py-2 rounded-md ${isActive("/referti")}`}
            onClick={() => navigate("/referti")}
          >
            Referti
          </button>

          <button
            className={`text-left px-3 py-2 rounded-md ${isActive("/dashboard")}`}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          {/* LOGOUT */}
          <button
            className="mt-auto px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* CONTENUTO PAGINE */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
