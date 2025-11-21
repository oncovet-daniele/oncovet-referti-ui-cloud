export default function AiPreviewBox({
  bullets,
}: {
  bullets: string[];
}) {
  return (
    <div className="border border-[#A3CEF1] bg-[#F5FAFF] rounded-md p-2 w-40 h-20 text-xs overflow-hidden">
      <ul className="list-disc ml-3 text-slate-600 leading-tight">
        {bullets.slice(0, 2).map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}
