const Insight = require("../models/insight");
const { getReactionCounts, getUserReaction } = require("./interactionServices");

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

  return {
    insight: newInsight,
    reactions: {},
    userReaction: null,
  };
}

async function deleteInsightService(insightId) {
  const deletedInsight = await Insight.findByIdAndDelete(insightId);
  return deletedInsight;
}

async function getAllInsightsWithReactions(userId) {
  try {
    const insights = await Insight.find().sort({ timestamp: -1 });

    const insightsWithReactions = await Promise.all(
      insights.map(async (insight) => {
        const reactionCounts = await getReactionCounts(insight._id);
        const userReaction = await getUserReaction(insight._id, userId);

        return {
          insight,
          reactions: reactionCounts,
          userReaction,
        };
      }),
    );

    return insightsWithReactions;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get insights with reactions");
  }
}

async function getInsightByIdWithReactions(insightId, userId) {
  try {
    const insight = await Insight.findById(insightId);

    if (!insight) {
      return null;
    }

    const reactionCounts = await getReactionCounts(insight._id);
    const userReaction = await getUserReaction(insightId, userId);

    const insightWithReactions = {
      insight,
      reactions: reactionCounts,
      userReaction,
    };

    return insightWithReactions;
  } catch (error) {
    console.error(
      "Error fetching insight by ID with reactions from the database:",
      error,
    );
    throw error; // Rethrow the error to be caught by the controller
  }
}

module.exports = {
  getAllInsightsService,
  getAllInsightsWithReactions,
  getInsightByIdWithReactions,
  createInsightService,
  deleteInsightService,
};
