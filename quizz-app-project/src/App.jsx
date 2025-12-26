import React, { useState, useEffect } from "react";
import Question from "./Question";
import he from "he";
import "./App.css";

export default function App() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (started) {
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
            const allAnswers = [...decodedIncorrect, decodedCorrect].sort(
              () => Math.random() - 0.5
            );

            return {
              id: Math.random().toString(),
              question: decodedQuestion,
              answers: allAnswers,
              correctAnswer: decodedCorrect,
            };
          });
          setQuestions(newQuestions);
        });
    }
  }, [started]);

  return (
    <main>
      <div className="blob yellow-blob"></div>
      <div className="blob blue-blob"></div>
      {!started ? (
        <div className="start-container">
          <h1 className="title">Quizzical</h1>
          <p className="description">Test your knowledge!</p>
          <button className="primary-btn" onClick={() => setStarted(true)}>
            Start quiz
          </button>
        </div>
      ) : (
        <div className="quiz-container">
          {questions.map((q) => (
            <Question key={q.id} question={q.question} answers={q.answers} />
          ))}
        </div>
      )}
    </main>
  );
}
