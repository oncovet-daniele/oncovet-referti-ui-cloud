
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import RefertoCard from "../components/osr/RefertoCard";

export default function RefertiPage() {
  const [referti, setReferti] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReferti() {
      try {
        const q = query(collection(db, "referti"), orderBy("exam_date", "desc"));
        const snap = await getDocs(q);

        const list = snap.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            examType: data.exam_type || "Referto",
            patient: data.patient_name,
            owner: data.owner_name,
            mylav: data.out_of_range?.length
              ? {
                  name: data.out_of_range[0].name,
                  value: data.out_of_range[0].value,
                  state:
                    data.out_of_range[0].state || "fuori_range",
                }
              : {
                  name: "OK",
                  value: "-",
                  state: "nel_range",
                },
            ai: {
              risk: data.ai_risk,
              bullets: data.ai_summary || [],
            },
            trend: data.trend || [],
          };
        });

        setReferti(list);
      } catch (e) {
        console.error("❌ Errore nel caricamento referti:", e);
      } finally {
        setLoading(false);
      }
    }

    loadReferti();
  }, []);

  if (loading) return <p className="p-6">Caricamento referti...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">📄 Referti Recenti</h1>

      {referti.map((r) => (
        <RefertoCard
          key={r.id}
          id={r.id}
          examType={r.examType}
          patient={r.patient}
          owner={r.owner}
          mylav={r.mylav}
          ai={r.ai}
          trend={r.trend}
        />
      ))}
    </div>
  );
}
