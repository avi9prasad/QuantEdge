export function calculateDrawdown(equity: number[]) {
  let peak = equity[0];
  let maxDD = 0;

  for (let value of equity) {
    if (value > peak) peak = value;
    const dd = ((peak - value) / peak) * 100;
    if (dd > maxDD) maxDD = dd;
  }

  return maxDD.toFixed(2);
}
