import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCorrectStatus,
  setWord,
  setWrongStatus,
  startProgress,
} from "../../store/actions/progressActions";
import Loading from "../Loading";
import Morpheme from "../Morpheme";
import styles from "./style.module.css";

const Word = () => {
  const dispatch = useDispatch();

  const word = useSelector((state) => state.wordReducer);
  const progress = useSelector((state) => state.progressReducer);

  useLayoutEffect(() => {
    if (!progress.currentWord) {
      dispatch(startProgress(progress.words[0]));
    }
  }, []);

  const { status, currentIndex } = progress;
  const nextWord = progress.words[currentIndex + 1];

  const checkComposition = () => {
    const answer = progress.currentWord.composition;

    const result = word.every(
      (morpheme, index) =>
        morpheme.type === answer[index].type &&
        morpheme.value === answer[index].value
    );

    if (!result) {
      dispatch(setWrongStatus());
    } else {
      dispatch(setCorrectStatus());
    }
  };

  const buttonClassNames = [styles.button];

  if (status === "correct") {
    buttonClassNames.push(styles.button_correct);
  }

  if (status === "wrong") {
    buttonClassNames.push(styles.button_wrong);
  }

  const content =
    word.length === 0 ? (
      <Loading />
    ) : (
      <div className={styles.word__container}>
        <div className={styles.word}>
          {word.map((morpheme, index) => (
            <Morpheme key={index} morpheme={morpheme} index={index} />
          ))}
        </div>
        <button
          className={buttonClassNames.join(" ")}
          onClick={
            status === "correct"
              ? () => {
                  dispatch(setWord(nextWord, currentIndex + 1));
                }
              : checkComposition
          }
        >
          {status === "correct" ? "Далее" : "Проверить"}
        </button>
      </div>
    );

  return <div className={styles.word__screen}>{content}</div>;
};

export default Word;
