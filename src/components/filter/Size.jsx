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
      <h2>Size</h2>
      <div>
        {sizeTags.map((size, i) => (
          <div key={i}>
            <label>
              <input
                type="checkbox"
                value={size}
                name="size"
                onClick={handleFilter}
              />
              {size}
            </label>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Size;
