const Comment = require("../models/comment");
const Insight = require("../models/insight");
const Reaction = require("../models/reaction");
const { hashUserIdentifier } = require("./utils");

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

async function reactOnInsight(insightId, userId, reactionType) {
  const hashedUserId = hashUserIdentifier(userId);

  const existingReaction = await Reaction.findOne({
    targetId: insightId,
    userHash: hashedUserId,
  });

  if (existingReaction) {
    if (existingReaction.reaction === reactionType) {
      await Reaction.deleteOne({ targetId: insightId, userHash: hashedUserId });
    } else {
      await Reaction.updateOne(
        { targetId: insightId, userHash: hashedUserId },
        { $set: { reaction: reactionType } },
      );
    }
  } else {
    await Reaction.create({
      targetId: insightId,
      userHash: hashedUserId,
      reaction: reactionType,
    });
  }
}

async function reactOnComment(commentId, userId, reactionType) {
  const hashedUserId = hashUserIdentifier(userId);

  const existingReaction = await Reaction.findOne({
    targetId: commentId,
    userHash: hashedUserId,
  });

  if (existingReaction) {
    if (existingReaction.reaction === reactionType) {
      await Reaction.deleteOne({ targetId: commentId, userHash: hashedUserId });
    } else {
      await Reaction.updateOne(
        { targetId: commentId, userHash: hashedUserId },
        { $set: { reaction: reactionType } },
      );
    }
  } else {
    await Reaction.create({
      targetId: commentId,
      userHash: hashedUserId,
      reaction: reactionType,
    });
  }
}

module.exports = {
  createCommentForInsight,
  getCommentsForInsight,
  deleteComment,
  reactOnInsight,
  reactOnComment,
};
