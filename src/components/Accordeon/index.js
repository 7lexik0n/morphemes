import React from "react";
import AccordeonItem from "../AccordeonItem";
import styles from './style.module.css';

const Accordeon = ({ faq }) => {
  const content = faq.map(({ question, answer }, index) => (
    <AccordeonItem key={index} question={question} answer={answer} />
  ));

  return <div className={styles.accordeon}>{content}</div>;
};

export default Accordeon;
