import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

const UpcommingRequests = () => {
  const [ApprovedRequests, setApprovedRequest] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const action = await axios.get(
          `${REACT_APP_SERVER_URL}/requests/upcoming`,
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        );
        setApprovedRequest(action.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="upcommingRequests">
      <div className="calendar">
        <h2>Upcoming Requests</h2>
        <Calendar
          tileClassName={({ date, view }) => {
            if (
              ApprovedRequests.find(
                (x) =>
                  new Date(x.request.start).setHours(0, 0, 0, 0) <=
                    new Date(date) &&
                  new Date(x.request.end).setHours(0, 0, 0, 0) >= new Date(date)
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
