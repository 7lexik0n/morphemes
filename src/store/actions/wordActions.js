export const REMOVE__MORPHEME = "REMOVE_MORPHEME";

export const removeMorpheme = (morphemeId) => ({
  type: REMOVE__MORPHEME,
  payload: {
    morphemeId,
  },
});