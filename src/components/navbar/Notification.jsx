import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const requests = useSelector((state) => {
    const Carer = state.user.Carer;
    if (Carer) {
      const request = Carer.requests.filter(
        (request) => request.status !== "Pending"
      );
      return request.reverse();
    }
    return [];
  });
  return (
    <div>
      <div className="notification">
        {requests.map((req) => (
          <div className={`req ${req.status}`}>
            <p>request for pet name is {req.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
