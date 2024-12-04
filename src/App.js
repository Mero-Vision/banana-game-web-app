import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import QuestionImage from "./Components/GameComponent/QuestionComponent";
import { useEffect } from "react";
import LoginPage from "./Components/authComponents/LoginComponents";
import SignupPage from "./Components/authComponents/SignupComponents";
import Dashboard from "./Components/Dashboard/Dashboard";
import GameHistory from "./Components/historyComponents/History";
import Leaderboard from "./Components/leaderboardComponents/leaderboard";
import EasyGame from "./Components/GameComponent/EasyGame";
import MediumGame from "./Components/GameComponent/MediumGame";
import HardGame from "./Components/GameComponent/HardGame";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/question" element={<QuestionImage />} />

          <Route path="/easy" element={<EasyGame />} />
          <Route path="/medium" element={<MediumGame />} />
          <Route path="/hard" element={<HardGame />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<GameHistory />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Router>
    </>
  );
}



export default App;
