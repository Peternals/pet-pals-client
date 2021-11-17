import React from "react";
import moment from "moment";
const { REACT_APP_SERVER_URL } = process.env;
const RequestCell = ({ sched }) => {
  return (
    <li className="request">
      <figure>
        <img
          alt="img"
          src={`${REACT_APP_SERVER_URL}/pic/${sched.profile_picture}`}
        />
      </figure>

      <div>
        <h4>{sched.fullname}</h4>
        <p>
          <span>from:</span> {moment(sched.start).format("MMM-DD-YY")}
        </p>
        <p>
          <span>to:</span> {moment(sched.end).format("MMM-DD-YY")}
        </p>
      </div>
    </li>
  );
};

export default RequestCell;
