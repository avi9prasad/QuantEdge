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
   BACKTEST ENGINE
======================= */

function runMultiStrategyBacktest(): Record<string, StrategyResult> {
  const data = generateMarketData();

  const strategies = {
    Momentum: momentumStrategy,
    MeanReversion: meanReversionStrategy,
  };

  const results: Record<string, StrategyResult> = {};

  Object.entries(strategies).forEach(([name, fn]) => {
    let equity = 100000;
    const trades = fn(data);
    const curve = [equity];

    trades.forEach((t) => {
      equity += t.pnl * 100;
      curve.push(Number(equity.toFixed(2)));
    });

    results[name] = {
      trades,
      equityCurve: curve,
      totalPnL: Number((equity - 100000).toFixed(2)),
    };
  });

  return results;
}

/* =======================
   PAGE
======================= */

export default function Backtesting() {
  const [results, setResults] =
    useState<Record<string, StrategyResult> | null>(null);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-lg font-semibold text-textPrimary">
        Backtesting
      </h1>

      <button
        onClick={() => setResults(runMultiStrategyBacktest())}
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

            {/* Equity Curve */}
            {result.equityCurve.length > 1 && (
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
                    <Line
                      dataKey="equity"
                      stroke="#22c55e"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Trade Table */}
            {result.trades.length > 0 && (
              <table className="w-full text-sm">
                <thead className="text-textMuted">
                  <tr>
                    <th>Entry</th>
                    <th>Exit</th>
                    <th>P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {result.trades.map((t, i) => (
                    <tr key={`${strategy}-trade-${i}`}>
                      <td>{t.entryPrice}</td>
                      <td>{t.exitPrice}</td>
                      <td
                        className={
                          t.pnl >= 0
                            ? "text-primary"
                            : "text-danger"
                        }
                      >
                        {t.pnl}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
    </div>
  );
}
