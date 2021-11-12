import React from "react";
import "../../styles/owners/ownerHome.scss";
import sampleImg from "../../assets/sample.jpg";
import PetInfo from "./PetInfo";
import { Routes, Route } from "react-router-dom";
import Request from "./Request";

const OwnerHome = () => {
	return (
		<main className="owner">
			<div className="profileContainer">
				<div className="profile">
					<div className="profile2">
						<img src={sampleImg} alt="profile"></img>
						<h2>Yu Takaki</h2>
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
			<Routes>
				<Route exact path="/" element={<PetInfo />} />
				<Route exact path="/requests" element={<Request />} />
			</Routes>
		</main>
	);
};

export default OwnerHome;
