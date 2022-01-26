import { useSelector } from "react-redux";
import styles from "./style.module.css";

const Results = () => {
  const progress = useSelector((state) => state.progressReducer);
  const { wordsLength, corrects, attempts } = progress;
  const percent = ((100 * corrects) / attempts).toFixed(2);

  return (
    <div className={styles.results__container}>
      <div className={styles.results}>
        <h3 className={styles.results__title}>Результаты</h3>
        <p>Всего слов разобрано: {wordsLength}</p>
        <p>Неправильных ответов: {attempts - corrects}</p>
        <p>Точность ответов: {isNaN(percent) ? "0.00" : percent}%</p>
      </div>
    </div>
  );
};

export default Results;
