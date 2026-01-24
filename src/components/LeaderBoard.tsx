type Strategy = {
  name: string;
  pnl: number;
};

const strategies: Strategy[] = [
  { name: "Momentum", pnl: 4200 },
  { name: "Mean Reversion", pnl: 2800 },
  { name: "Breakout", pnl: -1200 },
];

export default function Leaderboard() {
  return (
    <div className="bg-panel border border-panelBorder p-6 rounded-xl">
      <h3 className="text-sm font-semibold text-textPrimary mb-4">
        Strategy Leaderboard
      </h3>

      <div className="space-y-3">
        {strategies.map((s, i) => (
          <div
            key={i}
            className="flex justify-between items-center text-sm"
          >
            <span className="text-textPrimary">
              {s.name}
            </span>

            <span
              className={
                s.pnl >= 0
                  ? "text-primary font-medium"
                  : "text-danger font-medium"
              }
            >
              ₹{s.pnl}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
