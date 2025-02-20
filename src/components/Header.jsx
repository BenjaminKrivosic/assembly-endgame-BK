import clsx from "clsx";
import { getFarewellText } from "../../utils.js";
import { languages } from "../../languages.js";

export default function Header(props) {
  const gameStatusClass = clsx("comment-windown", {
    won: props.gameWon,
    lost: props.gameLost,
  });

  const langCross =
    props.wrongGuessCount > 0 && languages[props.wrongGuessCount - 1].name;

  function renderGameStatus() {
    if (!props.gameStatus && props.wrongGuessCount > 0) {
      return (
        <section className="farewell-message">
          <span>{getFarewellText(langCross)}</span>
        </section>
      );
    }
  }

  function renderGameOver() {
    if (!props.gameStatus) {
      return null;
    }

    if (props.gameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    } else {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }
  }

  // function renderGameStatus () {} can use a helper function to remove the so many nested conditional rendering

  return (
    <>
      <header>
        <h1 className="title">Assembly: Endgame</h1>
        <h2 className="instructions">
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </h2>
      </header>
      {renderGameStatus()}
      <section className={gameStatusClass}>{renderGameOver()}</section>
    </>
  );
}
