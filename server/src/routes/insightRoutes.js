const express = require("express");
const router = express.Router();
const insightController = require("../controllers/insightController");

router.get("/", insightController.getAllInsights);

router.post("/", insightController.createInsight);

router.delete("/:insightId", insightController.deleteInsight);

module.exports = router;
