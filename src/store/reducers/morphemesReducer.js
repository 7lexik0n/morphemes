import {
  SET_MORPHEME_TYPE,
  INIT_SELECT,
  FINISH_SELECT,
} from "../actions/morphemesActions";

const initialState = {
  type: null,
  selecting: false,
  startSelect: {
    morhpemeIndex: 0,
    letterIndex: 0,
  },
  endSelect: {
    morhpemeIndex: 0,
    letterIndex: 0,
  },
};

const morphemesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MORPHEME_TYPE:
      const { morphemeType } = payload;
      return { ...state, type: morphemeType };
    case INIT_SELECT: {
      const { morphemeIndex, letterIndex } = payload;
      return {
        ...state,
        selecting: true,
        startSelect: {
          morphemeIndex,
          letterIndex,
        },
      };
    }
    case FINISH_SELECT: {
      const { morphemeIndex, letterIndex } = payload;
      return {
        type: null,
        selecting: false,
        startSelect: {
          morphemeIndex: 0,
          letterIndex: 0,
        },
        endSelect: {
          morphemeIndex: 0,
          letterIndex: 0,
        },
      };
    }
    default:
      return state;
  }
};

export default morphemesReducer;
