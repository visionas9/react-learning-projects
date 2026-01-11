import { useState } from "react";
import "./App.css";
import BadgetPill from "./components/BadgetPill";
import BadgetSquare from "./components/BadgetSquare";

export default function App() {
  return (
    <>
      <div className="badget-square-div">
        <BadgetSquare />
        <BadgetSquare />
        <BadgetSquare />
        <BadgetSquare />
        <BadgetSquare />
        <BadgetSquare />
        <BadgetSquare />
        <BadgetSquare />
      </div>

      <div className="badget-pill-div">
        <BadgetPill />
        <BadgetPill />
        <BadgetPill />
        <BadgetPill />
        <BadgetPill />
        <BadgetPill />
        <BadgetPill />
        <BadgetPill />
      </div>
    </>
  );
}
