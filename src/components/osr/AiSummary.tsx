interface AiSummaryProps {
  bullets: string[];
}

export default function AiSummary({ bullets }: AiSummaryProps) {
  if (!bullets || bullets.length === 0) return null;

  return (
    <ul className="mt-2 space-y-1">
      {bullets.map((b, i) => (
        <li key={i} className="text-sm text-slate-700 flex items-start">
          <span className="text-blue-500 mr-2">•</span>
          {b}
        </li>
      ))}
    </ul>
  );
}
