type StatCardProps = {
  label: string;
  value: string;
  highlight?: "positive" | "negative";
};

export default function StatCard({
  label,
  value,
  highlight,
}: StatCardProps) {
  let valueColor = "text-textPrimary";

  if (highlight === "positive") valueColor = "text-primary";
  if (highlight === "negative") valueColor = "text-danger";

  return (
    <div className="bg-panel border border-panelBorder p-4 rounded-xl">
      <p className="text-xs text-textMuted">{label}</p>
      <p className={`text-lg font-semibold ${valueColor}`}>
        {value}
      </p>
    </div>
  );
}
