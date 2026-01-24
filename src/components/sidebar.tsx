export default function Sidebar() {
  return (
    <aside className="w-56 bg-panel border-r border-panelBorder p-4">
      <p className="text-xs uppercase tracking-wider text-textMuted mb-4">
        Menu
      </p>

      <nav className="space-y-2 text-sm">
        <div className="text-primary font-semibold">
          Dashboard
        </div>

        <div className="text-textMuted hover:text-textPrimary cursor-pointer">
          Backtesting
        </div>

        <div className="text-textMuted hover:text-textPrimary cursor-pointer">
          Strategies
        </div>

        <div className="text-textMuted hover:text-textPrimary cursor-pointer">
          Trades
        </div>
      </nav>
    </aside>
  );
}
