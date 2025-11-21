import React from "react";

interface TrendMiniChartProps {
  trend: number[];
}

export default function TrendMiniChart({ trend }: TrendMiniChartProps) {
  if (!trend || trend.length === 0) {
    return (
      <div className="text-slate-400 italic text-xs">
        Nessun dato storico
      </div>
    );
  }

  // Normalizza valori
  const min = Math.min(...trend);
  const max = Math.max(...trend);
  const range = max - min || 1;

  const points = trend.map((v, i) => {
    const x = (i / (trend.length - 1)) * 100;
    const y = 100 - ((v - min) / range) * 100;
    return { x, y };
  });

  // Colori stile OSR (rosso → arancio → blu chiaro)
  const pointColors = ["#FF6B6B", "#FFB84C", "#4CC9F0"];

  return (
    <div
      className="
        border-2 border-[#4CC9F0] 
        bg-[#E9F8FF] 
        rounded-md 
        p-1 
        w-[120px] 
        h-[60px] 
        flex 
        items-center 
        justify-center
      "
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* LINEA PRINCIPALE */}
        <polyline
          fill="none"
          stroke="#0A3A5F"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        />

        {/* PUNTI colorati */}
        {points.map((p, i) => (
          <g key={i}>
            {/* bordo bianco */}
            <circle cx={p.x} cy={p.y} r="5" fill="white" />
            {/* colore */}
            <circle
              cx={p.x}
              cy={p.y}
              r="3"
              fill={pointColors[i % pointColors.length]}
              stroke="#0A3A5F"
              strokeWidth="0.7"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
