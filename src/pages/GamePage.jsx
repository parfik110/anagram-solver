import { useAnagram } from "../hooks/useAnagram";
import { useGameState } from "../hooks/useGameState";
import { useNavigate } from "react-router-dom";

function GamePage() {
  const navigate = useNavigate();

  // Тимчасове слово (поки немає налаштувань)
  const originalWord = "react";

  const { shuffled, checkAnswer } = useAnagram(originalWord);
  const { answer, updateAnswer } = useGameState();

  const handleSubmit = () => {
    const correct = checkAnswer(answer);
    navigate("/result", { state: { correct, originalWord } });
  };

  return (
    <div>
      <h1>Гра</h1>

      <p>
        Перемішане слово: <strong>{shuffled}</strong>
      </p>

      <input
        type="text"
        value={answer}
        onChange={(e) => updateAnswer(e.target.value)}
        placeholder="Введи слово"
      />

      <button onClick={handleSubmit}>Перевірити</button>
    </div>
  );
}

export default GamePage;
