import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const PendingRequests = () => {
  const pendingRequests = useSelector((state) => {
    const Carer = state.user.Carer;
    if (Carer) {
      const request = Carer.requests.filter(
        (request) => request.status === "Pending"
      );
      return request;
    }
    return [];
  });
  return (
    <div className="PendingRequests">
      <div className="pending">
        <h2>Pending Lists</h2>
        <section className="pendingLists">
          {pendingRequests.map((req) => (
            <div className="request">
              <div className="requestInfo">
                <h3>{req.username}</h3>
                <p>Request for max</p>
                <p>
                  <span>from: </span> {moment(req.start).format("MMM-DD-yyyy")}
                </p>
                <p>
                  <span>to:</span> {moment(req.end).format("MMM-DD-yyyy")}
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
