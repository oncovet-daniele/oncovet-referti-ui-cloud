interface RiskBadgeProps {
  level: "basso" | "medio" | "alto";
}

export default function RiskBadge({ level }: RiskBadgeProps) {
  const styles = {
    basso: "bg-green-100 text-green-700 border-green-300",
    medio: "bg-yellow-100 text-yellow-700 border-yellow-300",
    alto: "bg-red-100 text-red-700 border-red-300",
  }[level];

  const label = {
    basso: "BASSO RISCHIO",
    medio: "MEDIO RISCHIO",
    alto: "ALTO RISCHIO",
  }[level];

  return (
    <span
      className={`px-3 py-1 text-sm font-semibold border rounded-lg ${styles}`}
    >
      {label}
    </span>
  );
}
