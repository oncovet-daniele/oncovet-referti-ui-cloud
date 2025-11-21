interface MyLavFlagProps {
  name: string;  // nome analita, es: "WBC"
  value: number;
  state: "nel_range" | "sopra_range" | "sotto_range" | "fuori_range";
}

export default function MyLavFlag({ name, value, state }: MyLavFlagProps) {
  const color = {
    nel_range: "text-green-600",
    sopra_range: "text-yellow-600",
    sotto_range: "text-blue-600",
    fuori_range: "text-red-600",
  }[state];

  const arrow = {
    nel_range: "",
    sopra_range: "▼",
    sotto_range: "▲",
    fuori_range: "▲",
  }[state];

  return (
    <div className="flex flex-col">
      {/* Label MyLav + valore */}
      <div className="flex items-center space-x-2">
        <span className="px-2 py-1 bg-gray-200 rounded text-sm font-semibold">
          MyLav
        </span>

        <span className={`${color} font-bold text-xl`}>
          {value} {arrow}
        </span>
      </div>

      {/* Stato */}
      <div className={`${color} text-sm font-semibold mt-1`}>
        {state.replace("_", " ").toUpperCase()}
      </div>
    </div>
  );
}
