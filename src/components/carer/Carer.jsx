import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PetGrid from "./PetGrid";
import "../../styles/carer/carer.scss";
import {
  fetchAllPets,
  fetchPetsByType,
  resetFilter,
} from "../../slicers/petSlice";

// Grid of cards for web view, column for phone view
const Carer = () => {
  const [type, setType] = useState("");
  // const allPets = useSelector((state) => state.pet.initialPets);
  const dispatch = useDispatch();
  const types = ["Dog", "Cat", "Otter", "Snake"];
  const typeRef = useRef();

  useEffect(() => {
    dispatch(fetchAllPets());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (e) => {
    e.preventDefault();
    dispatch(fetchPetsByType(type));
  };

  const resetView = () => {
    dispatch(resetFilter());
    typeRef.current.value = "";
  };

  return (
    <main className="carerMain">
      <section>
        <form onSubmit={submit}>
          <select
            name="type"
            defaultValue=""
            ref={typeRef}
            onChange={(e) => setType(e.target.value)}>
            <option value="">Select pet type</option>
            {types.map((type, i) => (
              <option key={i} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button>Search Pets</button>
        </form>
        <button onClick={resetView}>Reset</button>
      </section>
      <PetGrid />
    </main>
  );
};

export default Carer;
