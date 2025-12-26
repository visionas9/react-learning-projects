import React from "react";

export default function Question(props) {
  // Simple mapping, no selection logic yet
  const answerElements = props.answers.map((answer) => {
    return (
      <button
        key={answer}
        className="answer-btn"
        // Placeholder click
        onClick={() => console.log("Clicked:", answer)}
      >
        {answer}
      </button>
    );
  });

  return (
    <div className="question-container">
      <h3 className="question-text">{props.question}</h3>
      <div className="answers-list">{answerElements}</div>
      <hr className="divider" />
    </div>
  );
}
