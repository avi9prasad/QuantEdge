import express from "express";
import { connectDB } from "./db";
import backtests from "./routes/backtests";

const app = express();

app.use(express.json());

connectDB();

app.use("/api/backtests", backtests);

app.get("/", (_req, res) => {
  res.send("QuantEdge backend running");
});

app.listen(4000, () => {
  console.log("🚀 Server running on http://localhost:4000");
});
