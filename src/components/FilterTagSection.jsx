import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, removeFilter } from "../slicers/filterOptionSlice";
import DeletableTags from "./DeletableTags";
import { getAllTags, mapOptionsFromTags } from "../slicers/tagSlice";

const FilterTagSection = ({ category }) => {
  const allTags = useSelector((state) =>
    state.tag.allTags.filter((tag) => tag.category === category)
  );
  const options = useSelector((state) => {
    return state.tag.options.filter((option) => {
      return allTags.some((tag) => tag.value === option.value);
    });
  });
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState([]);

  // Retrieve tags by provided category
  useEffect(() => {
    (async () => {
      try {
        await dispatch(getAllTags());
        await dispatch(mapOptionsFromTags());
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  const updateSelectedTags = (tag, action) => {
    let tags;
    if (action === "create") {
      tags = [...selectedTags, tag];
    } else if (action === "delete") {
      tags = selectedTags.filter((tg) => tg.value !== tag.value);
    }
    setSelectedTags(tags);
  };

  // Annoying nature of select is that we must map everytime.
  const findTagFromOption = (option) => {
    return allTags.find((tag) => tag.value === option.value);
  };

  const deleteTag = (e) => {
    // Get the tag by name
    const option = options.find((element) => element.value === e.target.name);
    const tagToDelete = findTagFromOption(option);
    // Remove the tag from the state
    updateSelectedTags(tagToDelete, "delete");
    // // Update the store
    dispatch(removeFilter(tagToDelete.value));
  };

  const createTag = (tag) => {
    dispatch(addFilter(tag.value));
    updateSelectedTags(tag, "create");
  };

  const handleUpdate = (option) => {
    const tag = findTagFromOption(option);
    createTag(tag);
  };

  return (
    <div className="box">
      <Select options={options} onChange={handleUpdate} />
      <DeletableTags tags={selectedTags} deleteTag={deleteTag} />
    </div>
  );
};

export default FilterTagSection;
