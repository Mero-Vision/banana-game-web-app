import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { FaListAlt, FaPlay, FaSignOutAlt, FaTrophy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [greeting, setGreeting] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [selectedLevel, setSelectedLevel] = useState(""); // State to store selected level

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    setGreeting(getTimeBasedGreeting());

    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          console.error("Token is missing. Please login first.");
          return;
        }

        const response = await axios.get("profile/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        navigate("/");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleStart = () => {
    setIsModalOpen(true); // Open the modal when "Start Game" is clicked
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setIsModalOpen(false); // Close the modal after selecting level

    // Navigate to respective route based on selected level
    if (level === "easy") {
      navigate("/easy");
    } else if (level === "medium") {
      navigate("/medium");
    } else if (level === "hard") {
      navigate("/hard");
    }
  };

  const handleHighscore = () => navigate("/history");
  const handleLeaderboard = () => navigate("/leaderboard");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bgContainer flex flex-col items-center justify-center min-h-screen bg-gradient-to-br p-4">
      <div
        style={{
          marginBottom: "70px",
          marginTop: "-200px",
        }}
        className=" p-6 text-center"
      >
        <h1
          style={{ fontWeight: "600", color: "#fff" }}
          className="dashboardBtnsHeader text-4xl font-bold drop-shadow-lg animate-pulse"
        >
          {greeting}, <br /> {username || "Player"}!
        </h1>
        <p style={{ color: "#fff" }} className="dashboardBtnsHeader mt-2">
          Ready for a challenge?
        </p>
      </div>
      <div className="w-full max-w-md bg-white/30 rounded-2xl shadow-2xl backdrop-blur-lg overflow-hidden">
        <div className="p-4 py-6 space-y-4">
          {[
            {
              label: "Start Game",
              icon: FaPlay,
              onClick: handleStart,
            },
            {
              label: "History",
              icon: FaTrophy,
              onClick: handleHighscore,
            },
            {
              label: "Leaderboard",
              icon: FaListAlt,
              onClick: handleLeaderboard,
            },
            {
              label: "Logout",
              icon: FaSignOutAlt,
              onClick: handleLogout,
            },
          ].map(({ label, icon: Icon, onClick }) => (
            <button
              onClick={onClick}
              key={label}
              style={{
                color: "#fff",
                border: "1px solid hsla(0, 0%, 97%, 0.3)",
                background: "#111",
              }}
              className={`dashboardBtns w-full flex items-center justify-center px-1 py-2 font-semibold text-white rounded-lg shadow-md 
                transition duration-300 transform active:scale-95`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Modal for selecting game level */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>Select Game Level</h2>
            <div className="level-buttons">
              <button
                style={{
                  color: "#fff",
                  border: "1px solid hsla(0, 0%, 97%, 0.3)",
                  background: "#111",
                }}
                onClick={() => handleLevelSelect("easy")}
              >
                Easy
              </button>
              <button
                style={{
                  color: "#fff",
                  border: "1px solid hsla(0, 0%, 97%, 0.3)",
                  background: "#111",
                }}
                onClick={() => handleLevelSelect("medium")}
              >
                Medium
              </button>
              <button
                style={{
                  color: "#fff",
                  border: "1px solid hsla(0, 0%, 97%, 0.3)",
                  background: "#111",
                }}
                onClick={() => handleLevelSelect("hard")}
              >
                Hard
              </button>
            </div>
            <button
              className="close-modal"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
