import React, { useState } from "react";
import Board from "./board";
import { calculateWinner } from "./calculateWinner";
import { useSelector, useDispatch } from "react-redux";
import { initialiseGame, newMove, backToMove } from "./slice.js";

function Game() {
  const dispatch = useDispatch();
  //  dispatch(initialiseGame);
  const history = useSelector((state) => state.game.history);
  const current = history[history.length - 1];
  const squares = current.squares.slice();
  const xIsNext = useSelector((state) => state.game.xIsNext);

  // const [state, setState] = useState({
  //   history: [
  //     {
  //       squares: Array(9).fill(null),
  //     },
  //   ],
  //   stepNumber: 0,
  //   xIsNext: true,
  // });

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // const history = state.history.slice(0, state.stepNumber + 1);
    // const current = history[history.length - 1];
    // const squares = current.squares.slice();
    dispatch(newMove(i));
    // setState({
    //   history: history.concat([
    //     {
    //       squares: squares,
    //     },
    //   ]),
    //   stepNumber: history.length,
    //   xIsNext: !state.xIsNext,
    // });
  };

  const jumpTo = (step) => {
    dispatch(backToMove(step));
  };

  //   const history = state.history;
  //   const current = history[state.stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const description = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} handleClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
