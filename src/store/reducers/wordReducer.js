import { FINISH_SELECT } from "../actions/morphemesActions";
import { SET_WORD, START_PROGRESS } from "../actions/progressActions";
import { REMOVE__MORPHEME } from "../actions/wordActions";

const initialState = [];

const getParts = (data, start, end) => {
  let preMorphemes = [];
  let postMorphemes = [];

  const touchedMorphemes = new Array(end - start > 0 ? end - start + 1 : 1)
    .fill(0)
    .map((_, index) => data[start + index]);

  if (start !== 0) {
    preMorphemes = data.slice(0, start);
  }

  if (end !== data.length - 1) {
    postMorphemes = data.slice(end + 1);
  }

  return [preMorphemes, touchedMorphemes, postMorphemes];
};

const isDefaultType = (state, index) => state[index].type === "";

const wordReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case START_PROGRESS:
    case SET_WORD: {
      const { word } = action;

      return [
        {
          type: "",
          value: word.word,
        },
      ];
    }
    case REMOVE__MORPHEME: {
      const { morphemeId } = payload;

      if (morphemeId === 0) {
        const newState = [...state];

        if (isDefaultType(state, morphemeId + 1)) {
          newState.splice(morphemeId + 1, 1);
          newState[morphemeId] = {
            type: "",
            value: state[morphemeId].value + state[morphemeId + 1].value,
          };

          return newState;
        } else {
          newState[morphemeId] = {
            type: "",
            value: state[morphemeId].value,
          };

          return newState;
        }
      }

      if (morphemeId === state.length - 1) {
        const newState = [...state];

        if (isDefaultType(state, morphemeId - 1)) {
          newState.splice(morphemeId, 1);
          newState[morphemeId - 1] = {
            type: "",
            value: state[morphemeId - 1].value + state[morphemeId].value,
          };

          return newState;
        } else {
          newState[morphemeId] = {
            type: "",
            value: state[morphemeId].value,
          };

          return newState;
        }
      }

      const newState = [...state];

      if (
        isDefaultType(state, morphemeId - 1) &&
        isDefaultType(state, morphemeId + 1)
      ) {
        newState.splice(morphemeId, 2);
        newState[morphemeId - 1] = {
          type: "",
          value:
            state[morphemeId - 1].value +
            state[morphemeId].value +
            state[morphemeId + 1].value,
        };

        return newState;
      } else if (isDefaultType(state, morphemeId - 1)) {
        newState.splice(morphemeId, 1);
        newState[morphemeId - 1] = {
          type: "",
          value: state[morphemeId - 1].value + state[morphemeId].value,
        };

        return newState;
      } else if (isDefaultType(state, morphemeId + 1)) {
        newState.splice(morphemeId + 1, 1);
        newState[morphemeId] = {
          type: "",
          value: state[morphemeId].value + state[morphemeId + 1].value,
        };

        return newState;
      } else {
        newState[morphemeId] = {
          type: "",
          value: state[morphemeId].value,
        };

        return newState;
      }
    }
    case FINISH_SELECT: {
      const { morphemeType } = payload;
      let {
        morphemeIndex,
        letterIndex,
        startSelect: {
          morphemeIndex: startMorpeheme,
          letterIndex: startLetter,
        },
      } = payload;

      if (
        startMorpeheme > morphemeIndex ||
        (startMorpeheme === morphemeIndex && startLetter > letterIndex)
      ) {
        [startMorpeheme, morphemeIndex] = [morphemeIndex, startMorpeheme];
        [startLetter, letterIndex] = [letterIndex, startLetter];
      }

      let [preMorphemes, touchedMorphemes, postMorphemes] = getParts(
        state,
        startMorpeheme,
        morphemeIndex
      );

      const preMorpheme = {
        type: touchedMorphemes[0].type,
        value: touchedMorphemes[0].value.slice(0, startLetter),
      };

      const postMorpheme = {
        type: touchedMorphemes[touchedMorphemes.length - 1].type,
        value: touchedMorphemes[touchedMorphemes.length - 1].value.slice(
          letterIndex + 1
        ),
      };

      let middleValue = "";

      if (touchedMorphemes.length === 1) {
        middleValue = touchedMorphemes[0].value.slice(
          startLetter,
          letterIndex + 1
        );
      } else {
        middleValue = touchedMorphemes.reduce((acc, morpheme, index) => {
          if (index === 0) {
            acc += morpheme.value.slice(startLetter);
            return acc;
          }
          if (index === touchedMorphemes.length - 1) {
            acc += morpheme.value.slice(0, letterIndex + 1);
            return acc;
          }
          acc += morpheme.value;
          return acc;
        }, "");
      }

      const middleMorphemes = [
        preMorpheme,
        {
          type: morphemeType,
          value: middleValue,
        },
        postMorpheme,
      ].filter((morpheme) => morpheme.value.trim() !== "");

      return [...preMorphemes, ...middleMorphemes, ...postMorphemes];
    }
    default:
      return state;
  }
};

export default wordReducer;
