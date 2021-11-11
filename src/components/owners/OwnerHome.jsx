import React from "react";
import "../../styles/owners/ownerHome.scss";
import sampleImg from "../../assets/sample.jpg";
import sampleDog from "../../assets/sampleDog2.jpeg";

const OwnerHome = () => {
	return (
		<main className="owner">
			<div className="profileContainer">
				<div className="profile">
					<img src={sampleImg} alt="profile"></img>
				</div>
			</div>
			<section className="homeSection">
				<figure>
					<img src={sampleDog} alt="dog"></img>
				</figure>
				<div className="calendar"></div>
			</section>
		</main>
	);
};

export default OwnerHome;
