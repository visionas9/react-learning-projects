import React from "react";
import { languages } from "./languages";
import clsx from "clsx";

export default function App() {
  //states
  const [currentWord, setCurrentWord] = React.useState("react");
  const [guessedLetters, setGuessedLetters] = React.useState([]);

  //derived state
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  //win/loss states
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const isGameLost = wrongGuessCount >= languages.length;

  const isGameOver = isGameWon || isGameLost;

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lose: isGameLost,
  });

  const gameWonStatus = isGameWon ? (
    <div>
      <h2>You win!</h2>
      <p>Well done! 🎉</p>
    </div>
  ) : null;

  const gameLostStatus = isGameLost ? (
    <div>
      <h2>Game Over!</h2>
      <p>You lose! Better start learning Assembly 😭</p>
    </div>
  ) : null;

  function addGuessedLetter(letter) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  const languageElements = languages.map((lang, index) => {
    const isLangLost = index < wrongGuessCount;
    const className = clsx("chip", {
      lost: isLangLost,
    });

    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };
    return (
      <span className={className} style={styles} key={lang.name}>
        {lang.name}
      </span>
    );
  });

  const letterElements = currentWord
    .split("")
    .map((letter, index) => (
      <span key={index}>
        {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
      </span>
    ));

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const keyboardElements = alphabet.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const className = clsx("btn", {
      correct: isCorrect,
      wrong: isWrong,
    });
    return (
      <button
        className={className}
        disabled={isGuessed}
        key={letter}
        onClick={() => addGuessedLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className={gameStatusClass}>
        {gameWonStatus || gameLostStatus}
      </section>
      <section className="language-chips">{languageElements}</section>
      <section className="word">{letterElements}</section>
      <section className="keyboard">{keyboardElements}</section>
      {isGameOver && <button className="new-game">New Game</button>}
    </main>
  );
}
