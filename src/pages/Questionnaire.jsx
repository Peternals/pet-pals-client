import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/carer/questionnaire.scss";
import axios from "axios";
import { useSelector } from "react-redux";

// TODO: Questionnaire receives the questionnaire for the pet.
const Questionnaire = () => {
  const { REACT_APP_SERVER_URL } = process.env;
  const navigate = useNavigate();
  const location = useLocation();
  const user_id = useSelector((state) => state.user._id);
  const { pet, start, end } = location.state;
  const [qa, setQa] = useState([{ question: "Test", answer: "Test answer" }]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (pet) {
      const arr = pet.questionnaire.map((question) => {
        return {
          question: question,
          answer: "",
        };
      });
      setQa(arr);
    }
  }, [pet, setQa]);

  useEffect(() => {
    // Get all requests for the pet ID.
    (async () => {
      try {
        console.log("pet: ", pet);
        const token = localStorage.getItem("token");
        const { data: response } = await axios.get(
          `${REACT_APP_SERVER_URL}/pet/requests/${pet._id}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        setRequests(response);
      } catch (err) {
        return { err: err.response.data };
      }
    })();
  }, [REACT_APP_SERVER_URL, pet]);

  async function onSubmit(data) {
    data.preventDefault();

    const request = {
      pet_id: pet._id,
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
        requests: [...requests, request],
      },
    };
    try {
      await axios.patch(`${REACT_APP_SERVER_URL}/user/${user_id}`, payload, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
    } catch (err) {
      console.error(err);
    }
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
                  onChange={(e) => {
                    handleInput(e, index);
                  }}
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
