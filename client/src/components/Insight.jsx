import moment from "moment";
import React, { useState, useEffect } from "react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import serverApi from "../serverApi";
import Comment from "./Comment";

export default function Insight({ data }) {
  const { insight, reactions, userReaction } = data;
  const { _id, text, timestamp } = insight;
  const [upvotes, setUpvotes] = useState(reactions?.upvote || 0);
  const [downvotes, setDownvotes] = useState(reactions?.downvote || 0);
  const [userReactionState, setUserReactionState] = useState(userReaction);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await serverApi.get(`/insights/${_id}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (isExpanded) {
      fetchComments();
    }
  }, [_id, isExpanded]);

  const handleAddComment = async () => {
    try {
      await serverApi.post(`/insights/${_id}/comments`, { text: newComment });

      const response = await serverApi.get(`/insights/${_id}/comments`);
      setComments(response.data);

      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

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

      {/* Add Comment */}
      <div className="mt-4 flex items-center">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
        ></textarea>
        <button
          onClick={handleAddComment}
          className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:border-indigo-700"
        >
          <PaperAirplaneIcon className="h-8 w-4" />
        </button>
      </div>

      {/* Expand Comments */}
      <div className="mt-3">
        <div
          className={`w-full flex items-center py-2 rounded-md cursor-pointer text-center text-white ${
            isExpanded
              ? "bg-indigo-600"
              : "bg-gray-200 hover:bg-gray-300 text-indigo-700"
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
          <span className="text-xs ml-1">
            {isExpanded ? "Collapse Comments" : "View Comments"}
          </span>
        </div>
      </div>

      {/* Comments Section */}
      {isExpanded && (
        <div className="mt-4 space-y-2">
          {comments.length === 0 ? (
            <p className="text-gray-500">
              There's no comments on this insight yet.
            </p>
          ) : (
            comments.map((comment) => (
              <Comment key={comment._id} data={comment} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
