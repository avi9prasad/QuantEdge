import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function EquityCurve({ data }: { data: number[] }) {
  const chartData = data.map((v, i) => ({ i, v }));

  return (
    <div style={{ background: "#1f2937", padding: 12, borderRadius: 8 }}>
      <h3>Equity Curve</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <Line dataKey="v" stroke="#22c55e" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
