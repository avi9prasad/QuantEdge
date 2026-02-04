import express from "express";
import Backtest from "../models/Backtest";

const router = express.Router();

/**
 * Save a backtest
 * POST /api/backtests
 */
router.post("/", async (req, res) => {
  try {
    const backtest = await Backtest.create(req.body);
    res.json(backtest);
  } catch (err) {
    res.status(500).json({ error: "Failed to save backtest" });
  }
});

/**
 * Get all backtests
 * GET /api/backtests
 */
router.get("/", async (_req, res) => {
  try {
    const backtests = await Backtest.find().sort({ createdAt: -1 });
    res.json(backtests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch backtests" });
  }
});

export default router;
