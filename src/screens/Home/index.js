import React from "react";
import styles from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { startProgress } from "../../store/actions/progressActions";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const progress = useSelector((state) => state.progressReducer);
  const { finish, attempts } = progress;

  const restart = () => {
    dispatch(startProgress(progress.words[0]));
    navigate("/main");
  };

  return (
    <div className={styles.main}>
      <div>
        {finish ? (
          <p className={styles.link} onClick={restart}>
            Начать заново
          </p>
        ) : (
          <Link to="/main" className={styles.link}>
            {attempts > 0 ? "Продолжить" : "Начать"}
          </Link>
        )}
        <Link to="/results" className={styles.link}>
          Результаты
        </Link>
        <Link to="/help" className={styles.link}>
          Помощь
        </Link>
      </div>
    </div>
  );
};

export default Home;
