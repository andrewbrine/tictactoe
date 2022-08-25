import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Game from "./game.js";
import { store } from "./store.js";
import { Provider } from "react-redux";
// ========================================

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById("root")
);
