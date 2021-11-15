import React, { useEffect, useState } from "react";
import sampleDog from "../../assets/sampleDog2.jpeg";

import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { useSelector } from "react-redux";
import PetSchedule from "./PetSchedule";

const { REACT_APP_SERVER_URL } = process.env;

const PetInfo = () => {
	const user = useSelector((state) => state.user);
	const [ownersPet, setOwnersPet] = useState({});

	useEffect(() => {
		(async () => {
			try {
				const pet = await axios.get(`${REACT_APP_SERVER_URL}/pet/owner`, {
					headers: {
						"x-access-token": localStorage.getItem("token"),
					},
				});
				setOwnersPet(pet.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [user]);

	return (
		<section className="homeSection">
			<figure className="petPic">
				<img src={sampleDog} alt="dog"></img>
				{/* <div className="petName">
					<h1>Max</h1>
				</div> */}
			</figure>
			<div className="petSchedule">
				<section className="petInfo">
					<h2>This is {ownersPet.name}</h2>
					<p className="summaryTitle">Bio:</p>
					<p className="summary">{ownersPet.description}</p>
				</section>
				<PetSchedule />
			</div>
		</section>
	);
};

export default PetInfo;
