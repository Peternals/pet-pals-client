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
        {requests.map((req, i) => (
          <div key={i} className={`req ${req.status}`}>
            <p>
              Request for {req.pet_name} is{" "}
              {req.status === "Rejected" ? "Unsuccessful" : req.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
