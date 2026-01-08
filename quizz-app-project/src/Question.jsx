import React from "react";

export default function Question(props) {
  const answerElements = props.answers.map((answer) => {
    let id = null;

    // LOGIC: Determine how to style the button
    if (props.isChecked) {
      if (props.correctAnswer === answer) {
        id = "correct"; // Always show correct answer in Green
      } else if (props.selectedAnswer === answer) {
        id = "incorrect"; // Show wrong selection in Red/Faded
      } else {
        id = "not-selected"; // Dim the other options
      }
    }

    return (
      <button
        key={answer}
        id={id} // Apply the ID based on logic above
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
