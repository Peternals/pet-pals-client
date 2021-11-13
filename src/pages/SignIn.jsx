import React, { createRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../slicers/userSlice";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = createRef();
  const password = createRef();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const signInAction = await dispatch(
      signIn({
        email: email.current.value,
        password: password.current.value,
      })
    );
    const userType =
      signInAction.payload.user.type === "Owner" ? "/owner" : "/carer/";
    if (signInAction.payload.user) {
      navigate(userType);
    }
  };

  return (
    <>
      <div className="sign-in-container" style={{ marginTop: 200 }}>
        <form onSubmit={handleSignIn}>
          <h1>Sign In</h1>
          <input type="text" placeholder="Email" ref={email} />
          <input type="password" placeholder="Password" ref={password} />
          <button>Sign In</button>
        </form>
      </div>
      <div className="sign-up-navigator">
        <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
