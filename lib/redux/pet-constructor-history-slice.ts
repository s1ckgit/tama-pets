import { createSlice } from "@reduxjs/toolkit";
import { type HistoryState } from "../types";

const MAX_HISTORY_SIZE = 5;

const initialState = {
  history: []
} as HistoryState;

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistory(state, action) {
      if (state.history.length === MAX_HISTORY_SIZE) {
        state.history.shift();
      }
      state.history.push(action.payload);
    }
  }
});

export const { addHistory } = historySlice.actions;
export default historySlice.reducer;
