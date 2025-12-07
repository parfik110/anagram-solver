import { createSlice } from "@reduxjs/toolkit";

export const difficultyPresets = {
  easy: { attempts: 5, time: 60, hintsEnabled: true },
  medium: { attempts: 4, time: 45, hintsEnabled: true },
  hard: { attempts: 3, time: 30, hintsEnabled: false }
};

const initialState = {
  difficulty: "easy",
  attempts: 5,
  time: 60,
  hintsEnabled: true
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateSettings(state, action) {
      return { ...state, ...action.payload };
    }
  }
});

export const { updateSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
