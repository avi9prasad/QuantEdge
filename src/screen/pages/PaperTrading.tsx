import { useEffect, useState } from "react";
import { paperTradeTick } from "../../services/paperEngine";

export default function PaperTrading() {
  const [price, setPrice] = useState(100);
  const [pnl, setPnl] = useState(0);
  const [entry, setEntry] = useState<number | null>(null);

  useEffect(() => {
    const i = setInterval(() => {
      const newPrice = price + Math.random() * 2 - 1;
      setPrice(newPrice);

      const r = paperTradeTick(newPrice, entry ? 1 : 0, entry);
      if (r?.pnl) setPnl((p) => p + r.pnl);
      if (r?.entry !== undefined) setEntry(r.entry);
    }, 1000);

    return () => clearInterval(i);
  }, [price, entry]);

  return (
    <div className="p-6">
      <h1>Paper Trading</h1>
      <p>Price: {price.toFixed(2)}</p>
      <p>P&L: {pnl.toFixed(2)}</p>
    </div>
  );
}
