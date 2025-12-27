import React from "react";

export default function Question(props) {
  const answerElements = props.answers.map((answer) => {
    return (
      <button
        key={answer}
        // Logic for highlighting the selected answer
        className={`answer-btn ${
          props.selectedAnswer === answer ? "selected" : ""
        }`}
        onClick={() => props.handleSelectAnswer(props.id, answer)}
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
