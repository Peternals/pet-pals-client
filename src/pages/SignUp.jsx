import React from "react";

export default function SignUp() {
  return (
    <>
      <div className="sign-up-container">
        <form>
          <h1>Sign Up</h1>
          <label>Email: </label>
          <input type="text" />
          <label>Password: </label>
          <input type="password" />
          <button>Continue</button>
        </form>
      </div>
      <div>Have an account?</div>
    </>
  );
}
