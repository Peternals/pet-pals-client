import React from "react";
import { useDispatch } from "react-redux";
import { addFilter, removeFilter } from "../../slicers/filterOptionSlice";

const Size = () => {
  const dispatch = useDispatch();
  const sizeTags = ["Small", "Medium", "Large", "Giant"];

  const handleFilter = (e) => {
    if (e.target.checked) {
      dispatch(addFilter({ key: "size", value: e.target.value }));
    } else {
      dispatch(removeFilter({ key: "size", value: e.target.value }));
    }
  };

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
