import React from "react";
import { useDispatch } from "react-redux";
import { addFilter, removeFilter } from "../../slicers/filterOptionSlice";

const PetHealth = () => {
  const dispatch = useDispatch();
  const healthTags = ["Vaccinated", "Neutered", "Need supplements"];

  const handleFilter = (e) => {
    if (e.target.checked) {
      dispatch(addFilter({ key: "petHealth", value: e.target.value }));
    } else {
      dispatch(removeFilter({ key: "petHealth", value: e.target.value }));
    }
  };

  return (
    <section>
      <h2>Pet Health</h2>
      <div>
        {healthTags.map((health, i) => (
          <div key={i}>
            <label>
              <input
                type="checkbox"
                value={health}
                name="health"
                onClick={handleFilter}
              />
              {health}
            </label>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PetHealth;
