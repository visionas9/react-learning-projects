import React, { useState } from "react";
import "./App.css";
import BadgetPill from "./components/BadgetPill";
import BadgetSquare from "./components/BadgetSquare";

const ToggleContext = React.createContext();

export default function App() {
  const [on, setOpen] = useState(false);

  function toggle() {
    setOpen((prevOpen) => !prevOpen);
  }

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      <div className="badget-square-div">
        <button onClick={toggle}>
          {on ? "close section" : "open section"}
        </button>
        {on ? <BadgetSquare /> : null}
      </div>
    </ToggleContext.Provider>
  );
}

export { ToggleContext };
