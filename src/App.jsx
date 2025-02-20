import Header from "./components/Header";
import { getFarewellText, getRandomWord } from "../utils.js";
import { languages } from "../languages.js";
import { clsx } from "clsx";
import { useState } from "react";
import Confetti from "react-confetti";

function App() {
  //state vallues
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  //derived values

  let wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const isGameOver = isGameWon || isGameLost;

  //imamo guesed letters i imamo riječ , letter-kurent word nam je worng guess count

  //static values
  const aplhabet = "abcdefghijklmnopqrstuvwxyz";

  const langElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount;

    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };

    return (
      <span
        className={`chip ${isLanguageLost ? "lost" : ""}`}
        key={lang.name}
        style={styles}
      >
        {lang.name}
      </span>
    );
  });

  function handleClick(letter) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  const letterElements = currentWord
    .toUpperCase()
    .split("")
    .map((letter, index) => {
      const displayLetter = isGameLost || guessedLetters.includes(letter);
      const letterClassName = clsx(
        isGameLost && !guessedLetters.includes(letter) && "missed-letter"
      );

      return (
        <span key={index} className={letterClassName}>
          {displayLetter ? letter : ""}
        </span>
      );
    });

  const keyboardElements = aplhabet
    .toUpperCase()
    .split("")
    .map((letter) => {
      const isGuessed = guessedLetters.includes(letter);
      const isCorrect = isGuessed && currentWord.includes(letter);
      const isWrong = isGuessed && !currentWord.includes(letter);
      const className = clsx({
        correct: isCorrect,
        wrong: isWrong,
      });

      return (
        <button
          className={className}
          disabled={isGameOver}
          key={letter}
          onClick={() => handleClick(letter)}
        >
          {letter}
        </button>
      );
    });

  function resetGame() {
    setGuessedLetters([]);
    setCurrentWord(getRandomWord());
  }

  return (
    <main>
      <Header
        gameStatus={isGameOver}
        gameWon={isGameWon}
        gameLost={isGameLost}
        wrongGuessCount={wrongGuessCount}
      />
      <section className="lang-chips">{langElements}</section>
      <section className="current-word">{letterElements}</section>
      <section className="letter-box">{keyboardElements}</section>
      {isGameOver && (
        <button className="new-game" onClick={resetGame}>
          New Game
        </button>
      )}

      {isGameWon && <Confetti recycle={false} numberofPieces={1000} />}
    </main>
  );
}

export default App;
