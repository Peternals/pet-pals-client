import React from "react";
import "../../styles/owners/ownerHome.scss";
import sampleImg from "../../assets/sample.jpg";
import PetInfo from "./PetInfo";
import { Routes, Route } from "react-router-dom";
import Request from "./Request";
import { useSelector } from "react-redux";

const OwnerHome = () => {
	const user = useSelector((state) => state.user);

	return (
		<main className="owner">
			<div className="profileContainer">
				<div className="profile">
					<div className="profile2">
						<img src={sampleImg} alt="profile"></img>
						<h2>{user.username}</h2>
						<div className="profileInfo">
							<p className="summaryTitle">Bio:</p>
							<p className="summary">{user.description}</p>
							<p className="summaryTitle">Email:</p>
							<p className="summary">{user.email}</p>
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
