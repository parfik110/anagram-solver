import { useState } from "react";

export function useGameState() {
  const [answer, setAnswer] = useState("");

  const updateAnswer = (value) => {
    setAnswer(value);
  };

  const reset = () => {
    setAnswer("");
  };

  return {
    answer,
    updateAnswer,
    reset,
  };
}
