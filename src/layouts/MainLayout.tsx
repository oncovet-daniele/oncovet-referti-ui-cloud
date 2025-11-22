import Navbar from "./Navbar";

export default function MainLayout({ children }: any) {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* NAVBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <main className="max-w-7xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
}
