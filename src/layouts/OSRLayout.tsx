import { NavLink, Outlet } from "react-router-dom";

export default function OSRLayout() {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "var(--osr-bg)" }}>

      {/* SIDEBAR */}
      <aside
        className="w-64 min-h-screen flex flex-col p-6"
        style={{
          backgroundColor: "var(--osr-sidebar)",
          color: "var(--osr-sidebar-text)",
        }}
      >
        {/* LOGO */}
        <div className="flex items-center space-x-3 mb-10">
          <img src="/vite.svg" className="w-10 h-10" alt="OSR" />
          <span
            className="font-bold text-xl"
            style={{ color: "var(--osr-accent)" }}
          >
            OSR
          </span>
        </div>

        {/* MENU */}
        <nav className="flex flex-col space-y-2">

          <NavLink
            to="/dashboard"
            className="py-2 px-3 rounded-md font-medium"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "var(--osr-accent)" : "transparent",
              color: isActive ? "#ffffff" : "var(--osr-sidebar-text)",
            })}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/pazienti"
            className="py-2 px-3 rounded-md font-medium"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "var(--osr-accent)" : "transparent",
              color: isActive ? "#ffffff" : "var(--osr-sidebar-text)",
            })}
          >
            Pazienti
          </NavLink>

          <NavLink
            to="/referti"
            className="py-2 px-3 rounded-md font-medium"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "var(--osr-accent)" : "transparent",
              color: isActive ? "#ffffff" : "var(--osr-sidebar-text)",
            })}
          >
            Referti
          </NavLink>

          <NavLink
            to="/trend"
            className="py-2 px-3 rounded-md font-medium"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "var(--osr-accent)" : "transparent",
              color: isActive ? "#ffffff" : "var(--osr-sidebar-text)",
            })}
          >
            Trend
          </NavLink>

          <NavLink
            to="/upload"
            className="py-2 px-3 rounded-md font-medium"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "var(--osr-accent)" : "transparent",
              color: isActive ? "#ffffff" : "var(--osr-sidebar-text)",
            })}
          >
            Upload
          </NavLink>

        </nav>
      </aside>

      {/* AREA CONTENUTO */}
      <main
        className="flex-1 p-8"
        style={{
          backgroundColor: "var(--osr-bg)",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
