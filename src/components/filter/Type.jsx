import React from "react";
import { useDispatch } from "react-redux";
import { addFilter, removeFilter } from "../../slicers/filterOptionSlice";

const Type = () => {
  const dispatch = useDispatch();
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
      dispatch(addFilter({ key: "type", value: e.target.value }));
    } else {
      dispatch(removeFilter({ key: "type", value: e.target.value }));
    }
  };

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
