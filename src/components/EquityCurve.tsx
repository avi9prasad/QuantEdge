import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

type EquityPoint = {
  time: string;
  equity: number;
};

function getCurrentTime() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function EquityCurve() {
  const [data, setData] = useState<EquityPoint[]>([
    { time: "09:15", equity: 100000 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1];

        // Simulate market movement
        const change = Math.floor(Math.random() * 600 - 300); // ±300
        const nextEquity = Math.max(95000, last.equity + change);

        const nextPoint: EquityPoint = {
          time: getCurrentTime(),
          equity: nextEquity,
        };

        // Keep last 20 points only (like real terminals)
        return [...prev.slice(-19), nextPoint];
      });
    }, 2000); // update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-panel border border-panelBorder p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-textPrimary">
          Equity Curve
        </h3>
        <span className="text-xs text-textMuted">
          Live • Paper Trading
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="time"
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
              domain={["dataMin - 500", "dataMax + 500"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#121a2f",
                border: "1px solid #1f2a44",
                color: "#e5e7eb",
              }}
            />
            <Line
              type="monotone"
              dataKey="equity"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
              isAnimationActive
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
