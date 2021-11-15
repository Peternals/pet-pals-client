import React from "react";
import { useNavigate, useLocation, useState } from "react-router-dom";
import "../styles/carer/questionnaire.scss";
import axios from "axios";
import { useSelector } from "react-redux";

// TODO: Questionnaire receives the questionnaire for the pet.
const Questionnaire = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user_id = useSelector((state) => state.user._id);
  const { pet, start, end } = location.state;
  const { qa, setQa } = useState(
    pet.questionnaire.map((question) => {
      return {
        question: question,
        answer: "",
      };
    })
  );
  // TODO: Get User Id from the store.

  // Assumption that we pass our date in also
  async function onSubmit(data) {
    data.preventDefault();
    // const results = data.target; //.value;
    // console.log(results);
    // for (let input of results) {
    //   // TODO: How are we going to use inputs?
    //   console.log("input:", input.value);
    // }

    const request = {
      pet_id: pet.id,
      start: start ?? "2021-01",
      end: end ?? "2021-12-09",
      status: "Pending",
      questionnaire: qa,
    };

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
    // TODO: Do I need all existing requests for Patch?
    const payload = {
      Carer: {
        requests: [request],
      },
    };
    // TODO: Use the controller to update - To avoid data deletion.
    // TODO: Provide auth token in headers
    await axios.patch(`/user/${user_id}`, payload);
    navigate("/");
  }

  // TEST DATA - TO BE REMOVED
  //   const testQuestions = [
  //     "Do you like dogs?",
  //     "Have you looked after dogs before?",
  //     "Are you a kind person?",
  //   ];

  const handleInput = (e, index) => {
    const newQa = [...qa];
    newQa[index]["answer"] = e.target.value;
    setQa(newQa);
  };

  return (
    <main className="questionnaireMain">
      <p>Hello</p>
      <form onSubmit={onSubmit}>
        {pet.questionnaire.map((question, index) => {
          return (
            <div key={index} className="input-group">
              <label>
                {question}
                <textarea
                  type="text"
                  className="form-control"
                  onChange={handleInput(index)}
                ></textarea>
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
