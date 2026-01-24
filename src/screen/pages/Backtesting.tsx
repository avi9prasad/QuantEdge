export default function Backtesting() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-lg font-semibold text-textPrimary">
        Backtesting
      </h1>

      <div className="bg-panel border border-panelBorder p-6 rounded-xl">
        <p className="text-textMuted text-sm mb-4">
          Select a strategy and time range to run a backtest.
        </p>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-textMuted">
              Strategy
            </label>
            <select className="w-full mt-1 bg-background border border-panelBorder p-2 rounded text-textPrimary">
              <option>Momentum</option>
              <option>Mean Reversion</option>
              <option>Breakout</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-textMuted">
              Start Date
            </label>
            <input
              type="date"
              className="w-full mt-1 bg-background border border-panelBorder p-2 rounded text-textPrimary"
            />
          </div>

          <div>
            <label className="text-xs text-textMuted">
              End Date
            </label>
            <input
              type="date"
              className="w-full mt-1 bg-background border border-panelBorder p-2 rounded text-textPrimary"
            />
          </div>
        </div>

        <button className="mt-6 bg-primary text-black px-4 py-2 rounded font-semibold">
          Run Backtest
        </button>
      </div>

      <div className="bg-panel border border-panelBorder p-6 rounded-xl text-textMuted">
        Backtest results will appear here (equity curve, trades, metrics).
      </div>
    </div>
  );
}
