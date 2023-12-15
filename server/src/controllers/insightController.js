const insightServices = require("../services/insightServices");

async function getAllInsights(req, res) {
  try {
    const allInsights = await insightServices.getAllInsightsWithReactions(
      req.user.id,
    );
    res.status(200).json(allInsights);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const getInsightById = async (req, res) => {
  try {
    const insightId = req.params.insightId;
    const insight = await insightServices.getInsightByIdWithReactions(
      insightId,
      req.user.id,
    );

    if (!insight) {
      return res.status(404).json({ message: "Insight not found" });
    }

    res.status(200).json({ insight });
  } catch (error) {
    console.error("Error fetching insight by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

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
  getInsightById,
  createInsight,
  deleteInsight,
};
