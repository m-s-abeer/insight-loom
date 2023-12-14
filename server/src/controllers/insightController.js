const insightServices = require("../services/insightServices");

async function getAllInsights(req, res) {
  try {
    const allInsights = await insightServices.getAllInsightsService();
    res.status(200).json(allInsights);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createInsight(req, res) {
  const { text } = req.body;

  try {
    const newInsight = await insightServices.createInsightService(text);
    res.status(201).json(newInsight);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteInsight(req, res) {
  const { insightId } = req.params;

  try {
    const deletedInsight =
      await insightServices.deleteInsightService(insightId);

    if (!deletedInsight) {
      return res.status(404).json({ error: "Insight not found" });
    }

    res.status(204).json(deletedInsight);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllInsights,
  createInsight,
  deleteInsight,
};
