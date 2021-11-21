import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PetHealth from "./PetHealth";
import Playing from "./Playing";
import Size from "./Size";
import Trained from "./Trained";
import Type from "./Type";
import {
  fetchAllPets,
  fetchPetsByTag,
  resetFilter,
} from "../../slicers/filterOptionSlice";

const FilterContainer = () => {
  const tags = useSelector((state) => state.filterOptions.tags);
  const interests = useSelector((state) => state.user.interests);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPetsByTag(interests));
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchPetsByTag(tags));
  };

  const handleViewAll = (e) => {
    e.preventDefault();
    dispatch(fetchAllPets());
  };

  const resetView = () => {
    dispatch(resetFilter());
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
        <button onClick={resetView}>Reset</button>
      </div>
    </div>
  );
};

export default FilterContainer;
