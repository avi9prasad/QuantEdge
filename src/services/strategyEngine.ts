export function runStrategy(prices: number[]) {
  if (prices.length < 2) return "HOLD";
  const last = prices[prices.length - 1];
  const prev = prices[prices.length - 2];
  return last > prev ? "BUY" : "SELL";
}
