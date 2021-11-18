import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

const PendingRequests = () => {
  const [pendingRequests, setPendingRequest] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const action = await axios.get(
          `${REACT_APP_SERVER_URL}/requests/pending`,
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        );
        setPendingRequest(action.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="PendingRequests">
      <div className="pending">
        <h2>Pending Requests</h2>
        <section className="pendingLists">
          {pendingRequests.map((req, i) => (
            <div className="request" key={i}>
              <div className="requestInfo">
                <p>Request for max</p>
                <p>
                  <span>from: </span>{" "}
                  {moment(req.request.start).format("MMM-DD-yyyy")}
                </p>
                <p>
                  <span>to:</span>{" "}
                  {moment(req.request.end).format("MMM-DD-yyyy")}
                </p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default PendingRequests;
