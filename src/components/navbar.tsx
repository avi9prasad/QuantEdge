export default function Navbar() {
  return (
    <div className="h-14 bg-panel border-b border-panelBorder flex items-center justify-between px-6">
      <h1 className="font-semibold text-lg tracking-wide text-textPrimary">
        QuantEdge
      </h1>

      <span className="text-sm text-textMuted">
        Paper Trading Mode
      </span>
    </div>
  );
}
