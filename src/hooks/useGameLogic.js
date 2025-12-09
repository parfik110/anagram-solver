import { useEffect, useState } from "react";
import { useGameSettings } from "../context/GameSettingsContext";
import { useWordGenerator } from "./useWordGenerator";

export function useGameLogic() {
  const { settings } = useGameSettings();
  const { pickWord } = useWordGenerator();

  const [originalWord, setOriginalWord] = useState("");
  const [shuffled, setShuffled] = useState("");
  const [answer, setAnswer] = useState("");

  const [attemptsLeft, setAttemptsLeft] = useState(settings.attempts);
  const [timeLeft, setTimeLeft] = useState(settings.time);

  const [showHintPrompt, setShowHintPrompt] = useState(false);
  const [hint, setHint] = useState(null);
  const [hintUsed, setHintUsed] = useState(false);

  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState(null);

  const shuffleWord = (str) => {
    let shuffled = str;

    while (shuffled === str) {
      shuffled = str
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
    }

    return shuffled;
  };

  const startNewWord = () => {
    const word = pickWord();
    setOriginalWord(word);
    setShuffled(shuffleWord(word));
  };

  useEffect(() => {
    startNewWord();
  }, []);

  useEffect(() => {
    if (gameOver) return;

    if (timeLeft <= 0) {
      setGameOver(true);
      setGameResult("time");
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameOver]);

  const checkAnswer = () => {
    if (answer.toLowerCase() === originalWord.toLowerCase()) {
      setGameOver(true);
      setGameResult("win");
      return;
    }

    const newAttempts = attemptsLeft - 1;
    setAttemptsLeft(newAttempts);

    if (settings.hintsEnabled && newAttempts === settings.attempts - 2) {
      setShowHintPrompt(true);
    }

    if (newAttempts <= 0) {
      setGameOver(true);
      setGameResult("lose");
    }
  };

  const generateHint = () => {
    const types = ["first", "random", "two"];
    const type = types[Math.floor(Math.random() * types.length)];

    let hintText = "";

    if (type === "first") {
      hintText = `Перша літера: ${originalWord[0]}`;
    }

    if (type === "random") {
      const idx = Math.floor(Math.random() * originalWord.length);
      hintText = `Випадкова літера: ${originalWord[idx]}`;
    }

    if (type === "two") {
      hintText = `Перші дві літери: ${originalWord.slice(0, 2)}`;
    }

    setHint(hintText);
    setHintUsed(true);
    setShowHintPrompt(false);
  };

  const resetGame = () => {
    setAnswer("");
    setAttemptsLeft(settings.attempts);
    setTimeLeft(settings.time);
    setShowHintPrompt(false);
    setHint(null);
    setHintUsed(false);
    setGameOver(false);
    setGameResult(null);
    startNewWord();
  };

  return {
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
  };
}
