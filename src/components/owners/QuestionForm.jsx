import React from "react";
import { useState } from "react";

function Question({ question, index, removeQuestion }) {
  return (
    <div>
      {question.text}
      <div>
        <i onClick={() => removeQuestion(index)}>x</i>
      </div>
    </div>
  );
}

function QForm({ addQuestion }) {
  const [value, setValue] = useState("");

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
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleClick}>+</button>
    </form>
  );
}

function QuestionForm(props) {
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
    <div>
      <ul>
        {props.questions.map((question, index) => (
          <Question
            key={index}
            index={index}
            question={question}
            removeQuestion={removeQuestion}
          />
        ))}
      </ul>
      <QForm addQuestion={addQuestion} />
    </div>
  );
}

export default QuestionForm;
