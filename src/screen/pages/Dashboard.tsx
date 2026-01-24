import { useEffect, useState } from "react";
import StatCard from "../../components/StatCard";
import EquityCurve from "../../components/EquityCurve";
import Leaderboard from "../../components/LeaderBoard";

type EquityPoint = {
  time: string;
  equity: number;
};

function getCurrentTime() {
  const d = new Date();
  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Dashboard() {
  const startingEquity = 100000;

  const [equityData, setEquityData] = useState<EquityPoint[]>([
    { time: "09:15", equity: startingEquity },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEquityData((prev) => {
        const last = prev[prev.length - 1];
        const change = Math.floor(Math.random() * 600 - 300);
        const nextEquity = Math.max(95000, last.equity + change);

        return [
          ...prev.slice(-19),
          { time: getCurrentTime(), equity: nextEquity },
        ];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const currentEquity =
    equityData[equityData.length - 1].equity;

  const todaysPnL = currentEquity - startingEquity;

  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
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
          value="Momentum"
        />
      </div>

      {/* Equity Curve */}
      <EquityCurve data={equityData} />

      {/* Leaderboard */}
      <Leaderboard />
    </div>
  );
}
