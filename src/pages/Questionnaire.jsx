import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/carer/questionnaire.scss";
import axios from "axios";

const Questionnaire = () => {
  const navigate = useNavigate();
  const 
  // Required Inputs: Questions asked by Owner for Pet
  // for each question generate a label for the question and an input for the answers.

  async function onSubmit(data) {
    data.preventDefault();
    const results = data.target; //.value;
    console.log(results);
    for (let input of results) {
      // TODO: How are we going to use inputs?
      console.log("input:", input.value);
    }

    // await axios.post("", {}, {
    //     headers: 'asdasdadas'
    // })
    // TODO:Patch request
    /**
     * Need User ID
     * Need pet_Id
     * Need start date
     * Need end date
     * Need questions in form {question: "x", "answer": "y"}
     */

    const userId = 1;
    const payload = {
      Carer: {
        requests: [],
      },
    };
    await axios.patch(`/user/${userId}`, payload);
    navigate("/");
  }

  // TEST DATA - TO BE REMOVED
  const testQuestions = [
    "Do you like dogs?",
    "Have you looked after dogs before?",
    "Are you a kind person?",
  ];
  return (
    <main className="questionnaireMain">
      <p>Hello</p>
      <form onSubmit={onSubmit}>
        {testQuestions.map((question, index) => {
          return (
            <div key={index} className="input-group">
              <label>
                {question}
                <textarea type="text" className="form-control"></textarea>
              </label>
            </div>
          );
        })}
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default Questionnaire;
