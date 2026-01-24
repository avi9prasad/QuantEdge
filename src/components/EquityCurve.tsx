import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const equityData = [
  { time: "09:15", equity: 100000 },
  { time: "09:30", equity: 100200 },
  { time: "09:45", equity: 100150 },
  { time: "10:00", equity: 100450 },
  { time: "10:15", equity: 100900 },
  { time: "10:30", equity: 101200 },
];

export default function EquityCurve() {
  return (
    <div className="bg-panel border border-panelBorder p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-textPrimary">
          Equity Curve
        </h3>
        <span className="text-xs text-textMuted">
          Paper Trading
        </span>
      </div>

      {/* Chart container MUST have height */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={equityData}>
            <XAxis
              dataKey="time"
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
              domain={["dataMin - 200", "dataMax + 200"]}
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
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
