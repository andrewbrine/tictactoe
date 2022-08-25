import { createSlice } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";

const initialState = {
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
    initialiseGame: (state, action) => {
      state = initialState;
    },

    newMove: (state, action) => {
      state.history.push(
        (state.history[state.stepNumber - 1].squares[action.payload] =
          state.xIsNext ? "X" : "O")
      );
      state.history.squares[action.payload] = state.xIsNext ? "X" : "O";
      state.stepNumber++;
      state.xIsNext = !state.xIsNext;
    },

    backToMove: (state, action) => {
      state.history = state.history.slice(0, action.payload + 1);
      state.stepNumber = action.payload;
      state.xIsNext = action.payload % 2 === 0;
    },
  },
});

export const { initialiseGame, newMove, backToMove } = gameSlice.actions;
export default gameSlice.reducer;
