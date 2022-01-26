import React from "react";
import ReactDOM from "react-dom";

import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";

import wordReducer from "./store/reducers/wordReducer";
import morphemesReducer from "./store/reducers/morphemesReducer";
import progressReducer from "./store/reducers/progressReducer";

import "./index.css";
import App from "./App";

const rootReducer = combineReducers({
  wordReducer,
  morphemesReducer,
  progressReducer,
});

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
