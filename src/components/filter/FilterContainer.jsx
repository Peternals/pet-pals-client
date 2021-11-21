import React, { useEffect, useRef } from "react";
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
  const closeBtnRef = useRef();

  useEffect(() => {
    dispatch(fetchPetsByTag(interests));
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    closeBtnRef.current.classList.remove("showFilter");
    dispatch(fetchPetsByTag(tags));
  };

  const handleViewAll = (e) => {
    e.preventDefault();
    dispatch(fetchAllPets());
    closeBtnRef.current.classList.remove("showFilter");
  };

  const resetView = () => {
    dispatch(resetFilter());
    closeBtnRef.current.classList.remove("showFilter");
  };

  const closeFilter = () => {
    closeBtnRef.current.classList.remove("showFilter");
  };
  const openFilter = () => {
    closeBtnRef.current.classList.add("showFilter");
  };

  return (
    <div className="filterContainer">
      <i className="fa fa-search" onClick={openFilter}></i>
      <div className="filterContainer2">
        <div ref={closeBtnRef} className="filterContainer3">
          <div className="filterBtns">
            <i onClick={closeFilter} className="fa fa-close"></i>
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
