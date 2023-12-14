const interactionServices = require("../services/interactionServices");

async function createCommentForInsight(req, res) {
  try {
    const { insightId } = req.params;
    const { text } = req.body;

    const savedComment = await interactionServices.createCommentForInsight(
      text,
      insightId,
    );

    return res.status(201).json(savedComment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getCommentsForInsight(req, res) {
  try {
    const { insightId } = req.params;

    const comments = await interactionServices.getCommentsForInsight(insightId);

    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
async function deleteComment(req, res) {
  try {
    const { commentId } = req.params;

    const deletedComment = await interactionServices.deleteComment(commentId);

    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createCommentForInsight,
  getCommentsForInsight,
  deleteComment,
};
