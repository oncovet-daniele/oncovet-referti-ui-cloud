import RefertoCard from "../components/osr/RefertoCard";

export default function RefertiPage() {
  // MOCK DATA — presto li sostituiremo con Firestore
  const refertiMock = [
    {
      id: "1",
      examType: "Emogramma",
      patient: "Zeus",
      owner: "Roberta P.",
      mylav: {
        name: "WBC",
        value: 19.6,
        state: "fuori_range" as const,
      },
      ai: {
        risk: "medio" as const,
        bullets: [
          "Leucocitosi marcata",
          "Possibile processo infiammatorio acuto",
        ],
      },
      trend: [12.1, 13.3, 14.1, 15.2, 19.6],
    },
    {
      id: "2",
      examType: "Emogramma",
      patient: "Luna",
      owner: "Marta R.",
      mylav: {
        name: "MNO",
        value: 1.24,
        state: "fuori_range" as const,
      },
      ai: {
        risk: "basso" as const,
        bullets: ["Monocitosi moderata", "Probabile infiammazione cronica lieve"],
      },
      trend: [0.8, 0.9, 1.1, 1.2, 1.24],
    },
    {
      id: "3",
      examType: "Emogramma",
      patient: "Milo",
      owner: "Enrico M.",
      mylav: {
        name: "HGB",
        value: 13.4,
        state: "nel_range" as const,
      },
      ai: {
        risk: "basso" as const,
        bullets: ["Parametri stabili", "Nessuna anomalia significativa"],
      },
      trend: [13.0, 13.2, 13.4, 13.4, 13.4],
    },
  ];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">📄 Referti Recenti</h1>

      {refertiMock.map((r) => (
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
