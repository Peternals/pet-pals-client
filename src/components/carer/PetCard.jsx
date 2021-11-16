import React from "react";
import schnauzer from "../../assets/images/schnauzer.jpg";
import { Link } from "react-router-dom";

// What are the necessary props? //Name, Photo, Description
const PetCard = () => {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
      <div className="card-sl">
        <div className="card-image">
          <img src={schnauzer} alt="By Sebastian Coman Travel from Pexels" />
        </div>
        <div className="card-heading">Max</div>
        <div className="card-text">
          Max is a beautiful two year old schnauzer
        </div>
        <Link to="/carer/pet/hiashfskfbakshfs">
          <button className="card-button"> Request</button>
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
