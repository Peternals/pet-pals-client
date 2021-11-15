import React from "react";
import { useState } from "react";

function Question({ question, index, removeQuestion }) {
  return (
    <div>
      {question.text}
      <div>
        <button onClick={() => removeQuestion(index)}>x</button>
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
    <div>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleClick}>+</button>
    </div>
  );
}

function QuestionForm() {
  const [questions, setQuestions] = useState([]);

  const addQuestion = (text) => {
    const newQuestions = [...questions, { text }];
    setQuestions(newQuestions);
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    questions.splice(index, 1);
    setQuestions(newQuestions);
  };

  return (
    <div>
      {questions.map((question, index) => (
        <Question
          key={index}
          index={index}
          question={question}
          removeQuestion={removeQuestion}
        />
      ))}
      <QForm addQuestion={addQuestion} />
    </div>
  );
}

export default QuestionForm;
