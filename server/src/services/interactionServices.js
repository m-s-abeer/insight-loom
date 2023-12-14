const Comment = require("../models/comment");
const Insight = require("../models/insight");

async function createCommentForInsight(text, insightId) {
  try {
    const insight = await Insight.findById(insightId);
    if (!insight) {
      throw new Error("Insight not found");
    }

    const newComment = new Comment({
      text,
      insightId,
    });

    const savedComment = await newComment.save();

    return savedComment;
  } catch (error) {
    throw new Error("Failed to create comment");
  }
}

async function getCommentsForInsight(insightId) {
  try {
    const comments = await Comment.find({ insightId });

    return comments;
  } catch (error) {
    console.error(error);
    throw new Error("Could not find any comments for this insight");
  }
}

async function deleteComment(commentId) {
  const deletedComment = await Comment.findByIdAndDelete(commentId);
  return deletedComment;
}

module.exports = {
  createCommentForInsight,
  getCommentsForInsight,
  deleteComment,
};
