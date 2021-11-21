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
      <h2>Where to Play?</h2>
      <div>
        {playingTags.map((playing, i) => (
          <div key={i}>
            <label>
              <input
                type="checkbox"
                value={playing}
                name="playing"
                onClick={handleFilter}
              />
              {playing}
            </label>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Playing;
