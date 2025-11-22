import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function MainLayout({ children }: any) {
  const navigate = useNavigate();
  const location = useLocation();

  const linkClass = (path: string) =>
    `block px-4 py-2 rounded mb-2 cursor-pointer ${
      location.pathname === path ? "bg-blue-100 text-blue-600" : "text-slate-700 hover:bg-slate-200"
    }`;

  return (
    <div className="flex h-screen">
      {/* SIDEBAR */}
      <aside className="w-56 bg-white border-r p-5 flex flex-col">
        <h1
          className="text-xl font-bold mb-6 cursor-pointer"
          onClick={() => navigate("/")}
        >
          ⚡ OSR Dashboard
        </h1>

        {/* MENU */}
        <div className="flex-1">
          <div className={linkClass("/")} onClick={() => navigate("/")}>
            Pazienti
          </div>

          <div className={linkClass("/referti")} onClick={() => navigate("/referti")}>
            Referti
          </div>

          <div className={linkClass("/dashboard")} onClick={() => navigate("/dashboard")}>
            Dashboard
          </div>
        </div>

        {/* LOGOUT */}
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={async () => {
            await signOut(auth);
            navigate("/login");
          }}
        >
          Logout
        </button>
      </aside>

      {/* MAIN PAGE */}
      <main className="flex-1 overflow-y-auto bg-slate-100">{children}</main>
    </div>
  );
}