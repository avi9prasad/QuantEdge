import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-56 bg-panel border-r border-panelBorder p-4">
      <p className="text-xs uppercase tracking-wider text-textMuted mb-4">
        Menu
      </p>

      <nav className="space-y-2 text-sm">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "block text-primary font-semibold"
              : "block text-textMuted hover:text-textPrimary"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/backtesting"
          className={({ isActive }) =>
            isActive
              ? "block text-primary font-semibold"
              : "block text-textMuted hover:text-textPrimary"
          }
        >
          Backtesting
        </NavLink>
      </nav>
    </aside>
  );
}
