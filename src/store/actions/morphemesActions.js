export const SET_MORPHEME_TYPE = "SET_MORPHEME_TYPE";
export const INIT_SELECT = "INIT_SELECT";
export const FINISH_SELECT = "FINISH_SELECT";

export const setMorphemeType = (morphemeType) => ({
  type: SET_MORPHEME_TYPE,
  payload: {
    morphemeType,
  },
});

export const initSelect = (morphemeIndex, letterIndex) => ({
  type: INIT_SELECT,
  payload: {
    morphemeIndex,
    letterIndex,
  },
});

export const finishSelect = (
  morphemeIndex,
  letterIndex,
  startSelect,
  morphemeType
) => ({
  type: FINISH_SELECT,
  payload: {
    morphemeIndex,
    letterIndex,
    startSelect,
    morphemeType,
  },
});
