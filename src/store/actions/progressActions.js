export const SET_WORD = "SET_WORD";
export const START_PROGRESS = "START_PROGRESS";
export const SET_CORRECT_STATUS = "SET_CORRECT_STATUS";
export const SET_WRONG_STATUS = "SET_WRONG_STATUS";

export const setWord = (word, index) => ({
  type: SET_WORD,
  word,
  index,
});

export const startProgress = (word) => ({
  type: START_PROGRESS,
  word,
});

export const setCorrectStatus = () => ({
  type: SET_CORRECT_STATUS,
});

export const setWrongStatus = () => ({
  type: SET_WRONG_STATUS,
});
