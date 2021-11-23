import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { addFilter, removeFilter } from "../slicers/filterOptionSlice";
import DeletableTags from "./DeletableTags";
import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

const FilterTagSection = ({ category }) => {
  const [allTags, setAllTags] = useState([]);
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState([]);

  // Retrieve tags by provided category
  useEffect(() => {
    (async () => {
      try {
        const action = await axios.get(
          `${REACT_APP_SERVER_URL}/tag/category/${category}`,
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        );
        setAllTags(action.data);
        setOptions(
          allTags.map((tag) => {
            return {
              value: tag.value,
              label: tag.value,
            };
          })
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, [category, allTags]);

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
      <hr />
      <DeletableTags tags={selectedTags} deleteTag={deleteTag} />
    </div>
  );
};

export default FilterTagSection;
