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

async function getReactionCounts(targetId) {
  const reactionCounts = await Reaction.aggregate([
    { $match: { targetId } },
    {
      $group: {
        _id: "$reaction",
        count: { $sum: 1 },
      },
    },
  ]);

  const countsMap = {};
  reactionCounts.forEach((item) => {
    countsMap[item._id] = item.count;
  });

  return countsMap;
}

async function getUserReaction(targetId, userId) {
  const hashedUserId = hashUserIdentifier(userId);

  const userReaction = await Reaction.findOne({
    targetId,
    userHash: hashedUserId,
  });

  return userReaction ? userReaction.reaction : null;
}

async function getCommentsForInsightWithReactions(insightId, userId) {
  try {
    const comments = await Comment.find({ insightId });

    const commentsWithReactions = await Promise.all(
      comments.map(async (comment) => {
        const reactionCounts = await getReactionCounts(comment._id);
        const userReaction = await getUserReaction(comment._id, userId);

        return {
          comment,
          reactions: reactionCounts,
          userReaction,
        };
      }),
    );

    return commentsWithReactions;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get comments with reactions");
  }
}

module.exports = {
  createCommentForInsight,
  getCommentsForInsight,
  getCommentsForInsightWithReactions,
  deleteComment,
  reactOnInsight,
  reactOnComment,
  getReactionCounts,
  getUserReaction,
};
