import React from "react";
import Die from "../src/Die";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export default function App() {
  const [die, setDie] = React.useState(() => generateAllNewDices());

  function generateAllNewDices() {
    const die = new Array(10).fill(0).map(() => ({
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: Math.random(),
    }));
    return die;
  }

  const gameWon =
    die.every((dice) => dice.isHeld) &&
    die.every((dice) => dice.value === die[0].value);

  const buttonRef = React.useRef(null);

  React.useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  function rollDices() {
    if (gameWon) {
      return setDie(generateAllNewDices());
    } else {
      setDie((prevDie) =>
        prevDie.map((item) => {
          if (item.isHeld) {
            return item;
          } else {
            return {
              ...item,
              value: Math.floor(Math.random() * 6 + 1),
            };
          }
        })
      );
    }
  }

  function holdDies(id) {
    setDie((prevDie) =>
      prevDie.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isHeld: !item.isHeld,
          };
        } else {
          return item;
        }
      })
    );
  }

  const dieElement = die.map((dieObj) => (
    <Die
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      key={dieObj.id}
      holdDies={() => holdDies(dieObj.id)}
    />
  ));

  const { width, height } = useWindowSize();

  return (
    <main>
      {gameWon && <Confetti width={width} height={height} />}
      <div className="parent-div">
        <h1>Tenzies Game</h1>
        <p>
          Roll until all dice are the same.
          <br /> Click each die to keep the value.
        </p>
        <div className="child-div">{dieElement}</div>
        <button className="roll-btn" ref={buttonRef} onClick={rollDices}>
          {gameWon ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
}
