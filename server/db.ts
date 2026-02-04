import mongoose from "mongoose";

export async function connectDB() {
  try {
    const MONGO_URL =
      process.env.MONGO_URL || "mongodb://127.0.0.1:27017/quantedge";

    await mongoose.connect(MONGO_URL);

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed", error);
    process.exit(1);
  }
}
