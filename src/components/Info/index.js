import { useSelector } from "react-redux";
import styles from "./style.module.css";

const Info = () => {
  const progress = useSelector((state) => state.progressReducer);
  const { wordsLength, corrects, attempts, currentIndex } = progress;
  const percent = (100 * corrects / attempts).toFixed(2);

  return (
    <div className={styles.info__container}>
      <p>
        Прогресс: {currentIndex + 1} из {wordsLength}
      </p>
      <div className={styles.progress__container}>
        <div
          className={styles.progress__bar}
          style={{ width: `${(100 * (currentIndex + 1)) / wordsLength}%` }}
        ></div>
      </div>
      <p>Решений: {isNaN(percent) ? "0.00" : percent}%</p>
    </div>
  );
};

export default Info;
