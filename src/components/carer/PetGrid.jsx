import { useSelector } from "react-redux";
import React from "react";
import PetCard from "./PetCard";

const PetGrid = () => {
  const allPets = useSelector((state) => state.pet.initialPets);
  const filteredPets = useSelector((state) => state.pet.filteredPets);
  const isFiltered = useSelector((state) => state.pet.isFiltered);
  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="row">
        {!isFiltered ? (
          allPets.map((pet, i) => <PetCard pet={pet} key={i} />)
        ) : isFiltered && filteredPets.length ? (
          filteredPets.map((pet, i) => <PetCard pet={pet} key={i} />)
        ) : (
          <h1>Not Found</h1>
        )}
      </div>
    </div>
  );
};

export default PetGrid;
