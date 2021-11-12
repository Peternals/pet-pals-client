import React from "react";
import PetGrid from "./PetGrid";
import "../../styles/carer/carer.scss";

// Grid of cards for web view, column for phone view
const Carer = () => {
	return (
		<main className="carerMain">
			<div className="alert alert-primary" role="alert">
				A simple primary alert—check it out!
			</div>
			<PetGrid />
		</main>
	);
};

export default Carer;
