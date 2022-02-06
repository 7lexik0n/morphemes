import styles from "./style.module.css";
import Prefix from "../Prefix";
import { useRef, useEffect, useState } from "react";
import Postfix from "../Postfix";
import Suffix from "../Suffix";
import Root from "../Root";
import { useDispatch, useSelector } from "react-redux";
import { setMorphemeType } from "../../store/actions/morphemesActions";

const Morphemes = () => {
  const { type } = useSelector((state) => state.morphemesReducer);
  const dispatch = useDispatch();

  const [prefixFocus, setPrefixFocus] = useState(false);
  const [rootFocus, setRootFocus] = useState(false);
  const [postfixFocus, setPostfixFocus] = useState(false);
  const [suffixFocus, setSuffixFocus] = useState(false);

  const [canvasProps, setCanvasProps] = useState({
    prefix: 0,
    root: 0,
    postfix: 0,
    suffix: 0,
  });

  const prefix = useRef(null);
  const root = useRef(null);
  const postfix = useRef(null);
  const suffix = useRef(null);

  const windowWidth = window.innerWidth;
  const maxWidth = 120;
  const height = windowWidth > 768 ? 50 : 40;

  useEffect(() => {
    setCanvasProps({
      prefix: parseInt(getComputedStyle(prefix.current).width),
      root: parseInt(getComputedStyle(root.current).width),
      postfix: parseInt(getComputedStyle(postfix.current).width),
      suffix: parseInt(getComputedStyle(suffix.current).width),
    });
  }, [height, windowWidth]);

  return (
    <div className={styles.morphemes__container}>
      <div
        className={
          type === "prefix"
            ? [styles.morphemes__item_active, styles.morphemes__item].join(" ")
            : styles.morphemes__item
        }
        ref={prefix}
        onClick={() => {
          type === "prefix"
            ? dispatch(setMorphemeType(null))
            : dispatch(setMorphemeType("prefix"));
        }}
        onMouseEnter={() => setPrefixFocus(true)}
        onMouseLeave={() => setPrefixFocus(false)}
      >
        <Prefix
          width={canvasProps.prefix > maxWidth ? maxWidth : canvasProps.prefix}
          height={height}
          lineWidth={3}
          active={type === "prefix" || prefixFocus}
        />
        <span className={styles.morphemes__title}>Приставка</span>
      </div>
      <div
        className={
          type === "root"
            ? [styles.morphemes__item_active, styles.morphemes__item].join(" ")
            : styles.morphemes__item
        }
        ref={root}
        onClick={() => {
          type === "root"
            ? dispatch(setMorphemeType(null))
            : dispatch(setMorphemeType("root"));
        }}
        onMouseEnter={() => setRootFocus(true)}
        onMouseLeave={() => setRootFocus(false)}
      >
        <Root
          width={canvasProps.root > maxWidth ? maxWidth : canvasProps.root}
          height={height}
          lineWidth={3}
          active={type === "root" || rootFocus}
        />
        <span className={styles.morphemes__title}>Корень</span>
      </div>
      <div
        className={
          type === "postfix"
            ? [styles.morphemes__item_active, styles.morphemes__item].join(" ")
            : styles.morphemes__item
        }
        ref={postfix}
        onClick={() => {
          type === "postfix"
            ? dispatch(setMorphemeType(null))
            : dispatch(setMorphemeType("postfix"));
        }}
        onMouseEnter={() => setPostfixFocus(true)}
        onMouseLeave={() => setPostfixFocus(false)}
      >
        <Postfix
          width={
            canvasProps.postfix > maxWidth ? maxWidth : canvasProps.postfix
          }
          height={height}
          lineWidth={3}
          active={type === "postfix" || postfixFocus}
        />
        <span className={styles.morphemes__title}>Суффикс</span>
      </div>
      <div
        className={
          type === "suffix"
            ? [styles.morphemes__item_active, styles.morphemes__item].join(" ")
            : styles.morphemes__item
        }
        ref={suffix}
        onClick={() => {
          type === "suffix"
            ? dispatch(setMorphemeType(null))
            : dispatch(setMorphemeType("suffix"));
        }}
        onMouseEnter={() => setSuffixFocus(true)}
        onMouseLeave={() => setSuffixFocus(false)}
      >
        <Suffix
          width={canvasProps.suffix > maxWidth ? maxWidth : canvasProps.suffix}
          height={height}
          lineWidth={3}
          active={type === "suffix" || suffixFocus}
        />
        <span className={styles.morphemes__title}>Окончание</span>
      </div>
    </div>
  );
};

export default Morphemes;
