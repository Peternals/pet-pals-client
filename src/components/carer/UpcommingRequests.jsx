import React from "react";
import Calendar from "react-calendar";
import { useSelector } from "react-redux";

const UpcommingRequests = () => {
  const ApprovedRequests = useSelector((state) => {
    const Carer = state.user.Carer;
    if (Carer) {
      const request = Carer.requests.filter(
        (request) => request.status === "Approved"
      );
      return request;
    }
    return [];
  });
  return (
    <div className="upcommingRequests">
      <div className="calendar">
        <h2>Upcoming Requests</h2>
        <Calendar
          tileClassName={({ date, view }) => {
            if (
              ApprovedRequests.find(
                (x) =>
                  new Date(x.start) <= new Date(date) &&
                  new Date(x.end) >= new Date(date)
              )
            ) {
              return "highlight";
            }
          }}
        />
      </div>
    </div>
  );
};

export default UpcommingRequests;
