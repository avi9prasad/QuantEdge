type Strategy = {
  name: string;
  equity: number;
  pnl: number;
};

export default function StrategyComparison({
  strategies,
}: {
  strategies: Strategy[];
}) {
  if (strategies.length === 0) return null;

  const best = strategies[0];
  const worst = strategies[strategies.length - 1];

  return (
    <div className="bg-panel border border-panelBorder p-6 rounded-xl">
      <h3 className="text-sm font-semibold text-textPrimary mb-4">
        Strategy Comparison
      </h3>

      <div className="grid grid-cols-3 gap-4 text-sm">
        {strategies.map((s) => (
          <div
            key={s.name}
            className="border border-panelBorder rounded-lg p-4"
          >
            <p className="text-textMuted text-xs mb-1">
              Strategy
            </p>
            <p className="font-semibold text-textPrimary mb-2">
              {s.name}
            </p>

            <p className="text-textMuted text-xs">
              Equity
            </p>
            <p className="text-textPrimary mb-2">
              ₹{s.equity.toLocaleString()}
            </p>

            <p className="text-textMuted text-xs">
              P&L
            </p>
            <p
              className={
                s.pnl >= 0
                  ? "text-primary font-semibold"
                  : "text-danger font-semibold"
              }
            >
              {s.pnl >= 0 ? "+" : ""}₹{s.pnl.toLocaleString()}
            </p>

            {s.name === best.name && (
              <div className="mt-3 text-xs text-primary">
                🏆 Best Performer
              </div>
            )}

            {s.name === worst.name && (
              <div className="mt-3 text-xs text-danger">
                ⚠ Underperforming
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
