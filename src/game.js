import React from "react";
import Board from "./board";
import { calculateWinner } from "./calculateWinner";
import { useSelector, useDispatch } from "react-redux";
import { newMove, backToMove } from "./slice.js";

function Game() {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.game.history);
  const current = history[history.length - 1];
  const squares = current.squares.slice();
  const xIsNext = useSelector((state) => state.game.xIsNext);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    dispatch(newMove(i));
  };

  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const description = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button class="button" onClick={() => dispatch(backToMove(move))}>
          {description}
        </button>
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
    <div>
      <h1>TIC TAC TOE</h1>
      <div class="board">
        <Board squares={current.squares} handleClick={handleClick} />
      </div>
      <div id="info">{status}</div>
      <ol class="move-list">{moves}</ol>
    </div>
  );
}

export default Game;
