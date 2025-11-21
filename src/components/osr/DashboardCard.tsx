import MyLavFlag from "./MyLavFlag";
import RiskBadge from "./RiskBadge";
import TrendMiniChart from "./TrendMiniChart";

interface DashboardCardProps {
  id: string;
  patient: string;
  owner: string;
  examType: string;

  mylav: {
    name: string;
    value: number;
    state: "nel_range" | "sopra_range" | "sotto_range" | "fuori_range";
  };

  trend: number[];
}

export default function DashboardCard({
  id,
  patient,
  owner,
  examType,
  mylav,
  trend,
}: DashboardCardProps) {
  return (
    <div
      className="
        bg-white rounded-2xl shadow-md border border-slate-200
        p-5 flex flex-col gap-4
        transition hover:shadow-lg cursor-pointer
        max-w-[360px] w-full   /* CARD COMPATTA */
      "
    >
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <div className="text-lg font-semibold text-slate-900">{patient}</div>
          <div className="text-sm font-medium text-slate-500">{owner}</div>
        </div>
      </div>

      {/* TIPO ESAME */}
      <div className="text-sm text-slate-400 font-medium -mt-2">
        {examType}
      </div>

      {/* ANALITA MYLAV (placeholder se mancante) */}
      <div className="h-8 flex items-center mt-1">
        {mylav?.name ? (
          <MyLavFlag
            name={mylav.name}
            value={mylav.value}
            state={mylav.state}
          />
        ) : (
          <div className="h-6"></div>
        )}
      </div>

      {/* TREND MINI-CHART */}
      <div
        className="
          w-full border border-[#0A3A5F]/40 rounded-md p-2 bg-[#EAF6FF]
          flex items-center justify-center
          h-20
        "
      >
        <TrendMiniChart trend={trend} />
      </div>

      {/* RISK BADGE */}
      <div className="mt-1">
        <RiskBadge level="basso" />
      </div>
    </div>
  );
}
