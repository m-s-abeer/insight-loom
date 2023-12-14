const Insight = require("../models/insight");

async function getAllInsightsService() {
  const allInsights = await Insight.find();
  return allInsights;
}

async function createInsightService(text) {
  if (!text) {
    throw new Error("Text is required for the insight.");
  }

  const newInsight = new Insight({ text });
  await newInsight.save();

  return newInsight;
}

async function deleteInsightService(insightId) {
  const deletedInsight = await Insight.findByIdAndDelete(insightId);
  return deletedInsight;
}

module.exports = {
  getAllInsightsService,
  createInsightService,
  deleteInsightService,
};
