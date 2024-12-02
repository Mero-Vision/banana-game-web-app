import axios from "axios";
import React, { useEffect, useState } from "react";
import {
   FaListAlt,
   FaPlay,
   FaSignOutAlt,
   FaTrophy,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
            const token = localStorage.getItem("token");
            if (!token) {
               navigate("/");
               return;
            }

            const response = await axios.get(
               "http://localhost:8000/api/user/profile/",
               {
                  headers: {
                     Authorization: `Token ${token}`,
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
      <div
         style={{
            // background: "#193347",
            background: "linear-gradient(90deg, #5E2D99, #091B2A)",
         }}
         className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br  p-4"
      >
         <div className="w-full max-w-md bg-white/30 rounded-2xl shadow-2xl backdrop-blur-lg overflow-hidden">
            <div
               style={{
                  background: "#fff",
                  //  "linear-gradient(90deg, #941E79, #57309E)",
               }}
               className=" p-6 text-center"
            >
               <h1
                  style={{ fontWeight: "600", color: "#091B2A" }}
                  className="text-4xl font-bold drop-shadow-lg animate-pulse"
               >
                  {greeting}, {username || "Player"}!
               </h1>
               <p style={{ color: "#091B2A" }} className=" mt-2">
                  Ready for a challenge?
               </p>
            </div>

            <div className="p-6 space-y-4">
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
                        border: "1px solid #222163",
                        background:
                           "linear-gradient(90deg, #193347, #3f4952)",
                     }}
                     className={`w-full flex items-center justify-center px-4 py-3 font-semibold text-white rounded-lg shadow-md 
               
                transition duration-300 transform active:scale-95`}
                  >
                     <Icon className="mr-2" />
                     {label}
                  </button>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
