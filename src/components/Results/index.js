import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import { startProgress } from "../../store/actions/progressActions";

const Results = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const progress = useSelector((state) => state.progressReducer);
  const { corrects, attempts, mistakes } = progress;
  const percent = ((100 * corrects) / attempts).toFixed(2);

  const goHome = () => navigate("/");

  const restart = () => {
    dispatch(startProgress(progress.words[0]));
    navigate("main");
  };

  let content = (
    <div>
      <p>Пройдите тест для просмотра результатов!</p>
    </div>
  );

  if (attempts) {
    const mistakesContainer = Array.from(mistakes).map((el, index, arr) => (
      <span key={index}>
        {el}
        {index < arr.length - 1 ? ", " : ""}
      </span>
    ));

    content = (
      <div>
        <p>Всего слов разобрано: {corrects}</p>
        <p>Неправильных ответов: {attempts - corrects}</p>
        <p>
          Ошибки: {mistakesContainer.length > 0 ? mistakesContainer : "нет"}
        </p>
        <p>Точность ответов: {isNaN(percent) ? "0.00" : percent}%</p>
      </div>
    );
  }

  return (
    <div className={styles.results__container}>
      <div className={styles.results}>
        <h3 className={styles.results__title}>Результаты</h3>
        {content}
        <div className={styles.buttonsContainer}>
          <button className={styles.button} onClick={restart}>
            Начать заново
          </button>
          <button className={styles.button} onClick={goHome}>
            На главную
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
