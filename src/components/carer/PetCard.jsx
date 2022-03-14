import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Tags from "../Tag";
const { REACT_APP_SERVER_URL } = process.env;

const PetCard = ({ pet }) => {
  return (
    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 cardContainer">
      <div className="card-sl">
        <div className="card-image">
          <LazyLoadImage
              effect="blur"
              src={`${REACT_APP_SERVER_URL}/pic/${pet.pet_pictures[0]}`}
              alt="pet"
            />
        </div>
        <div className="card-heading">
          <h4>{pet.name}</h4>
          <p>{pet.description}</p>
          <div className="tags card-text tagOverride">
            <Tags tags={pet.tag} />
          </div>
        </div>
        <Link to={`/carer/pet/${pet._id}`} state={{ pet: pet }}>
          <button className="card-button"> Request</button>
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
