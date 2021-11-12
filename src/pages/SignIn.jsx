import React from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <>
      <div className="sign-in-container" style={{ marginTop: 200 }}>
        <form>
          <h1>Sign In</h1>
          <div>Hi there! Nice to see you again.</div>
          <label>Email: </label>
          <input type="text" />
          <label>Password: </label>
          <input type="password" />
          <button>Sign In</button>
        </form>
      </div>
      <div className="sign-up-navigator">
        <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
