const express = require("express");
const interactionController = require("../controllers/interactionController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware.authenticateUser);

// router.delete("/:commentId", interactionController.deleteComment); // TODO: Implement when storing userHash in comment so it's verifiable

router.post("/comments/:commentId/react", interactionController.reactOnComment);

router.get("/comments/:commentId", interactionController.getCommentById);

// router.delete("/:commentId", interactionController.deleteComment); // TODO: Implement when storing userHash in comment so it's verifiable

module.exports = router;
