const express = require("express");
const authRoutes = require("./authRoutes");
const channelRoutes = require("./channelRoutes");
const insightRoutes = require("./insightRoutes");
const interactionRoutes = require("./interactionRoutes");

const router = express.Router();

router.get("/status", (req, res) => {
  res.send("Hello, InsightLoom!");
});

router.use("/auth", authRoutes);
router.use("/channels", channelRoutes);
router.use("/insights", insightRoutes);
router.use("/interactions", interactionRoutes); // Updated

module.exports = router;
