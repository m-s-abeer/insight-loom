const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userHash: { type: String, required: true },
  reaction: { type: String, enum: ["upvote", "downvote"], required: true },
});

const Reaction = mongoose.model("Reaction", reactionSchema);

module.exports = Reaction;
