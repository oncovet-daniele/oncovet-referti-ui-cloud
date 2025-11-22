import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

import RiskBadge from "../components/osr/RiskBadge";
import TrendMiniChart from "../components/osr/TrendMiniChart";

export default function PazientiPage() {
  const navigate = useNavigate();

  const [pazienti, setPazienti] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPazienti() {
      try {
        // === QUERY PAZIENTI REALI ===
        const qPaz = query(collection(db, "pazienti"), orderBy("name"));
        const snap = await getDocs(qPaz);

        const list = snap.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            name: data.name || "Senza nome",
            owner: data.owner_name || "—",
            risk: data.risk_ai || "basso",
            mylav: data.out_of_range || [], // lista analiti fuori range
            trend: data.trend || [],         // mini-trend paziente
            aiPreview: data.ai_summary || [], // bullet AI riassuntivi
          };
        });

        setPazienti(list);
      } catch (error) {
        console.error("❌ Errore caricamento pazienti:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPazienti();
  }, []);

  if (loading) return <p className="p-6">Caricamento pazienti...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pazienti</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        {pazienti.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-sm border rounded-xl p-6 hover:shadow-md cursor-pointer transition"
            onClick={() => navigate(`/paziente/${p.id}`)}
          >
            {/* Header */}
            <div className="flex items-center mb-3">
              <img
                src="/vite.svg"
                className="w-10 h-10 mr-3 rounded-full border border-sky-300"
              />
              <div>
                <div className="font-bold text-lg">{p.name}</div>
                <div className="text-sm text-slate-500">{p.owner}</div>
              </div>
            </div>

            {/* MYLAV ANALITI */}
            <div className="space-y-2 mb-4">
              {p.mylav.length > 0 ? (
                p.mylav.map((m: any, i: number) => (
                  <div
                    key={i}
                    className={`rounded-md py-2 px-3 flex justify-between items-center text-sm ${
                      m.state === "fuori_range"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    <span>{m.name}</span>
                    <span className="font-semibold">{m.value}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs italic text-slate-400">
                  Nessun analita MyLav disponibile
                </p>
              )}
            </div>

            {/* TREND + AI */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* Trend */}
              <div className="border-2 border-sky-200 rounded-lg p-2 bg-white min-h-[110px] flex flex-col">
                <div className="font-semibold text-sm mb-1 text-slate-600">
                  Trend
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <TrendMiniChart trend={p.trend} />
                </div>
              </div>

              {/* AI Preview */}
              <div className="border-2 border-sky-200 rounded-lg p-2 bg-white min-h-[110px] flex flex-col">
                <div className="font-semibold text-sm mb-1 text-slate-600">
                  Anteprima AI
                </div>

                <ul className="text-xs text-slate-700 space-y-1">
                  {p.aiPreview.length > 0 ? (
                    p.aiPreview.map((b: string, i: number) => (
                      <li key={i}>• {b}</li>
                    ))
                  ) : (
                    <li className="italic text-slate-400">Nessun dato AI</li>
                  )}
                </ul>
              </div>
            </div>

            {/* RISCHIO */}
            <div className="mt-4">
              <RiskBadge level={p.risk} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
