import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles.css";

const QuestionImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [score, setScore] = useState(0);

  const navigate = useNavigate(); // Initialize navigate function

  const fetchQuestionImage = async () => {
    try {
      const response = await axios.get(
        "https://marcconrad.com/uob/banana/api.php"
      );
      if (response.data && response.data.question && response.data.solution) {
        setImageUrl(response.data.question);
        setCorrectAnswer(response.data.solution);
        setTimeLeft(30);
        setUserAnswer("");
        setFeedback("");
        setError(null);
        setTotalQuestions((prev) => prev + 1);
      } else {
        setError("Expected data fields not found in API response.");
      }
    } catch (err) {
      console.error("Error fetching question image:", err);
      setError("Could not fetch the question image.");
    }
  };

  const storeGameHistory = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("Authentication token is missing.");
      }

      const gameData = {
        total_questions: totalQuestions,
        score: score,
        remarks: `Completed ${totalQuestions} questions with ${score} correct answers`,
      };

      const response = await axios.post(
        "http://localhost:8000/api/game-history",
        gameData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Game history stored:", response.data);
    } catch (err) {
      console.error("Error storing game history:", err.message);
      setError("Failed to save game history. Please try again.");
    }
  };

  useEffect(() => {
    fetchQuestionImage();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(
        () => setTimeLeft((prevTime) => prevTime - 1),
        1000
      );
      return () => clearInterval(timer);
    } else {
      setIsGameOver(true);
      storeGameHistory(); // Store game history when time runs out
    }
  }, [timeLeft]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (parseInt(userAnswer) === correctAnswer) {
      setFeedback("Correct answer! 🎉");
      setScore((prev) => prev + 1);
      await fetchQuestionImage(); // Get new question immediately after correct answer
    } else {
      setFeedback("Incorrect answer. Try again.");
    }
  };

  const handleResetGame = () => {
    setIsGameOver(false);
    setTotalQuestions(0);
    setScore(0);
    fetchQuestionImage();
  };

  const handleCloseGame = () => {
    navigate("/dashboard"); // Redirect to the dashboard
  };

  return (
    <div
      // style={{
      //    // background: "#193347",
      //    background: "linear-gradient(90deg, #5E2D99, #091B2A)",
      // }}
      className="bgContainer flex flex-col items-center justify-center p-8 space-y-6 bg-gradient-to-br min-h-screen"
    >
      <h2
        style={{ fontWeight: "500" }}
        className="text-3xl font-bold text-white tracking-wide"
      >
        Keraa Game
      </h2>

      <div className="flex space-x-6 text-white">
        <p>Questions: {totalQuestions}</p>
        <p>Score: {score}</p>
      </div>

      {error && (
        <p className="text-red-200 bg-red-800 px-4 py-2 rounded">{error}</p>
      )}

      {imageUrl ? (
        <motion.img
          src={imageUrl}
          alt="Question"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md h-auto rounded-lg shadow-2xl border-4 border-white"
        />
      ) : (
        <p className="text-white text-xl font-light animate-pulse">
          Loading...
        </p>
      )}

      <p
        style={{ fontWeight: "500" }}
        className={`text-xl font-semibold ${
          timeLeft <= 5 ? "text-red-300" : "text-white"
        }`}
      >
        Time Left: <span className="font-bold">{timeLeft}</span> seconds
      </p>

      {timeLeft > 0 ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-6"
          style={{ width: "30%" }}
        >
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="w-full max-w-md px-4 py-3 text-gray-900 bg-white rounded-lg shadow-lg focus:ring-2 focus:ring-pink-300 focus:outline-none"
          />
          <motion.button
            type="submit"
            style={{
              color: "#fff",
              border: "1px solid hsla(0, 0%, 97%, 0.3)",
              background: "#111",
              width: "100%",
            }}
            className={`dashboardBtns w-full flex items-center justify-center px-2 py-3 font-semibold text-white rounded-lg shadow-md 
               
                     transition duration-300 transform active:scale-95`}
          >
            Check Answer
          </motion.button>
        </form>
      ) : null}

      {feedback && (
        <motion.p
          style={{ fontWeight: "400" }}
          className={`mt-6 text-xl font-semibold ${
            feedback.includes("Correct") ? "text-green-300" : "text-red-300"
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {feedback}
        </motion.p>
      )}

      <AnimatePresence>
        {isGameOver && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-3xl font-bold text-red-500">Game Over!</h3>
              <p className="mt-4 text-gray-700">
                Final Score: {score} out of {totalQuestions} questions
              </p>
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  onClick={handleResetGame}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-400"
                >
                  Play Again
                </button>
                <button
                  onClick={handleCloseGame} // Call handleCloseGame on click
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuestionImage;
