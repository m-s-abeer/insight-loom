import moment from "moment";
import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import serverApi from "../serverApi";

export default function Insight({ data }) {
  const { insight, reactions, userReaction } = data;
  const { _id, text, timestamp } = insight;
  const [upvotes, setUpvotes] = useState(reactions?.upvote || 0);
  const [downvotes, setDownvotes] = useState(reactions?.downvote || 0);
  const [userReactionState, setUserReactionState] = useState(userReaction);

  console.log(upvotes);

  const handleReactOnInsight = async (insightId, reactionType) => {
    try {
      await serverApi.post(`/insights/${insightId}/react`, {
        reactionType,
      });

      const response = await serverApi.get(`/insights/${insightId}`);
      const updatedInsight = response.data.insight;

      setUpvotes(updatedInsight.reactions.upvote || 0);
      setDownvotes(updatedInsight.reactions.downvote || 0);
      setUserReactionState(updatedInsight.userReaction);
    } catch (error) {
      console.error("Reaction failed:", error);
    }
  };

  return (
    <div className="bg-white rounded-md shadow-md p-6 mb-4">
      <div className="flex items-center mb-4">
        <img
          src="https://img.freepik.com/premium-vector/man-silhouette-profile-male-avatar-anonymous-icon-censored-face_434359-85.jpg" // Replace with user's profile picture
          alt="User Profile"
          className="w-8 h-8 rounded-full mr-2"
        />
        <div>
          <p className="text-sm text-gray-500">
            {moment(timestamp).fromNow().toString()}
          </p>
        </div>
      </div>
      <p className="text-lg text-gray-800 mb-4 text-left">{text}</p>
      <div className="flex items-center space-x-4">
        <button
          className={`flex items-center text-gray-500 space-x-1 px-3 py-1 rounded-full focus:outline-none ${
            userReactionState === "upvote"
              ? "text-white bg-indigo-500 hover:bg-indigo-400"
              : "active:bg-indigo-700 hover:text-indigo-500"
          }`}
          onClick={() => handleReactOnInsight(_id, "upvote")}
        >
          <ChevronUpIcon className="h-5 w-5" />
          <span>{`Upvote (${upvotes})`}</span>
        </button>
        <button
          className={`flex items-center text-gray-500 space-x-1 px-3 py-1 rounded-full focus:outline-none ${
            userReactionState === "downvote"
              ? "text-white bg-red-500 hover:bg-red-400"
              : "active:bg-red-700 hover:text-red-500"
          }`}
          onClick={() => handleReactOnInsight(_id, "downvote")}
        >
          <ChevronDownIcon className="h-5 w-5" />
          <span>{`Downvote (${downvotes})`}</span>
        </button>
      </div>
    </div>
  );
}
