import { useParams } from "react-router-dom";
import { useGameLogic } from "../hooks/useGameLogic";
import GameOverModal from "../components/GameOverModal";
import styles from "./GamePage.module.css";

import { useDispatch } from "react-redux";
import { addResult } from "../store/resultsSlice";
import { useEffect } from "react";

function GamePage() {
  const { uid } = useParams();
  const dispatch = useDispatch();

  const {
    originalWord,
    shuffled,
    answer,
    setAnswer,
    attemptsLeft,
    timeLeft,
    checkAnswer,
    showHintPrompt,
    setShowHintPrompt,
    generateHint,
    hint,
    hintUsed,
    gameOver,
    gameResult,
    resetGame
  } = useGameLogic();

  useEffect(() => {
    if (gameOver) {
      dispatch(
        addResult({
          word: originalWord,
          result: gameResult,
          hintUsed,
          date: new Date().toLocaleString(),
          uid
        })
      );
    }
  }, [gameOver]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Гра</h1>

      <p className={styles.word}>
        Перемішане слово: <strong>{shuffled}</strong>
      </p>

      <div className={styles.stats}>
        <p>Спроби: {attemptsLeft}</p>
        <p>Час: {timeLeft} сек</p>
      </div>

      {hint && <p className={styles.hint}>{hint}</p>}

      <input
        className={styles.input}
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button className={styles.button} onClick={checkAnswer}>
        Перевірити
      </button>

      {showHintPrompt && (
        <div className={styles.hintPrompt}>
          <p>Хочеш підказку?</p>
          <div className={styles.hintButtons}>
            <button className={styles.smallButton} onClick={generateHint}>
              Так
            </button>
            <button
              className={styles.smallButton}
              onClick={() => setShowHintPrompt(false)}
            >
              Ні
            </button>
          </div>
        </div>
      )}

      {gameOver && (
        <GameOverModal
          result={gameResult}
          word={originalWord}
          hintUsed={hintUsed}
          onRepeat={resetGame}
        />
      )}
    </div>
  );
}

export default GamePage;
