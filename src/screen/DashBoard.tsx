import { useEffect, useState } from "react";
import { ASSETS } from "../services/assets";
import { runStrategy } from "../services/strategyEngine";
import { calculateDrawdown } from "../services/equityAnalytics";
import EquityCurve from "../component/EquityCurve";

export default function Dashboard() {
  const [asset, setAsset] = useState(ASSETS[0]);
  const [prices, setPrices] = useState<number[]>([]);

  useEffect(() => {
    let price = asset.base;

    const id = setInterval(() => {
      price += (Math.random() - 0.5) * 20;
      setPrices((p) => [...p.slice(-50), Number(price.toFixed(2))]);
    }, 2000);

    return () => clearInterval(id);
  }, [asset]);

  const signal = runStrategy(prices);
  const equity = prices.map((_, i) => 100000 + i * (signal === "BUY" ? 30 : -15));
  const drawdown = calculateDrawdown(equity);

  return (
    <div style={{ background: "#111827", color: "white", minHeight: "100vh", padding: 20 }}>
      <h1>Quant Trading Dashboard</h1>

      <select
        onChange={(e) => setAsset(ASSETS[Number(e.target.value)])}
        style={{ padding: 8, marginBottom: 12 }}
      >
        {ASSETS.map((a, i) => (
          <option key={a.symbol} value={i}>
            {a.symbol}
          </option>
        ))}
      </select>

      <p>Strategy Signal: <b>{signal}</b></p>

      <EquityCurve data={equity} />

      <p style={{ marginTop: 10, color: "red" }}>
        Max Drawdown: {drawdown}%
      </p>
    </div>
  );
}
