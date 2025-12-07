import { createContext, useContext, useState, useEffect } from "react";

const GameSettingsContext = createContext();

export const difficultyPresets = {
  easy: {
    attempts: 5,
    time: 40,
    hintsEnabled: true
  },
  medium: {
    attempts: 3,
    time: 25,
    hintsEnabled: true
  },
  hard: {
    attempts: 2,
    time: 15,
    hintsEnabled: false
  }
};

export function GameSettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("gameSettings");

    if (saved) {
      setSettings(JSON.parse(saved));
    } else {
      setSettings({
        difficulty: "easy",
        attempts: difficultyPresets.easy.attempts,
        time: difficultyPresets.easy.time,
        hintsEnabled: difficultyPresets.easy.hintsEnabled
      });
    }
  }, []);

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem("gameSettings", JSON.stringify(newSettings));
  };

  if (!settings) return null; 

  return (
    <GameSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </GameSettingsContext.Provider>
  );
}

export function useGameSettings() {
  return useContext(GameSettingsContext);
}
