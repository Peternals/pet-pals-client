import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPets,
  defaultFetchPetsByTag,
  fetchPetsByTag,
  resetFilter,
  clearFilteredPets,
} from "../../slicers/filterOptionSlice";
import FilterTagSection from "../FilterTagSection";

const FilterContainer = () => {
  const tags = useSelector((state) => state.filterOptions.tags);
  const interests = useSelector((state) => state.user.interests);
  const dispatch = useDispatch();
  const closeBtnRef = useRef();

  useEffect(() => {
    dispatch(defaultFetchPetsByTag(interests));
    return () => {
      dispatch(clearFilteredPets());
    };
  }, [interests, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    closeBtnRef.current.classList.remove("showFilter");
    if (tags.length === 0) {
      dispatch(fetchAllPets());
    } else {
      dispatch(fetchPetsByTag(tags));
    }
  };

  const handleViewAll = (e) => {
    e.preventDefault();
    dispatch(fetchAllPets());
    closeBtnRef.current.classList.remove("showFilter");
  };

  const resetView = () => {
    dispatch(resetFilter());
    dispatch(defaultFetchPetsByTag(interests));
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
            <FilterTagSection category="Type" />
            <FilterTagSection category="Size" />
            <FilterTagSection category="Pet health" />
            <FilterTagSection category="Trained" />
            <FilterTagSection category="Playing" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FilterContainer;
