// import React from 'react';
import { useNavigate } from "react-router-dom";
import Accordeon from '../../components/Accordeon';
import styles from "./style.module.css";

const HelpScreen = () => {
  const navigate = useNavigate();

  const goHome = () => navigate("/");

  const faq = [
    {
      question: 'Как начать тест?',
      answer: 'Чтобы начать прохождение теста, нажмите кнопку "Начать" на главном экране.'
    },
    {
      question: 'Как выделить морфему?',
      answer: 'Для начала выберите нужную морфему внизу экрана. Теперь вам нужно кликнуть два раза: первый на начальную букву в слове, второй - на конечную. Если морфема состоит из одной буквы (например, окончание), кликните дважды на одну и ту же букву. Если вы кликнули единожды, выбрав начало морфемы, программа не будет реагировать на другие действия, ожидая окончания выделения.'
    },
    {
      question: 'Почему нельзя поставить нулевое окончание?',
      answer: 'Если в слове нулевое окончание, просто не выделяйте его. Программа поймет ваш выбор.'
    },
    {
      question: 'Как удалить установленную морфему?',
      answer: 'Кликните один раз по символу морфемы над словом.'
    },
    {
      question: 'Почему я не вижу результатов?',
      answer: 'Результаты появятся на соответствующей вкладке после полного прохождения теста.'
    }
  ];


  return (
    <div className={styles.help__container}>
      <div className={styles.help}>
      <h3 className={styles.help__title}>Вопросы и инструкции</h3>
        <Accordeon faq={faq} />        
        <button className={styles.button} onClick={goHome}>
          На главную
        </button>
      </div>
    </div>
  );
};

export default HelpScreen;
