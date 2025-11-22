import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const [pazientiCount, setPazientiCount] = useState(0);
  const [refertiOggi, setRefertiOggi] = useState(0);
  const [altoRischio, setAltoRischio] = useState(0);
  const [fuoriRange24h, setFuoriRange24h] = useState(0);
  const [trendWBC, setTrendWBC] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      // === PAZIENTI TOTALI ====================================================
      const pazSnap = await getDocs(collection(db, "pazienti"));
      setPazientiCount(pazSnap.size);

      // === PAZIENTI AD ALTO RISCHIO ===========================================
      const highRisk = pazSnap.docs.filter((d) => d.data().risk_ai === "alto");
      setAltoRischio(highRisk.length);

      // === REFERTI DI OGGI ====================================================
      const oggi = new Date();
      oggi.setHours(0, 0, 0, 0);

      const refSnap = await getDocs(collection(db, "referti"));
      const refToday = refSnap.docs.filter((doc) => {
        const data = doc.data().exam_date;
        if (!data) return false;
        const exam = new Date(data.seconds * 1000);
        return exam >= oggi;
      });

      setRefertiOggi(refToday.length);

      // === ANALITI FUORI RANGE (24H) ==========================================
      const last24h = Date.now() - 24 * 60 * 60 * 1000;

      let fuoriRangeCount = 0;
      refSnap.docs.forEach((doc) => {
        const data = doc.data();
        const timestamp = data.exam_date?.seconds * 1000;
        if (timestamp && timestamp >= last24h) {
          if (Array.isArray(data.out_of_range)) {
            fuoriRangeCount += data.out_of_range.length;
          }
        }
      });

      setFuoriRange24h(fuoriRangeCount);

      // === TREND WBC GLOBALE (MEDIA PER GIORNO) ================================
      const wbcData: Record<string, number[]> = {};

      refSnap.docs.forEach((doc) => {
        const data = doc.data();
        const examDate = new Date(data.exam_date?.seconds * 1000);
        const key = examDate.toLocaleDateString("it-IT", { weekday: "short" });

        const wbc = data.wbc_value; // <---- ASSICURATI CHE SIA IL NOME GIUSTO
        if (!wbc) return;

        if (!wbcData[key]) wbcData[key] = [];
        wbcData[key].push(wbc);
      });

      const trendArray = Object.keys(wbcData).map((day) => ({
        day,
        wbc: wbcData[day].reduce((a, b) => a + b, 0) / wbcData[day].length,
      }));

      setTrendWBC(trendArray);
    }

    loadData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* CARD METRICHE ======================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 shadow-sm rounded-xl border text-center">
          <h2 className="text-sm text-slate-500">Pazienti totali</h2>
          <p className="text-4xl font-bold text-blue-600">{pazientiCount}</p>
        </div>

        <div className="bg-white p-6 shadow-sm rounded-xl border text-center">
          <h2 className="text-sm text-slate-500">Referti di oggi</h2>
          <p className="text-4xl font-bold text-blue-600">{refertiOggi}</p>
        </div>

        <div className="bg-white p-6 shadow-sm rounded-xl border text-center">
          <h2 className="text-sm text-slate-500">Pazienti ad alto rischio</h2>
          <p className="text-4xl font-bold text-blue-600">{altoRischio}</p>
        </div>

        <div className="bg-white p-6 shadow-sm rounded-xl border text-center">
          <h2 className="text-sm text-slate-500">Analiti fuori range (24h)</h2>
          <p className="text-4xl font-bold text-blue-600">{fuoriRange24h}</p>
        </div>
      </div>

      {/* TREND WBC GLOBALE =================================================== */}
      <div className="bg-white shadow-sm rounded-xl border p-6 mb-10">
        <h2 className="text-xl font-bold mb-4">Trend WBC Globale</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendWBC}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="wbc" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* REFERTI RECENTI (ANCORA DA COMPLETARE) */}
      <div className="bg-white shadow-sm rounded-xl border p-6">
        <h2 className="text-xl font-bold mb-4">Referti Recenti</h2>
        <p className="text-slate-500">Prossimo step: elenco referti reali 🔜</p>
      </div>
    </div>
  );
}