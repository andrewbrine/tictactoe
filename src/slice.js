import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  history: [
    {
      squares: Array(9).fill(null),
    },
  ],
  stepNumber: 0,
  xIsNext: true,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    newMove: (state, action) => {
      const current = state.history[state.history.length - 1];
      current.squares[action.payload] = state.xIsNext ? "X" : "O";
      state.history.push(current);
      state.xIsNext = !state.xIsNext;
      state.stepNumber++;
    },

    backToMove: (state, action) => {
      console.log(action.payload);
      console.log(state.history);
      state.history = action.payload
        ? state.history.slice(0, action.payload)
        : initialState.history;
      console.log(state.history);
      state.stepNumber = action.payload;
      state.xIsNext = action.payload % 2 === 0;
    },
  },
});

export const { newMove, backToMove } = gameSlice.actions;
export default gameSlice.reducer;
