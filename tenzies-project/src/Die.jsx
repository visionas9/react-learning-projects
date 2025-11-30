import React from "react";

export default function Die(props) {
  return (
    <button
      className={`die-face ${props.isHeld ? "held" : ""}`}
      onClick={props.holdDies}
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value},
      ${props.isHeld ? "held" : "not held"}`}
    >
      {props.value}
    </button>
  );
}
