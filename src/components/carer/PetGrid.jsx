import React from "react";
import PetCard from "./PetCard";

const PetGrid = ({ pets }) => {
  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="row">
        {pets.map((pet, i) => (
          <PetCard pet={pet} key={i} />
        ))}
      </div>
    </div>
  );
};

export default PetGrid;
