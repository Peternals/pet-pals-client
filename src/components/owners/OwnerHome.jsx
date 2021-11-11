import React from "react";
import "../../styles/owners/ownerHome.scss";
import sampleImg from "../../assets/sample.jpg";
import sampleDog from "../../assets/sampleDog2.jpeg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const OwnerHome = () => {
	return (
		<main className="owner">
			<div className="profileContainer">
				<div className="profile">
					<div className="profile2">
						<img src={sampleImg} alt="profile"></img>
						<h1>Yu Takaki</h1>
						<div className="profileInfo">
							<p className="summaryTitle">Bio:</p>
							<p className="summary">
								Sint mollit magna aliqua adipisicing ex consequat sit
								adipisicing in. Sunt cillum do est est et tempor et eiusmod enim
								aute incididunt veniam sit. Deserunt anim commodo laborum dolor.
								Occaecat consequat laboris laboris aliquip sit tempor et ex
								fugiat commodo aliqua consectetur.
							</p>
							<p className="summaryTitle">Email:</p>
							<p className="summary">user@gmail.com</p>
						</div>
					</div>
				</div>
			</div>
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
							in. Sunt cillum do est est et tempor et eiusmod enim aute
							incididunt veniam sit. Deserunt anim commodo laborum dolor.
							Occaecat consequat laboris laboris aliquip sit tempor et ex fugiat
							commodo aliqua consectetur.
						</p>
					</section>
				</div>
			</section>
		</main>
	);
};

export default OwnerHome;
