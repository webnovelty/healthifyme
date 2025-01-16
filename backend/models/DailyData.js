const mongoose = require("mongoose");

const DailyDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  water: { type: Number, default: 0 },
  steps: { type: Number, default: 0 },
  calories: { type: Number, default: 0 },
});

module.exports = mongoose.model("DailyData", DailyDataSchema);
