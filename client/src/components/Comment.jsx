// Comment.jsx
import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import serverApi from "../serverApi";

export default function Comment({ data }) {
  const { comment, reactions, userReaction } = data;
  const { _id, text, timestamp } = comment;
  const [upvotes, setUpvotes] = useState(reactions?.upvote || 0);
  const [downvotes, setDownvotes] = useState(reactions?.downvote || 0);
  const [userReactionState, setUserReactionState] = useState(userReaction);

  const handleReactOnComment = async (commentId, reactionType) => {
    try {
      await serverApi.post(`/interactions/comments/${commentId}/react`, {
        reactionType,
      });

      const response = await serverApi.get(
        `/interactions/comments/${commentId}`,
      );
      const comment = response.data.comment;

      setUpvotes(comment.reactions.upvote || 0);
      setDownvotes(comment.reactions.downvote || 0);
      setUserReactionState(comment.userReaction);
    } catch (error) {
      console.error("Reaction failed:", error);
    }
  };

  return (
    <div className="border-b border-dotted border-gray-300 pt-2 mt-2">
      <div className="flex items-center mb-2">
        <p className="text-gray-800 ml-2">{text}</p>

        {/* Comment reactions */}
        <div className="flex items-center space-x-4 ml-auto">
          <button
            className={`flex items-center text-gray-500 space-x-1 px-2 py-1 rounded-full focus:outline-none ${
              userReactionState === "upvote"
                ? "text-white bg-indigo-500 hover:bg-indigo-400"
                : "active:bg-indigo-700 hover:text-indigo-500"
            }`}
            onClick={() => handleReactOnComment(_id, "upvote")}
          >
            <ChevronUpIcon className="h-4 w-4" />
            <span>{`Upvote (${upvotes})`}</span>
          </button>
          <button
            className={`flex items-center text-gray-500 space-x-1 px-2 py-1 rounded-full focus:outline-none ${
              userReactionState === "downvote"
                ? "text-white bg-red-500 hover:bg-red-400"
                : "active:bg-red-700 hover:text-red-500"
            }`}
            onClick={() => handleReactOnComment(_id, "downvote")}
          >
            <ChevronDownIcon className="h-4 w-4" />
            <span>{`Downvote (${downvotes})`}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
