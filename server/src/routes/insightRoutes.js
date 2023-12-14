const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get global insights");
});

router.post("/", (req, res) => {
  res.send("Post a global insight");
});

module.exports = router;
