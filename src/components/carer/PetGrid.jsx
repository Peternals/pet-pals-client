import { useSelector } from "react-redux";
import React from "react";
import PetCard from "./PetCard";

const PetGrid = () => {
  const allPets = useSelector((state) => state.filterOptions.allPets);
  const filteredPets = useSelector((state) => state.filterOptions.filteredPets);
  const isFiltered = useSelector((state) => state.filterOptions.isFiltered);
  const filterState = useSelector((state) => state.filterOptions.state);
  return (
    <div className="container">
      <div className="row">
        <h1>{filterState}</h1>
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
