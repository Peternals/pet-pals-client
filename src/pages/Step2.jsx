import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getType } from "../slicers/userSlice";

export default function Step2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTypeUser = (e) => {
    dispatch(getType(e.target.value));
    const userType =
      e.target.value === "Owner" ? "/step3/owner" : "/step3/carer";
    navigate(userType);
  };

  return (
    <>
      <div className="sign-up-container" style={{ marginTop: 200 }}>
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
