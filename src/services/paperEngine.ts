export function paperTradeTick(
  price: number,
  position: number,
  entry: number | null
) {
  if (!entry && Math.random() > 0.7) return { position: 1, entry: price };
  if (entry && Math.random() > 0.8)
    return { position: 0, entry: null, pnl: price - entry };

  return { position, entry };
}
