import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type EquityPoint = {
  time: string;
  equity: number;
};

export default function EquityCurve({
  data,
}: {
  data: EquityPoint[];
}) {
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
            <XAxis dataKey="time" stroke="#9ca3af" />
            <YAxis
              stroke="#9ca3af"
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
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
