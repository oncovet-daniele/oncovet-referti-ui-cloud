interface TrendBoxProps {
  title?: string;
  trend: number[];
}

export default function TrendBox({ title = "Trend", trend }: TrendBoxProps) {
  return (
    <div className="border rounded-lg p-3 bg-white shadow-sm mt-3">
      <div className="text-xs font-bold text-slate-600 mb-2">{title}</div>

      <div className="h-20">
        {/* Inseriamo qui il MiniChart esistente */}
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke="#4CC9F0"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={trend
              .map((v, i) => `${(i / (trend.length - 1)) * 100},${100 - v}`)
              .join(" ")}
          />

          {trend.map((v, i) => (
            <circle
              key={i}
              cx={(i / (trend.length - 1)) * 100}
              cy={100 - v}
              r={3}
              fill="#4CC9F0"
              stroke="white"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
