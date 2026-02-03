/* ===== TYPES ===== */

export type Candle = {
  time: string;
  price: number;
};

export type Trade = {
  entryPrice: number;
  exitPrice: number;
  pnl: number;
};

export type BacktestResult = {
  equityCurve: number[];
  trades: Trade[];
  totalPnL: number;
};

/* ===== MARKET DATA ===== */

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

/* ===== STRATEGIES ===== */

export function momentumStrategy(data: Candle[]): Trade[] {
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

export function meanReversionStrategy(data: Candle[]): Trade[] {
  return data.slice(2).map(d => ({
    entryPrice: d.price,
    exitPrice: d.price + 1,
    pnl: 1,
  }));
}


export function runMultiStrategyBacktest() {
  const data = generateMarketData();

  const strategies = {
    Momentum: momentumStrategy,
    MeanReversion: meanReversionStrategy,
  };

  const results: Record<string, BacktestResult> = {};

  Object.entries(strategies).forEach(([name, fn]) => {
    let equity = 100000;
    const trades = fn(data);
    const curve = [equity];

    trades.forEach(t => {
      equity += t.pnl * 100;
      curve.push(equity);
    });

    results[name] = {
      trades,
      equityCurve: curve,
      totalPnL: equity - 100000,
    };
  });

  
  return results;
}
