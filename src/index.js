import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";

import wordReducer from "./store/reducers/wordReducer";
import morphemesReducer from "./store/reducers/morphemesReducer";
import progressReducer from "./store/reducers/progressReducer";

import "./index.css";
import Main from "./screens/Main";
import Home from "./screens/Home";
import ResultsScreen from "./screens/Results";

const rootReducer = combineReducers({
  wordReducer,
  morphemesReducer,
  progressReducer,
});

const store = createStore(rootReducer);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="results" element={<ResultsScreen />} />
        <Route path="main" element={<Main />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
