import React, { useState, useEffect } from "react";
import PetCard from "./PetCard";

// uncomment this out
// import axios from "axios";
// const { REACT_APP_SERVER_URL } = process.env;

const PetGrid = () => {
	// TEST DATA - TO BE REMOVED
	const [pets, setPets] = useState([
		{
			name: "Fido",
			description: "Doggy",
		},
		{
			name: "Ollie",
			description: "Otter",
		},
		{
			name: "Simba",
			description: "Lion",
		},
		{
			name: "Mizugocci",
			description: "Mizugocci",
		},
		{
			name: "Doraemon",
			description: "???",
		},
		{
			name: "Hachiko",
			description: "Dog",
		},
	]);

	useEffect(() => {
		(async () => {
			try {
				// const action = await axios.get(`${REACT_APP_SERVER_URL}/pet`, {
				// 	headers: {
				// 		"x-access-token": localStorage.getItem("token"),
				// 	},
				// });
				// console.log(action);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<div className="container" style={{ marginTop: "50px" }}>
			<div className="row">
				{pets.map((pet) => (
					<PetCard />
				))}
			</div>
		</div>
	);
};

export default PetGrid;
