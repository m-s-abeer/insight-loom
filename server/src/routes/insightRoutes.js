const express = require("express");
const router = express.Router();
const insightController = require("../controllers/insightController");
const authMiddleware = require("../middlewares/authMiddleware");
const interactionController = require("../controllers/interactionController");

router.use(authMiddleware.authenticateUser);

router.get("/", insightController.getAllInsights);

router.post("/", insightController.createInsight);

router.get("/:insightId", insightController.getInsightById);

// router.delete("/:insightId", insightController.deleteInsight); // TODO: Implement when storing userHash in insight so it's verifiable

router.get("/:insightId/comments", interactionController.getCommentsForInsight);

router.post(
  "/:insightId/comments",
  interactionController.createCommentForInsight,
);

router.post("/:insightId/react", interactionController.reactOnInsight);

module.exports = router;
