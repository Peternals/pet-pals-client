import React, { useState } from "react";
import RequestCell from "./RequestCell";
import Calendar from "react-calendar";

const PetSchedule = () => {
	const [scheduleState, setScheduleState] = useState("calendar");
	const mark = [
		{
			start: "11-11-2021",
			end: "12-16-2021",
		},
	];
	const onActiveStartDateChange = (e) => {
		console.log(e);
	};
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
							mark.find(
								(x) =>
									new Date(x.start) <= new Date(date) &&
									new Date(x.end) >= new Date(date)
							)
						) {
							return "highlight";
						}
					}}
				/>
			) : (
				<ul>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
						<RequestCell />
					))}
				</ul>
			)}
		</section>
	);
};

export default PetSchedule;
