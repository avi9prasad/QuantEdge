import StatCard from "../../components/StatCard";
import EquityCurve from "../../components/EquityCurve";
import Leaderboard from "../../components/LeaderBoard";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Top KPI cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Wallet Balance"
          value="₹1,00,000"
        />

        <StatCard
          label="Today's P&L"
          value="+₹2,450"
          highlight="positive"
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
      <EquityCurve />

      {/* Leaderboard */}
      <Leaderboard />
    </div>
  );
}
