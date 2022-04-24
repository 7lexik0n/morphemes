import React, { useState } from "react";
import styles from "../Accordeon/style.module.css";

const AccordeonItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.accorderonItem} onClick={() => setOpen(!open)}>
      <h4 className={styles.accorderonItem__title}>{question}</h4>
      {open && <p className={styles.accorderonItem__answer}>{answer}</p>}
    </div>
  );
};

export default AccordeonItem;
