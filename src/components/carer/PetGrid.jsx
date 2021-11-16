import { useSelector } from "react-redux";
import React from "react";
import PetCard from "./PetCard";

const PetGrid = () => {
  const allPets = useSelector((state) => state.pet.initialPets);
  const filteredPets = useSelector((state) => state.pet.filteredPets);
  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="row">
        {filteredPets.length === 0
          ? allPets.map((pet, i) => <PetCard pet={pet} key={i} />)
          : filteredPets.map((pet, i) => <PetCard pet={pet} key={i} />)}
      </div>
    </div>
  );
};

export default PetGrid;
