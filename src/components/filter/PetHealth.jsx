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
      <h4>Pet Health</h4>
      <ul>
        {healthTags.map((health, i) => (
          <li key={i}>
            <input
              type="checkbox"
              value={health}
              name="health"
              id={health}
              onClick={handleFilter}
            />
            <label htmlFor={health}>{health}</label>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PetHealth;
