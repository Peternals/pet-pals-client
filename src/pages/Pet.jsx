import React from "react";
import DatePicker from "../components/DatePicker"
import PetCard from "../components/carer/PetCard"
import { Link } from "react-router-dom"

const Pet = () => {
	return (
		<main>
			<div>
                <PetCard />
                <DatePicker />
                <Link to="/questionnaire">
                    <button className="card-button"> Go to Questionnaire</button>
                </Link> 
			</div>
		</main>
	);
};

export default Pet;