import React, { useEffect, useState } from "react";
import DatePicker from "../components/DatePicker";
import { Link, useParams } from "react-router-dom";
import "../styles/carer/pet.scss";
import samplePet from "../assets/sampleDog2.jpeg";

// Component that represents the pet view for the carer
// Has the more detailed view of the pet
// Has a date picker for choosing the dates for requested
// Has the button to direct to the questionnaire page
const Pet = () => {
	// const [petInfo, setPetInfo] = useState({});
	// const { id } = useParams();
	useEffect(() => {
		(async () => {
			try {
				// just setting the info of the pet
				// const action = await axios.get()
				// setPetInfo(action.data)
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	return (
		<main className="petMain">
			<div className="container-fluid p-3 align-items-center">
				{/** TODO: Replace PetCard with the actual PetInfo component */}
				<section className="petOptions">
					<DatePicker />
					<Link to="/questionnaire">
						<button className="card-button">Book Date</button>
					</Link>
				</section>
				<section className="petFlexBox">
					<figure>
						<div className="mainPic">
							<img src={samplePet} alt="pet" />
						</div>
					</figure>

					<div className="petBio">
						<h1>This is Max</h1>
						<h3>Bio</h3>
						<p>
							Dolor ex incididunt dolor qui ad. Veniam amet nisi dolor velit
							nulla aliqua ad fugiat pariatur dolor ex. Ad proident commodo
							dolore ut ut. Deserunt in sint ea voluptate eu ad tempor mollit
							enim. Dolor ex incididunt dolor qui ad. Veniam amet nisi dolor
							velit nulla aliqua ad fugiat pariatur dolor ex. Ad proident
							commodo dolore ut ut. Deserunt in sint ea voluptate eu ad tempor
							mollit enim. Dolor ex incididunt dolor qui ad. Veniam amet nisi
							dolor velit nulla aliqua ad fugiat pariatur dolor ex. Ad proident
							commodo dolore ut ut. Deserunt in sint ea voluptate eu ad tempor
							mollit enim.Dolor ex incididunt dolor qui ad. Veniam amet nisi
							dolor velit nulla aliqua ad fugiat pariatur dolor ex. Ad proident
						</p>
					</div>
				</section>
			</div>
		</main>
	);
};

export default Pet;
