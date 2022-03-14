import React, { useRef, useState } from "react";
import AnswerForm from "./AnswerForm";
import moment from "moment";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
const { REACT_APP_SERVER_URL } = process.env;

const Request = () => {
  const answerFormRef = useRef();
  const requests = useSelector((state) => state.user.ownerRequests);

  const [currentRequest, setCurrentRequest] = useState({});

  const openAnswerForm = (req) => {
    setCurrentRequest(req);
    answerFormRef.current.classList.add("showAnswerForm");
  };

  return (
    <section className="requestSection">
      <h1>Requests</h1>
      <div className="gridRequest">
        {requests.length > 0 ? (
          requests.map((req) => (
            <div className="request">
              <LazyLoadImage
                src={`${REACT_APP_SERVER_URL}/pic/${req.profile_picture}`}
                alt="img"
              />
              <div className="requestInfo">
                <h3>{req.username}</h3>
                <p>Request for {req.request.pet_name}</p>
                <p>
                  <span>from: </span>{" "}
                  {moment(req.request.start).format("MMM-DD-yyyy")}
                </p>
                <p>
                  <span>to:</span>{" "}
                  {moment(req.request.end).format("MMM-DD-yyyy")}
                </p>
                <button onClick={() => openAnswerForm(req)}>Review</button>
              </div>
            </div>
          ))
        ) : (
          <h2>No Pending Requests yet...</h2>
        )}
      </div>
      <AnswerForm
        answerFormRef={answerFormRef}
        setCurrentRequest={setCurrentRequest}
        currentRequest={currentRequest}
      />
    </section>
  );
};

export default Request;
