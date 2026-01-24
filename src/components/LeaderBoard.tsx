import StrategyComparison from "./StrategyComparison";

type Strategy = {
  name: string;
  equity: number;
  pnl: number;
};

export default function Leaderboard({
  strategies,
}: {
  strategies: Strategy[];
}) {
  return (
    <div className="bg-panel border border-panelBorder p-6 rounded-xl">
      <h3 className="text-sm font-semibold text-textPrimary mb-4">
        Strategy Leaderboard
      </h3>

      <div className="space-y-3">
        {strategies.map((s, i) => (
          <div
            key={s.name}
            className="flex justify-between items-center text-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-textMuted">
                #{i + 1}
              </span>
              <span className="text-textPrimary font-medium">
                {s.name}
              </span>
            </div>

            <span
              className={
                s.pnl >= 0
                  ? "text-primary font-semibold"
                  : "text-danger font-semibold"
              }
            >
              {s.pnl >= 0 ? "+" : ""}₹{s.pnl.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
  {/* Strategy Comparison */}
  <StrategyComparison strategies={strategies} />

}
