import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import {
   FaListAlt,
   FaPlay,
   FaSignOutAlt,
   FaTrophy,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Dashboard = () => {
   const navigate = useNavigate();
   const [username, setUsername] = useState("");
   const [greeting, setGreeting] = useState("");

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

            const response = await axios.get(
               "profile/",
               {
                  headers: {
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`,
                  },
               }
            );
            setUsername(response.data.username);
         } catch (error) {
            console.error("Error fetching user profile:", error);
            navigate("/");
         }
      };

      fetchUserProfile();
   }, [navigate]);

   const handleStart = () => navigate("/question");
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
            <p
               style={{ color: "#fff" }}
               className="dashboardBtnsHeader mt-2"
            >
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
               ].map(({ label, icon: Icon, onClick, bgClass }) => (
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
                     {/* <Icon className="mr-2" /> */}
                     {label}
                  </button>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
