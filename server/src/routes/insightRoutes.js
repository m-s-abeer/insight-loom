const express = require("express");
const router = express.Router();
const insightController = require("../controllers/insightController");
const interactionController = require("../controllers/interactionController");

router.get("/", insightController.getAllInsights);

router.post("/", insightController.createInsight);

router.delete("/:insightId", insightController.deleteInsight);

router.get("/:insightId/comments", interactionController.getCommentsForInsight);

router.post(
  "/:insightId/comments",
  interactionController.createCommentForInsight,
);

module.exports = router;
