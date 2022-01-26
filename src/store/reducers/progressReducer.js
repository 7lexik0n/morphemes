import words from "../../data/dummy-date";
import {
  SET_CORRECT_STATUS,
  SET_WORD,
  SET_WRONG_STATUS,
  START_PROGRESS,
} from "../actions/progressActions";

const initialState = {
  currentWord: null,
  currentIndex: 0,
  corrects: 0,
  attempts: 0,
  status: null,
  words,
  wordsLength: words.length,
  finish: false,
};

const progressReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case START_PROGRESS: {
      const { word } = action;

      return {
        ...state,
        currentWord: word,
        currentIndex: 0,
        corrects: 0,
        attempts: 0,
        status: null,
        wordsLength: words.length,
        finish: false,
      };
    }
    case SET_WORD: {
      const { word, index } = action;

      return {
        ...state,
        currentWord: word,
        currentIndex: index,
        status: null,
      };
    }
    case SET_CORRECT_STATUS: {
      return {
        ...state,
        corrects: state.corrects + 1,
        attempts: state.attempts + 1,
        status: "correct",
        finish: state.currentIndex + 1 === state.wordsLength,
      };
    }
    case SET_WRONG_STATUS: {
      return {
        ...state,
        attempts: state.attempts + 1,
        status: "wrong",
      };
    }
    default:
      return state;
  }
};

export default progressReducer;
