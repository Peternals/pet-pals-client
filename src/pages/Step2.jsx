import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getType } from "../slicers/userSlice";

export default function Step2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTypeUser = (e) => {
    dispatch(getType(e.target.value));
    navigate("/step3");
  };

  return (
    <>
      <div className="sign-up-container">
        <h2>What are you?</h2>
        <button type="button" value="Owner" onClick={handleTypeUser}>
          Owner
        </button>
        <button type="button" value="Carer" onClick={handleTypeUser}>
          Carer
        </button>
      </div>
      <Link to="/signup">Back</Link>
    </>
  );
}
