import { useState, useEffect } from "react";

export function useAnagram(word) {
  const [shuffled, setShuffled] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  const shuffleWord = (str) => {
    return str
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  };

  useEffect(() => {
    if (word) {
      setShuffled(shuffleWord(word));
    }
  }, [word]);

  const checkAnswer = (answer) => {
    const correct = answer.toLowerCase() === word.toLowerCase();
    setIsCorrect(correct);
    return correct;
  };

  return {
    shuffled,
    isCorrect,
    checkAnswer,
  };
}
