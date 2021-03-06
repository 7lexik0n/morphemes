import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeMorpheme } from "../../store/actions/wordActions";
import { initSelect, finishSelect } from "../../store/actions/morphemesActions";
import Postfix from "../Postfix";
import Prefix from "../Prefix";
import Root from "../Root";
import Suffix from "../Suffix";
import styles from "./style.module.css";

const Morpheme = ({ morpheme, index: morphemeIndex }) => {
  const [canvasWidth, setCanvasWidth] = useState(0);
  const lettersEl = useRef(null);

  const {
    type: morphemeType,
    selecting,
    startSelect,
  } = useSelector((state) => state.morphemesReducer);
  const dispatch = useDispatch();

  const { type } = morpheme;
  const letters = morpheme.value.split("");

  const classes = [styles.morphemes__container];
  let morphemeCanvas = <div className={styles.morphemes__graph}></div>;

  const windowWidth = window.innerWidth;
  const height = windowWidth > 768 ? 50 : 20;
  const suffixheight = windowWidth > 768 ? 75 : 25;

  useEffect(() => {
    setCanvasWidth(parseInt(getComputedStyle(lettersEl.current).width) - 10);
  }, [morpheme, height, windowWidth]);

  switch (type) {
    case "prefix":
      classes.push(styles.morphemes__container_prefix);
      morphemeCanvas = <Prefix width={canvasWidth} height={height} />;
      break;
    case "root":
      classes.push(styles.morphemes__container_root);
      morphemeCanvas = <Root width={canvasWidth} height={height} />;
      break;
    case "postfix":
      classes.push(styles.morphemes__container_postfix);
      morphemeCanvas = <Postfix width={canvasWidth} height={height} />;
      break;
    case "suffix":
      classes.push(styles.morphemes__container_suffix);
      morphemeCanvas = (
        <Suffix width={canvasWidth + 10} height={suffixheight} />
      );
      break;
    default:
      break;
  }

  const onLetterClickHandler = (morphemeIndex, letterIndex) => {
    if (morphemeType && !selecting) {
      dispatch(initSelect(morphemeIndex, letterIndex));
    }
    if (morphemeType && selecting) {
      dispatch(
        finishSelect(morphemeIndex, letterIndex, startSelect, morphemeType)
      );
    }
  };

  return (
    <div className={classes.join(" ")}>
      <div
        className={styles.morphemes__graph}
        onClick={() => {
          if (!selecting) {
            dispatch(removeMorpheme(morphemeIndex));
          }
        }}
      >
        {morphemeCanvas}
      </div>
      <div className={styles.letters__container} ref={lettersEl}>
        {letters.map((letter, index) => (
          <span
            className={styles.letters__item}
            key={index}
            onClick={() => {
              onLetterClickHandler(morphemeIndex, index);
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Morpheme;
