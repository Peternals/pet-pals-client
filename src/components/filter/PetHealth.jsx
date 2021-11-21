import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, removeFilter } from "../../slicers/filterOptionSlice";

const PetHealth = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.filterOptions.tags);
  const healthTags = ["Vaccinated", "Neutered", "Need supplements"];

  const handleFilter = (e) => {
    if (e.target.checked) {
      dispatch(addFilter(e.target.value));
    } else {
      dispatch(removeFilter(e.target.value));
    }
  };

  useEffect(() => {
    if (!tags.length) {
      const checkboxes = document.getElementsByName("health");
      [...checkboxes].forEach((e) => {
        e.checked = false;
      });
    }
  }, [tags]);

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
