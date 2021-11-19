import React from "react";
import { useDispatch } from "react-redux";
import { addFilter, removeFilter } from "../../slicers/filterOptionSlice";

const Playing = () => {
  const dispatch = useDispatch();
  const playingTags = ["Outside", "Inside"];

  const handleFileter = (e) => {
    if (e.target.checked) {
      dispatch(addFilter({ key: "playing", value: e.target.value }));
    } else {
      dispatch(removeFilter({ key: "playing", value: e.target.value }));
    }
  };

  return (
    <section>
      <h2>Size</h2>
      <div>
        {playingTags.map((playing, i) => (
          <div key={i}>
            <label>
              <input
                type="checkbox"
                value={playing}
                name="playing"
                onClick={handleFileter}
              />
              {playing}
            </label>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Playing;
