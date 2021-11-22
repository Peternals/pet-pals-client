import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, removeFilter } from "../../slicers/filterOptionSlice";

const Playing = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.filterOptions.tags);
  const playingTags = ["Outside", "Inside"];

  const handleFilter = (e) => {
    if (e.target.checked) {
      dispatch(addFilter(e.target.value));
    } else {
      dispatch(removeFilter(e.target.value));
    }
  };

  useEffect(() => {
    if (!tags.length) {
      const checkboxes = document.getElementsByName("playing");
      [...checkboxes].forEach((e) => {
        e.checked = false;
      });
    }
  }, [tags]);

  return (
    <section>
      <h4>Where to Play?</h4>
      <ul>
        {playingTags.map((playing, i) => (
          <li key={i}>
            <input
              type="checkbox"
              value={playing}
              name="playing"
              id={playing}
              onClick={handleFilter}
            />
            <label htmlFor={playing}>{playing}</label>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Playing;
