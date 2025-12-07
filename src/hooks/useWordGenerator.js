import words from "../data/words.json";
import { useGameSettings } from "../context/GameSettingsContext";

export function useWordGenerator() {
  const { settings } = useGameSettings();

  const chances = {
    easy:  { 4: 0.6, 5: 0.3, 6: 0.1 },
    medium:{ 4: 0.4, 5: 0.4, 6: 0.2 },
    hard:  { 4: 0.2, 5: 0.4, 6: 0.4 }
  };

  function pickLength(probabilities) {
    const r = Math.random();
    let sum = 0;

    for (const length in probabilities) {
      sum += probabilities[length];
      if (r <= sum) return Number(length);
    }
  }

  function pickWord() {
    const difficulty = settings.difficulty || "easy";
    const targetLength = pickLength(chances[difficulty]);

    const filtered = words.filter(w => w.length === targetLength);

    if (filtered.length === 0) {
      console.warn(`⚠️ Немає слів довжиною ${targetLength}`);
      return "слово";
    }

    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
  }

  return { pickWord };
}
