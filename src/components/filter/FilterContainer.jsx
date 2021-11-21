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
    <div className="filterContainer">
      <div className="filterContainer2">
        <div className="filterContainer3">
          <div className="filterBtns">
            <button className="seeAll" onClick={handleViewAll}>
              See All
            </button>
            <button className="reset" onClick={resetView}>
              Reset
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <button className="searchPets">Search Pets</button>
            <div className="tagContainer">
              <Type />
              <Size />
              <PetHealth />
              <Trained />
              <Playing />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FilterContainer;
