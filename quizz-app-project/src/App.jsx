import React, { useState, useEffect } from "react";
import Question from "./Question";
import he from "he";
import "./App.css";

export default function App() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [count, setCount] = useState(0); // <-- To trigger re-fetch
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (started) {
      setLoading(true);
      fetch(
        "https://opentdb.com/api.php?amount=6&category=9&difficulty=medium&type=multiple"
      )
        .then((res) => res.json())
        .then((data) => {
          const newQuestions = data.results.map((q) => {
            const decodedQuestion = he.decode(q.question);
            const decodedCorrect = he.decode(q.correct_answer);
            const decodedIncorrect = q.incorrect_answers.map((a) =>
              he.decode(a)
            );

            const allAnswers = [...decodedIncorrect, decodedCorrect];
            const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

            return {
              id: Math.random().toString(),
              question: decodedQuestion,
              answers: shuffledAnswers,
              correctAnswer: decodedCorrect,
              selectedAnswer: "",
            };
          });
          setQuestions(newQuestions);
          setLoading(false);
        });
    }
  }, [started, count]); // <--'count' added so we can refetch on "Play Again"

  function startGame() {
    setStarted(true);
  }

  function selectAnswer(questionId, answer) {
    // Prevent changing answers if game is already checked
    if (!isChecked) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => {
          return q.id === questionId ? { ...q, selectedAnswer: answer } : q;
        })
      );
    }
  }

  // --- Calculate Score & End Game ---
  function checkAnswers() {
    let correctCount = 0;
    questions.forEach((q) => {
      if (q.selectedAnswer === q.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setIsChecked(true);
  }

  // --- Reset Game ---
  function playAgain() {
    setIsChecked(false);
    setScore(0);
    setCount((prev) => prev + 1); // Triggers the useEffect to fetch new questions
    setQuestions([]);
  }

  const questionElements = questions.map((q) => (
    <Question
      key={q.id}
      id={q.id}
      question={q.question}
      answers={q.answers}
      selectedAnswer={q.selectedAnswer}
      correctAnswer={q.correctAnswer}
      isChecked={isChecked}
      handleSelectAnswer={selectAnswer}
    />
  ));

  return (
    <main>
      <div className="blob yellow-blob"></div>
      <div className="blob blue-blob"></div>

      {!started ? (
        <div className="start-container">
          <h1 className="title">Quizzical</h1>
          <p className="description">Test your knowledge!</p>
          <button className="primary-btn" onClick={startGame}>
            Start quiz
          </button>
        </div>
      ) : (
        <div className="quiz-container">
          {/* 4. CONDITIONAL RENDERING FOR LOADING */}

          {loading ? (
            <div className="loading-container">
              <p className="loading-text">Questions are uploading...</p>
            </div>
          ) : (
            <>
              {questionElements}

              {/* Check button only appears when NOT loading and we have questions */}
              {questions.length > 0 && (
                <div className="footer">
                  {isChecked && (
                    <span className="score-text">
                      You scored {score}/{questions.length} correct answers
                    </span>
                  )}
                  <button
                    className="check-btn"
                    onClick={isChecked ? playAgain : checkAnswers}
                  >
                    {isChecked ? "Play again" : "Check answers"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </main>
  );
}
