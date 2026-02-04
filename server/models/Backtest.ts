import mongoose from "mongoose";

const BacktestSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  result: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Backtest", BacktestSchema);
