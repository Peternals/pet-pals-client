import React from "react";
import schnauzer from "../../assets/images/schnauzer.jpg";
import { Link } from "react-router-dom";

// What are the necessary props? //Name, Photo, Description
const PetCard = (props) => {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
      <div className="card-sl">
        <div className="card-image">
          <img src={schnauzer} alt="By Sebastian Coman Travel from Pexels" />
        </div>
        <div className="card-heading">{props.pet.name}</div>
        <div className="card-text">
          {props.pet.name} is a beautiful {props.pet.type}
        </div>
        <Link to="/carer/pet/hiashfskfbakshfs" state={{ pet: props.pet }}>
          <button className="card-button"> Request</button>
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
