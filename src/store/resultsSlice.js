import { createSlice } from "@reduxjs/toolkit";

const resultsSlice = createSlice({
  name: "results",
  initialState: [],
  reducers: {
    addResult(state, action) {
      state.push(action.payload);
    }
  }
});

export const { addResult } = resultsSlice.actions;
export default resultsSlice.reducer;
