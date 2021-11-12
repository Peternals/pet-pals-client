import React, { createRef } from "react";
import { useDispatch } from "react-redux";
import { validation } from "../slicers/userSlice";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = createRef();
  const password = createRef();

  const handleContinue = async (e) => {
    e.preventDefault();
    const firstInputAction = await dispatch(
      validation({
        email: email.current.value,
        password: password.current.value,
      })
    );
    if (firstInputAction.payload === "Please Continue") {
      navigate("/step2");
    }
  };

  return (
    <>
      <div className="sign-up-container">
        <form onSubmit={handleContinue}>
          <h1>Sign Up</h1>
          <input type="text" placeholder="Email" ref={email} />
          <input type="password" placeholder="Password" ref={password} />
          <button>Continue</button>
        </form>
      </div>
      <Link to="/">Have an account?</Link>
    </>
  );
}
