import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PetHealth from "./PetHealth";
import Playing from "./Playing";
import Size from "./Size";
import Trained from "./Trained";
import Type from "./Type";
import { fetchAllPets, fetchPetsByTag } from "../../slicers/filterOptionSlice";

const FilterContainer = () => {
  const tags = useSelector((state) => state.filterOptions.tags);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchPetsByTag(tags));
  };

  const handleViewAll = (e) => {
    e.preventDefault();
    dispatch(fetchAllPets());
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Type />
        <Size />
        <PetHealth />
        <Trained />
        <Playing />
        <button>Search Pets</button>
      </form>
      <button onClick={handleViewAll}>See All</button>
      <div>
        <button>Reset</button>
      </div>
    </div>
  );
};

export default FilterContainer;
