import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, removeFilter } from "../../slicers/filterOptionSlice";

const Size = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.filterOptions.tags);
  const sizeTags = ["Small", "Medium", "Large", "Giant"];

  const handleFilter = (e) => {
    if (e.target.checked) {
      dispatch(addFilter(e.target.value));
    } else {
      dispatch(removeFilter(e.target.value));
    }
  };

  useEffect(() => {
    if (!tags.length) {
      const checkboxes = document.getElementsByName("size");
      [...checkboxes].forEach((e) => {
        e.checked = false;
      });
    }
  }, [tags]);

  return (
    <section>
      <h4>Size</h4>
      <ul>
        {sizeTags.map((size, i) => (
          <li key={i}>
            <input
              type="checkbox"
              value={size}
              name="size"
              id={size}
              onClick={handleFilter}
            />
            <label htmlFor={size}>{size}</label>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Size;
