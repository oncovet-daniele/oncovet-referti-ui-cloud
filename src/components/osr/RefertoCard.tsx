import MyLavFlag from "./MyLavFlag";
import RiskBadge from "./RiskBadge";
import AiSummary from "./AiSummary";
import TrendMiniChart from "./TrendMiniChart";

interface RefertoCardProps {
  id: string;
  examType: string;
  patient: string;
  owner: string;

  mylav: {
    name: string;
    value: number;
    state: "nel_range" | "sopra_range" | "sotto_range" | "fuori_range";
  };

  ai: {
    risk: "basso" | "medio" | "alto";
    bullets: string[];
  };

  trend: number[];
}

export default function RefertoCard({
  id,
  examType,
  patient,
  owner,
  mylav,
  ai,
  trend,
}: RefertoCardProps) {
  return (
    <div
      className="
        bg-white shadow-sm rounded-xl p-5 border border-slate-200 
        hover:shadow-md transition cursor-pointer
      "
    >
      {/* HEADER */}
      <div className="flex justify-between mb-2">
        <div className="font-bold text-lg text-slate-800">{patient}</div>
        <div className="text-sm text-slate-500">{owner}</div>
      </div>

      <div className="text-sm text-slate-400 mb-4">{examType}</div>

      {/* TABELLA */}
      <div className="rounded-lg overflow-hidden border-2 border-[#0A3A5F] mb-4">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-[#E7F1F8] text-[#0A3A5F] font-bold">
            <tr>
              <th className="p-2 border-r-2 border-[#0A3A5F]">ID</th>
              <th className="p-2 border-r-2 border-[#0A3A5F]">{mylav.name}</th>
              <th className="p-2">Trend</th>
            </tr>
          </thead>

          <tbody className="text-[#0A3A5F] font-semibold bg-white">
            <tr>
              <td className="p-2 border-r-2 border-t-2 border-[#0A3A5F]">
                {id}
              </td>

              <td className="p-2 border-r-2 border-t-2 border-[#0A3A5F]">
                {mylav.value}
              </td>

              <td className="p-2 border-t-2 border-[#0A3A5F]">
                <div className="border-2 border-[#0A3A5F] rounded-md p-1 bg-white">
                  <div className="h-10 flex items-center justify-center">
                    <TrendMiniChart trend={trend} />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* MYLAV FLAG */}
      <MyLavFlag
        name={mylav.name}
        value={mylav.value}
        state={mylav.state}
      />

      {/* RISCHIO */}
      <div className="mt-3">
        <RiskBadge level={ai.risk} />
      </div>

      {/* AI BULLETS */}
      <AiSummary bullets={ai.bullets} />

      {/* TREND GRANDE */}
      <div className="mt-4 border-2 border-[#0A3A5F] rounded-lg p-2 bg-white">
        <div className="h-16 flex items-center justify-center">
          <TrendMiniChart trend={trend} />
        </div>
      </div>
    </div>
  );
}
