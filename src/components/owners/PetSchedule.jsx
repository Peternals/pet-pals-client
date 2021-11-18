import React, { useState, useEffect } from "react";
import RequestCell from "./RequestCell";
import Calendar from "react-calendar";
import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

const PetSchedule = () => {
  const [scheduleState, setScheduleState] = useState("calendar");
  const [schedule, setSchedule] = useState([]);
  const onActiveStartDateChange = (e) => {
    console.log(e);
  };

  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(
          `${REACT_APP_SERVER_URL}/requests/Approved`,
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        );
        setSchedule(
          request.data.map((req) => {
            return {
              ...req.request,
              fullname: req.username,
              profile_picture: req.profile_picture,
            };
          })
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <section className="calendar">
      <div className="scheduleOption">
        <i
          className={`fa fa-calendar ${
            scheduleState === "calendar" && "activePetOptionSchedule"
          }`}
          onClick={() => setScheduleState("calendar")}></i>
        <i
          className={`fa fa-list-ul ${
            scheduleState !== "calendar" && "activePetOptionSchedule"
          }`}
          onClick={() => setScheduleState("list")}></i>
        <p>Pet schedule</p>
      </div>

      {scheduleState === "calendar" ? (
        <Calendar
          onChange={onActiveStartDateChange}
          tileClassName={({ date, view }) => {
            if (
              schedule.find(
                (x) =>
                  new Date(x.start).setHours(0, 0, 0, 0) <= new Date(date) &&
                  new Date(x.end).setHours(0, 0, 0, 0) >= new Date(date)
              )
            ) {
              return "highlight";
            }
          }}
        />
      ) : (
        <ul>
          {schedule.map((sched) => (
            <RequestCell sched={sched} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default PetSchedule;
