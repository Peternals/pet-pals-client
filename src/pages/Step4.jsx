import React, { createRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Step4() {
  const navigate = useNavigate();

  const handleNext = (e) => {
    navigate("/step5");
  };

  return (
    <>
      <div>
        <form onSubmit={handleNext} style={{ marginTop: 200 }}>
          <input type="text" placeholder="PetName" />
          <select name="pet-type">
            <option value="dog">Select pet type</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="otter">Otter</option>
            <option value="snake">Snake</option>
          </select>
          <input type="text" placeholder="Bio" />
          <button>Next</button>
        </form>
      </div>
      <Link to="/step3/owner">Back</Link>
    </>
  );
}
