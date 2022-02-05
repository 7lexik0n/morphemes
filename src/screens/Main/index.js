import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Info from "../../components/Info";
import Morphemes from "../../components/Morphemes";
import Results from "../../components/Results";
import Word from "../../components/Word";

import styles from "./style.module.css";

function Main() {
  const progress = useSelector((state) => state.progressReducer);

  if (progress.finish) {
    return <Results />;
  }

  return (
    <div className="Main">
      <Link to="/" className={styles.link}>
        {"<"} На главную
      </Link>
      <Info />
      <Word />
      <Morphemes />
    </div>
  );
}

export default Main;
