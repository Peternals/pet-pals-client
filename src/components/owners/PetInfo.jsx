import React from "react";
import sampleDog from "../../assets/sampleDog2.jpeg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const PetInfo = () => {
	return (
		<section className="homeSection">
			<figure>
				<img src={sampleDog} alt="dog"></img>
			</figure>
			<div className="petSchedule">
				<section className="calendar">
					<Calendar />
				</section>
				<section className="dogInfo">
					<h1>This is Max</h1>
					<p className="summaryTitle">Bio:</p>
					<p className="summary">
						Sint mollit magna aliqua adipisicing ex consequat sit adipisicing
						in. Sunt cillum do est est et tempor et eiusmod enim aute incididunt
						veniam sit. Deserunt anim commodo laborum dolor. Occaecat consequat
						laboris laboris aliquip sit tempor et ex fugiat commodo aliqua
						consectetur.
					</p>
				</section>
			</div>
		</section>
	);
};

export default PetInfo;
