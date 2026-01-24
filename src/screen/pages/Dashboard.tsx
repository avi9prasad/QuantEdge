import { useEffect, useState } from "react";
import StatCard from "../../components/StatCard";
import EquityCurve from "../../components/EquityCurve";
import Leaderboard from "../../components/LeaderBoard";
import StrategyComparison from "../../components/StrategyComparison";

/* ---------------- TYPES ---------------- */

type EquityPoint = {
  time: string;
  equity: number;
};

type Strategy = {
  name: string;
  equity: number;
  pnl: number;
};

/* ---------------- HELPERS ---------------- */

function getCurrentTime() {
  const d = new Date();
  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ---------------- DASHBOARD ---------------- */

export default function Dashboard() {
  /* ===== SOURCE OF TRUTH ===== */
  const startingEquity = 100000;

  // 1️⃣ Equity curve data (shared)
  const [equityData, setEquityData] = useState<EquityPoint[]>([
    { time: "09:15", equity: startingEquity },
  ]);

  // 2️⃣ Strategy data (shared)
  const [strategies, setStrategies] = useState<Strategy[]>([
    { name: "Momentum", equity: startingEquity, pnl: 0 },
    { name: "Mean Reversion", equity: startingEquity, pnl: 0 },
    { name: "Breakout", equity: startingEquity, pnl: 0 },
  ]);

  /* ===== LIVE UPDATE ENGINE ===== */
  useEffect(() => {
    const interval = setInterval(() => {
      // Update overall equity
      setEquityData((prev) => {
        const last = prev[prev.length - 1];
        const change = Math.floor(Math.random() * 600 - 300);
        const nextEquity = Math.max(95000, last.equity + change);

        return [
          ...prev.slice(-19),
          { time: getCurrentTime(), equity: nextEquity },
        ];
      });

      // Update strategies independently
      setStrategies((prev) =>
        prev
          .map((s) => {
            const change = Math.floor(Math.random() * 800 - 400);
            const nextEquity = Math.max(90000, s.equity + change);

            return {
              ...s,
              equity: nextEquity,
              pnl: nextEquity - startingEquity,
            };
          })
          .sort((a, b) => b.pnl - a.pnl)
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  /* ===== DERIVED VALUES ===== */
  const currentEquity =
    equityData[equityData.length - 1].equity;

  const todaysPnL = currentEquity - startingEquity;

  /* ---------------- RENDER ---------------- */

  return (
    <div className="p-6 space-y-6">
      {/* KPI CARDS */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Wallet Balance"
          value={`₹${currentEquity.toLocaleString()}`}
        />

        <StatCard
          label="Today's P&L"
          value={`${todaysPnL >= 0 ? "+" : ""}₹${todaysPnL.toLocaleString()}`}
          highlight={todaysPnL >= 0 ? "positive" : "negative"}
        />

        <StatCard
          label="Win Rate"
          value="68%"
        />

        <StatCard
          label="Active Strategy"
          value={strategies[0]?.name}
        />
      </div>

      {/* ✅ FINAL RENDER ORDER (THIS IS WHAT YOU ASKED) */}
      <EquityCurve data={equityData} />
      <Leaderboard strategies={strategies} />
      <StrategyComparison strategies={strategies} />
    </div>
  );
}
