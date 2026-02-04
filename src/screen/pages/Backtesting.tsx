import { useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

/* =======================
   CSV EXPORT
======================= */

function exportCSV(rows: Record<string, any>[], filename: string) {
  if (!rows || rows.length === 0) return;

  const headers = Object.keys(rows[0]).join(",");
  const values = rows
    .map((row) =>
      Object.values(row)
        .map((v) => `"${v}"`)
        .join(",")
    )
    .join("\n");

  const csv = `${headers}\n${values}`;
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/* =======================
   TYPES
======================= */

type Candle = {
  time: string;
  price: number;
};

type Trade = {
  entryPrice: number;
  exitPrice: number;
  pnl: number;
};

type StrategyResult = {
  equityCurve: number[];
  trades: Trade[];
  totalPnL: number;
};

/* =======================
   MARKET DATA
======================= */

function generateMarketData(len = 120): Candle[] {
  let price = 100;
  return Array.from({ length: len }, (_, i) => {
    price += Math.random() * 4 - 2;
    return {
      time: `T${i}`,
      price: Number(Math.max(price, 1).toFixed(2)),
    };
  });
}

/* =======================
   STRATEGIES
======================= */

function momentumStrategy(data: Candle[]): Trade[] {
  const trades: Trade[] = [];
  let entry: number | null = null;

  for (let i = 1; i < data.length; i++) {
    if (data[i].price > data[i - 1].price && entry === null) {
      entry = data[i].price;
    }

    if (data[i].price < data[i - 1].price && entry !== null) {
      trades.push({
        entryPrice: entry,
        exitPrice: data[i].price,
        pnl: Number((data[i].price - entry).toFixed(2)),
      });
      entry = null;
    }
  }
  return trades;
}

function meanReversionStrategy(data: Candle[]): Trade[] {
  return data.slice(2).map((d) => ({
    entryPrice: d.price,
    exitPrice: d.price + 1,
    pnl: 1,
  }));
}

/* =======================
   BACKTEST ENGINE (PARAMETERIZED)
======================= */

function runMultiStrategyBacktest(
  capital: number,
  lotSize: number,
  fee: number
): Record<string, StrategyResult> {
  const data = generateMarketData();

  const strategies = {
    Momentum: momentumStrategy,
    MeanReversion: meanReversionStrategy,
  };

  const results: Record<string, StrategyResult> = {};

  Object.entries(strategies).forEach(([name, fn]) => {
    let equity = capital;
    const trades = fn(data);
    const curve = [equity];

    trades.forEach((t) => {
      equity += t.pnl * lotSize - fee;
      curve.push(Number(equity.toFixed(2)));
    });

    results[name] = {
      trades,
      equityCurve: curve,
      totalPnL: Number((equity - capital).toFixed(2)),
    };
  });

  return results;
}

/* =======================
   PAGE
======================= */

export default function Backtesting() {
  // ✅ STATE MUST BE INSIDE COMPONENT
  const [capital, setCapital] = useState(100000);
  const [lotSize, setLotSize] = useState(100);
  const [fee, setFee] = useState(20);

  const [results, setResults] =
    useState<Record<string, StrategyResult> | null>(null);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-lg font-semibold text-textPrimary">
        Backtesting
      </h1>

      {/* PARAMETERS */}
      <div className="flex gap-4 text-sm">
        <input
          type="number"
          value={capital}
          onChange={(e) => setCapital(+e.target.value)}
          className="bg-panel border p-2 rounded w-32"
          placeholder="Capital"
        />
        <input
          type="number"
          value={lotSize}
          onChange={(e) => setLotSize(+e.target.value)}
          className="bg-panel border p-2 rounded w-32"
          placeholder="Lot Size"
        />
        <input
          type="number"
          value={fee}
          onChange={(e) => setFee(+e.target.value)}
          className="bg-panel border p-2 rounded w-24"
          placeholder="Fee"
        />
      </div>

      <button
        onClick={() =>
          setResults(runMultiStrategyBacktest(capital, lotSize, fee))
        }
        className="bg-primary text-black px-4 py-2 rounded font-semibold"
      >
        Run Multi-Strategy Backtest
      </button>

      {results &&
        Object.entries(results).map(([strategy, result]) => (
          <div
            key={strategy}
            className="bg-panel border border-panelBorder p-4 rounded-xl space-y-4"
          >
            <h2 className="font-semibold text-textPrimary">
              {strategy} — P&L ₹{result.totalPnL}
            </h2>

            {/* CSV BUTTONS */}
            <div className="flex gap-3">
              <button
                onClick={() =>
                  exportCSV(
                    result.trades.map((t, i) => ({
                      trade: i + 1,
                      entryPrice: t.entryPrice,
                      exitPrice: t.exitPrice,
                      pnl: t.pnl,
                    })),
                    `${strategy}-trades.csv`
                  )
                }
                className="text-xs px-3 py-1 rounded bg-panel border"
              >
                Export Trades CSV
              </button>

              <button
                onClick={() =>
                  exportCSV(
                    result.equityCurve.map((v, i) => ({
                      step: i,
                      equity: v,
                    })),
                    `${strategy}-equity.csv`
                  )
                }
                className="text-xs px-3 py-1 rounded bg-panel border"
              >
                Export Equity CSV
              </button>
            </div>

            {/* EQUITY CURVE */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={result.equityCurve.map((v, i) => ({
                    step: i,
                    equity: v,
                  }))}
                >
                  <XAxis dataKey="step" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="equity" stroke="#22c55e" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
    </div>
  );
}
