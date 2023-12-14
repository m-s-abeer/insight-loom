const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  insightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Insight",
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
