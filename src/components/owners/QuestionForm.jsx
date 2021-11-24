import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function Question({ question, index, removeQuestion, currentQuestionRef }) {
  return (
    <li ref={currentQuestionRef}>
      <div className="question">
        <p>{question.text}</p>
        <i className="fa fa-close" onClick={() => removeQuestion(index)}></i>
      </div>
    </li>
  );
}

function QForm({ addQuestion }) {
  const [value, setValue] = useState("");
  const type = useSelector((state) => state.pet.info.type);

  const questions = [
    `Do you like ${type.toLowerCase()}s?`,
    `Have you ever taken care of ${type.toLowerCase()}s?`,
    `How do you like ${type.toLowerCase()}s?`,
    `What should you be careful when you play with ${type.toLowerCase()}s?`,
  ];

  const randomQuestion = () => {
    return questions[Math.floor(Math.random() * questions.length)];
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!value) return;
    addQuestion(value);
    setValue("");
  };

  return (
    <form onSubmit={handleClick}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder={randomQuestion()}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleClick} className="fa fa-plus"></button>
    </form>
  );
}

function QuestionForm(props) {
  const { currentQuestionRef } = props;
  const addQuestion = (text) => {
    const newQuestions = [...props.questions, { text }];
    props.updateQuestions(newQuestions);
  };

  const removeQuestion = (index) => {
    const newQuestions = [...props.questions];
    newQuestions.splice(index, 1);
    props.updateQuestions(newQuestions);
  };

  return (
    <>
      <ol>
        {props.questions.map((question, index) => (
          <Question
            key={index}
            index={index}
            question={question}
            removeQuestion={removeQuestion}
            currentQuestionRef={currentQuestionRef}
          />
        ))}
      </ol>
      <QForm addQuestion={addQuestion} />
    </>
  );
}

export default QuestionForm;
