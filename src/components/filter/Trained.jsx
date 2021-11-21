import React from "react";
import { useDispatch } from "react-redux";
import { addFilter, removeFilter } from "../../slicers/filterOptionSlice";

const Trained = () => {
  const dispatch = useDispatch();
  const trainedTags = ["Litter trained", "Child friendly", "House trained"];

  const handleFilter = (e) => {
    if (e.target.checked) {
      dispatch(addFilter(e.target.value));
    } else {
      dispatch(removeFilter(e.target.value));
    }
  };

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
