import React from "react";

export default function App() {
  // State to toggle between Start Screen and Quiz Screen
  const [started, setStarted] = React.useState(false);

  // Function to start the game
  function startGame() {
    setStarted(true);
  }

  return (
    <main>
      {/* Background Blobs (Decoration) */}
      <div className="blob yellow-blob"></div>
      <div className="blob blue-blob"></div>

      {/* Conditional Rendering */}
      {!started ? (
        /* SCREEN 1: INTRO */
        <div className="start-container">
          <h1 className="title">Quizzical</h1>
          <p className="description">Test your knowledge!</p>
          <button className="primary-btn" onClick={startGame}>
            Start quiz
          </button>
        </div>
      ) : (
        /* SCREEN 2: QUIZ (Placeholder untill update) */
        <div className="quiz-container">
          <h2>Questions go here...</h2>
          {/* I will map over the questions data here */}
        </div>
      )}
    </main>
  );
}
