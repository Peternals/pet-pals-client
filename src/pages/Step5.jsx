import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp, changeSuccessStatus } from "../slicers/userSlice";

export default function Step5() {
  const dispatch = useDispatch();
  const signUpInfo = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitAction = await dispatch(
      signUp({
        username: signUpInfo.username,
        email: signUpInfo.email,
        password: signUpInfo.password,
        description: signUpInfo.description,
        profile_picture: signUpInfo.profile_picture,
        type: signUpInfo.type,
      })
    );
    dispatch(changeSuccessStatus());
    if (submitAction.payload.user) {
      navigate("/complete");
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} style={{ marginTop: 200 }}>
          <h2>Questionnaire</h2>
          <input type="text" placeholder="Question" />
          <button>Submit</button>
        </form>
      </div>
      <Link to="/step4">Back</Link>
    </>
  );
}
