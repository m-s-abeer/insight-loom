const express = require("express");
const router = express.Router();
const insightController = require("../controllers/insightController");
const authMiddleware = require("../middlewares/authMiddleware");
const interactionController = require("../controllers/interactionController");

router.use(authMiddleware.authenticateUser);

router.get("/", insightController.getAllInsights);

router.post("/", insightController.createInsight);

router.delete("/:insightId", insightController.deleteInsight);

router.get("/:insightId/comments", interactionController.getCommentsForInsight);

router.post(
  "/:insightId/comments",
  interactionController.createCommentForInsight,
);

module.exports = router;
