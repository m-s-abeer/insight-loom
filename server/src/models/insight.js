const mongoose = require("mongoose");

const insightSchema = new mongoose.Schema({
  text: String,
  timestamp: { type: Date, default: Date.now },
});

const Insight = mongoose.model("Insight", insightSchema);

module.exports = Insight;
