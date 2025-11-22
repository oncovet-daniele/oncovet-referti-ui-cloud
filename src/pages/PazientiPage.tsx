import { useNavigate } from "react-router-dom";
import MyLavFlag from "../components/osr/MyLavFlag";
import RiskBadge from "../components/osr/RiskBadge";
import TrendMiniChart from "../components/osr/TrendMiniChart";

export default function PazientiPage() {
  const navigate = useNavigate();

  // MOCK DATI — poi sostituiremo con Firestore
  const pazientiMock = [
    {
      id: "1",
      name: "Zeus",
      owner: "Roberta P.",
      risk: "alto",
      mylav: [
        { name: "HGB", value: 9.9, state: "fuori_range" },
        { name: "WBC", value: 19.6, state: "fuori_range" },
      ],
      trend: [12, 10, 8, 7, 6],
      aiPreview: [
        "Leucocitosi marcata",
        "Possibile processo infiammatorio acuto"
      ],
    },
    {
      id: "2",
      name: "Grace",
      owner: "Marta R.",
      risk: "basso",
      mylav: [{ name: "WBC", value: 13.8, state: "nel_range" }],
      trend: [6, 7, 8, 10, 12],
      aiPreview: ["Andamento in miglioramento", "Valori entro la norma"],
    },
    {
      id: "3",
      name: "Luna",
      owner: "Marta R.",
      risk: "basso",
      mylav: [{ name: "RET", value: 3.4, state: "nel_range" }],
      trend: [2, 4, 5.5, 6, 6.3],
      aiPreview: ["Leggera variabilità senza rilievo clinico"],
    },
    {
      id: "4",
      name: "Milo",
      owner: "Enrico M.",
      risk: "basso",
      mylav: [],
      trend: [5, 6, 7, 7.2, 7.1],
      aiPreview: ["Nessuna anomalia rilevata"],
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pazienti</h1>

      {/* GRID CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        {pazientiMock.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-sm border rounded-xl p-6
                       flex flex-col justify-between cursor-pointer
                       hover:shadow-md transition"
            onClick={() => navigate(`/paziente/${p.name}`)}
          >
            {/* HEADER */}
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
                p.mylav.map((m, i) => (
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

            {/* TREND + AI PREVIEW */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* TREND */}
              <div className="border-2 border-sky-200 rounded-lg p-2 bg-white min-h-[110px] flex flex-col">
                <div className="font-semibold text-sm mb-1 text-slate-600">
                  Trend
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <TrendMiniChart trend={p.trend} />
                </div>
              </div>

              {/* AI PREVIEW */}
              <div className="border-2 border-sky-200 rounded-lg p-2 bg-white min-h-[110px] flex flex-col">
                <div className="font-semibold text-sm mb-1 text-slate-600">
                  Anteprima AI
                </div>

                <ul className="text-xs text-slate-700 space-y-1">
                  {p.aiPreview.length > 0 ? (
                    p.aiPreview.map((b, i) => (
                      <li key={i}>• {b}</li>
                    ))
                  ) : (
                    <li className="italic text-slate-400">Nessun dato</li>
                  )}
                </ul>
              </div>
            </div>

            {/* RISCHIO */}
            <div className="mt-4">
              <RiskBadge level={p.risk as any} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
