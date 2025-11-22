import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

// Libreria grafici
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const [recentReports, setRecentReports] = useState([]);
  const [globalTrend, setGlobalTrend] = useState([]);

  // Carica ultimi referti
  useEffect(() => {
    const loadReports = async () => {
      const q = query(
        collection(db, "referti"),
        orderBy("exam_date", "desc"),
        limit(6)
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setRecentReports(data);
    };

    loadReports();
  }, []);

  // Simulazione trend globale (sostituire poi con Firestore)
  const mockTrend = [
    { day: "Lun", value: 11.2 },
    { day: "Mar", value: 12.1 },
    { day: "Mer", value: 10.9 },
    { day: "Gio", value: 13.4 },
    { day: "Ven", value: 12.8 },
  ];

  return (
    <div className="space-y-8">

      {/* TITOLO */}
      <h1 className="text-3xl font-bold text-blue-700">Dashboard</h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-4 gap-6">
        <KpiCard title="Pazienti totali" value="18" />
        <KpiCard title="Referti di oggi" value="3" />
        <KpiCard title="Pazienti ad alto rischio" value="2" />
        <KpiCard title="Analiti fuori range (24h)" value="14" />
      </div>

      {/* TREND GLOBALE */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Trend WBC Globale</h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={mockTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* REFERTI RECENTI */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Referti Recenti</h2>

        <div className="space-y-3">
          {recentReports.map((r) => (
            <div
              key={r.id}
              className="p-4 border rounded-lg flex items-center justify-between"
            >
              <div>
                <p className="font-bold">{r.patient_name}</p>
                <p className="text-sm text-slate-500">{r.owner_name}</p>
              </div>

              <p className="text-sm">{r.exam_type}</p>

              <span
                className={`px-3 py-1 rounded-lg text-white ${
                  r.ai_risk === "alto"
                    ? "bg-red-500"
                    : r.ai_risk === "medio"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              >
                {r.ai_risk?.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-3xl font-bold mt-2 text-blue-700">{value}</p>
    </div>
  );
}
