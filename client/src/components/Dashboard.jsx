import React, { useState, useEffect } from "react";
import serverApi from "../serverApi";
import { useAuth } from "./AuthProvider";
import Insight from "./Insight";

export default function Dashboard() {
  const [newInsight, setNewInsight] = useState("");
  const [insights, setInsights] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await serverApi.get("/insights");
        setInsights(response.data);
      } catch (error) {
        console.error("Error fetching insights:", error);
      }
    };

    fetchInsights();
  }, []);

  const handleShareInsight = async () => {
    try {
      if (newInsight.trim() !== "") {
        const response = await serverApi.post("/insights", {
          text: newInsight,
        });
        setInsights((prevInsights) => [response.data, ...prevInsights]);

        setNewInsight("");
      }
    } catch (error) {
      console.error("Error sharing insight:", error);
    }
  };

  if (!token) {
    return (
      <div
        className="flex justify-center items-center h-screen"
        style={{ height: "80vh" }}
      >
        <div className="text-7xl font-bold text-center text-gray-600 font-serif">
          Welcome to Insight Loom
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Share Insight section */}
      <div className="mb-6 flex flex-col items-end">
        <textarea
          value={newInsight}
          onChange={(e) => setNewInsight(e.target.value)}
          placeholder="Share your insight..."
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
        ></textarea>
        <button
          onClick={handleShareInsight}
          className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:border-indigo-700"
        >
          Share Insight
        </button>
      </div>

      {/* List of Insights */}
      <div>
        {insights.map((insight) => (
          <Insight key={insight._id} data={insight} />
        ))}
      </div>
    </div>
  );
}
