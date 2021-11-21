import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, removeFilter } from "../../slicers/filterOptionSlice";

const Type = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.filterOptions.tags);
  const typeTags = [
    "Dog",
    "Cat",
    "Otter",
    "Snake",
    "Rabbit",
    "Hamster",
    "Marmot",
    "Parakeet",
    "Hedgehog",
    "Ferret",
    "Iguana",
    "Mini pig",
    "Turtle",
    "Fish",
  ];

  const handleFilter = (e) => {
    if (e.target.checked) {
      dispatch(addFilter(e.target.value));
    } else {
      dispatch(removeFilter(e.target.value));
    }
  };

  useEffect(() => {
    if (!tags.length) {
      const checkboxes = document.getElementsByName("type");
      [...checkboxes].forEach((e) => {
        e.checked = false;
      });
    }
  }, [tags]);

  return (
    <section>
      <h2>Type</h2>
      <div>
        {typeTags.map((type, i) => (
          <div key={i}>
            <label>
              <input
                type="checkbox"
                value={type}
                name="type"
                onClick={handleFilter}
              />
              {type}
            </label>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Type;
