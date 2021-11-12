import React from "react";
import DatePicker from "../components/DatePicker"
import PetCard from "../components/carer/PetCard"
import { Link } from "react-router-dom"

// Component that represents the pet view for the carer
// Has the more detailed view of the pet
// Has a date picker for choosing the dates for requested
// Has the button to direct to the questionnaire page
const Pet = () => {
	return (
		<main>
			<div className="container-fluid p-3 align-items-center">
            {/** TODO: Replace PetCard with the actual PetInfo component */}
                <section className="row p-3">
                    <PetCard />
                </section>
                <hr />
                <section  className="row p-3">
                    <DatePicker />
                </section>
                <hr />
                <section  className="row p-3">
                    <Link to="/questionnaire">
                        <button className="card-button"> Go to Questionnaire</button>
                    </Link> 
                </section>
			</div>
		</main>
	);
};

export default Pet;