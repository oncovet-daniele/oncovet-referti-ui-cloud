import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PazientePage() {
  const { id } = useParams(); // id = nome paziente
  const [referti, setReferti] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const q = query(
          collection(db, "referti"),
          where("patient_name", "==", id),
          orderBy("exam_date", "asc")
        );

        const snap = await getDocs(q);
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setReferti(list);
      } catch (e) {
        console.error("Errore caricamento paziente:", e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) return <p className="p-6">Caricamento dati...</p>;
  if (!referti.length) return <p className="p-6">Nessun referto trovato.</p>;

  const paziente = referti[0];

  const trendWBC = referti
    .map((r) => {
      const wbc = r.out_of_range?.find((a: any) => a.name === "WBC");
      if (wbc) {
        return {
          date: new Date(r.exam_date).toLocaleDateString("it-IT"),
          value: wbc.value,
        };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <div className="p-6 space-y-8">
      <div className="bg-white shadow rounded-xl p-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{paziente.patient_name}</h1>
          <p className="text-slate-600">{paziente.owner_name}</p>
        </div>
        <div className="text-5xl">🐾</div>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Trend WBC</h2>

        {trendWBC.length > 1 ? (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendWBC}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-slate-500">
            Trend insufficiente (servono almeno 2 referti).
          </p>
        )}
      </div>

      <div className="bg-white shadow rounded-xl p-6 space-y-3">
        <h2 className="text-xl font-semibold mb-3">Ultimo Referto</h2>

        <p>
          <b>Data:</b>{" "}
          {new Date(paziente.exam_date).toLocaleDateString("it-IT")}
        </p>
        <p>
          <b>Rischio AI:</b> {paziente.ai_risk?.toUpperCase()}
        </p>

        <div>
          <b>Anteprima AI:</b>
          <ul className="list-disc ml-6">
            {paziente.ai_summary?.map((b: string, i: number) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>

        <div>
          <b>Valori fuori range:</b>
          <ul className="list-disc ml-6">
            {paziente.out_of_range?.length
              ? paziente.out_of_range.map((a: any, i: number) => (
                  <li key={i}>
                    {a.name}: {a.value}
                  </li>
                ))
              : "Nessuno"}
          </ul>
        </div>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-3">Storico referti</h2>

        <div className="space-y-3">
          {referti.map((r) => (
            <div
              key={r.id}
              className="p-3 border rounded-lg flex justify-between items-center bg-slate-50"
            >
              <div>
                <p className="font-bold">{r.exam_type}</p>
                <p className="text-sm">
                  {new Date(r.exam_date).toLocaleDateString("it-IT")}
                </p>
              </div>

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
