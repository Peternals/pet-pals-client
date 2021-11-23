import React, { useState } from "react";
import Select from "react-select";
import { getTagClass } from "../utils/tag-utils";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, removeFilter } from "../../slicers/filterOptionSlice";

const FilterTagSection = () => {
  // Needs the options.
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  // Get all the possible tags
  // State variable for selected tags
  // Selected tags should be stored in the store, see filter/PetHealth for examples
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.filterOptions.tags);
  const healthTags = ["Vaccinated", "Neutered", "Need supplements"];
  const [selectedTags, setSelectedTags] = useState([]);

  const updateSelectedTags = (tag, action) => {
    let tags;
    if (action === "create") {
      tags = [...selectedTags, tag];
    } else if (action === "delete") {
      tags = selectedTags.filter((tg) => tg !== tag);
    }
    setSelectedTags(tags);
  };

  const handleFilter = (e) => {
    if (e.target.checked) {
      dispatch(addFilter(e.target.value)); // TODO: Replace this with adding and removing tags
    } else {
      dispatch(removeFilter(e.target.value));
    }
  };
  const deleteTag = (e) => {
    // Remove the tag from the state

    // Update the store
    dispatch(removeFilter(e.target.value));
  };

  const createTag = (tag) => {
    dispatch(addFilter(e.target.value));
    updateSelectedTags(tag);
    return (
      <div>
        <span className={getTagClass(tag.color)} key={i}>
          {tag.name}
        </span>
        <button class="tag is-delete" onClick={deleteTag}></button>
      </div>
    );
  };

  return (
    <div className="field has-addons">
      <div className="control">
        <Select options={options} />
      </div>
      <div className="control">
        <button id="add-tag" className="button is-link"></button>
      </div>
      <div id="tag-field" className="field is-grouped is-grouped-multiline">
        <div className="control">
          <div className="tags has-addons"></div>
        </div>
      </div>
    </div>
  );
};

export default FilterTagSection;
