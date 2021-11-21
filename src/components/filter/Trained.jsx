import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, removeFilter } from "../../slicers/filterOptionSlice";

const Trained = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.filterOptions.tags);
  const trainedTags = ["Litter trained", "Child friendly", "House trained"];

  const handleFilter = (e) => {
    if (e.target.checked) {
      dispatch(addFilter(e.target.value));
    } else {
      dispatch(removeFilter(e.target.value));
    }
  };

  useEffect(() => {
    if (!tags.length) {
      const checkboxes = document.getElementsByName("trained");
      [...checkboxes].forEach((e) => {
        e.checked = false;
      });
    }
  }, [tags]);

  return (
    <section>
      <h2>Trained</h2>
      <div>
        {trainedTags.map((trained, i) => (
          <div key={i}>
            <label>
              <input
                type="checkbox"
                value={trained}
                name="trained"
                onClick={handleFilter}
              />
              {trained}
            </label>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trained;
