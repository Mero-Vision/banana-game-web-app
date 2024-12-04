import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import "../styles.css";
import { FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [rankedUsers, setRankedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("Token is missing. Please login first.");
      return;
    }

    try {
      const response = await axios.get("leader-board/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const transformedData = response.data.data.map((user) => ({
        username: user.username,
        email: user.email,
        gamesPlayed: user.games_played || 0,
        score: user.rank_score || 0,
      }));

      setRankedUsers(transformedData); // Set transformed data
      setError(null);
    } catch (error) {
      setError(
        error.response?.data?.message || "Error fetching leaderboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bgContainer flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bgContainer flex items-center justify-center h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl">{error}</p>
          <button
            onClick={fetchLeaderboardData}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const backHome = () => {
    navigate(`/dashboard`);
  };
  return (
    <div className="bgContainer  bg-gradient-to-r  min-h-screen p-6 flex justify-center items-center">
      <div style={{ width: "100%" }} className="max-w-4xl min-w-4xl">
        <button
          style={{
            color: "#fff",
            border: "1px solid hsla(0, 0%, 97%, 0.3)",
            background: "#111",
            marginBottom: "20px",
          }}
          onClick={backHome}
          className={`dashboardBtnsHistoryRefresh  flex items-center justify-center px-3 py-2 font-semibold text-white rounded-lg shadow-md 
                 
                       transition duration-300 transform active:scale-95`}
        >
          Back to menu
        </button>
        <div
          style={{
            background: "linear-gradient(90deg, #530718, #0F020E)",
          }}
          className="max-w-4xl min-w-4xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden"
        >
          <div className="bg-gradient-to- text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <FaHistory className="mr-2 text-2xl" style={{ color: "#fff" }} />
              <h1 className="text-2xl font-bold dashboardBtnsHistory">
                Game Leaderboard
              </h1>
            </div>
            
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4 mx-6 rounded-md">
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="p-6 text-center">
              <p className="text-gray-600 text-lg">Loading game history...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr
                    style={{
                      background: "#D4A079",
                      color: "#0A1B2B",
                    }}
                    className=" text-yellow-900 text-sm"
                  >
                    <th className="px-5 py-3 text-left font-bold">S.N</th>
                    <th className="px-5 py-3 text-left font-bold">Player</th>
                    <th className="px-5 py-3 text-left font-bold">Email</th>
                    <th className="px-5 py-3 text-center font-bold">
                      Games Played
                    </th>
                    <th className="px-5 py-3 text-center font-bold">
                      Total Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rankedUsers && rankedUsers.length > 0 ? (
                    rankedUsers.map((user, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-100 transition-colors"
                      >
                        <td className="px-5 py-4 text-center font-medium text-white">
                          {index + 1}
                        </td>
                        <td className="px-5 py-4 font-semibold text-white">
                          {user.username}
                        </td>
                        <td className="px-5 py-4 text-white">
                          {user.email}
                        </td>
                        <td className="px-5 py-4 text-center">
                          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                            {user.gamesPlayed} 🎮
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center font-bold text-white">
                          {user.score}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-6 px-6 text-center text-white"
                      >
                        No game history available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
