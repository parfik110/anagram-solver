import { useGameLogic } from "../hooks/useGameLogic";
import GameOverModal from "../components/GameOverModal";

function GamePage() {
  const {
    originalWord,
    shuffled,
    answer,
    setAnswer,
    attemptsLeft,
    timeLeft,
    checkAnswer,
    showHintPrompt,
    generateHint,
    hint,
    hintUsed,
    gameOver,
    gameResult
  } = useGameLogic();

  return (
    <div>
      <h1>Гра</h1>

      <p>Перемішане слово: <strong>{shuffled}</strong></p>
      <p>Спроби: {attemptsLeft}</p>
      <p>Час: {timeLeft} сек</p>

      {hint && <p style={{ color: "blue" }}>{hint}</p>}

      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button onClick={checkAnswer}>Перевірити</button>

      {showHintPrompt && (
        <div>
          <p>Хочеш підказку?</p>
          <button onClick={generateHint}>Так</button>
          <button onClick={() => setShowHintPrompt(false)}>Ні</button>
        </div>
      )}

      {gameOver && (
        <GameOverModal
          result={gameResult}
          word={originalWord}
          hintUsed={hintUsed}
        />
      )}
    </div>
  );
}

export default GamePage;
