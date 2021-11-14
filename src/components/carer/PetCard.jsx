import React from "react";
import schnauzer from "../../assets/images/schnauzer.jpg";
import { Link } from "react-router-dom";
const { REACT_APP_SERVER_URL } = process.env;

const PetCard = ({ pet }) => {
	return (
		<div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
			<div className="card-sl">
				<div className="card-image">
					{pet.pet_pictures ? 
					<img src={`${REACT_APP_SERVER_URL}/pic/${pet.pet_pictures}`} alt="pet pic"/> 
					: <img src={schnauzer} alt="By Sebastian Coman Travel from Pexels" />}
				</div>
				<div className="card-heading">{pet.name}</div>
				<div className="card-text">
					{pet.description}
				</div>
				<Link to={`/carer/pet/${pet._id}`}>
					<button className="card-button"> Request</button>
				</Link>
			</div>
		</div>
	);
};

export default PetCard;
