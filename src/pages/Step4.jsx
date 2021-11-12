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
        <form onSubmit={handleNext}>
          <input type="text" placeholder="PetName" ref={petname} />
          <select name="pet-type" />
          <input type="text" placeholder="Bio" ref={description} />
          <button>Next</button>
        </form>
      </div>
      <Link to="/step2">Back</Link>
    </>
  );
}
