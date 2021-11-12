import React, { createRef } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../slicers/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { getSecondInfo } from "../slicers/userSlice";

export default function Step3Carer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = createRef();
  const description = createRef();
  const profile_picture = createRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      getSecondInfo({
        username: username.current.value,
        description: description.current.value,
        profile_picture: profile_picture.current.value,
      })
    );
    // const secondInputAction = await dispatch(
    //   signUp({
    //     email: email.current.value,
    //     password: password.current.value,
    //   })
    // );
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Picture" ref={profile_picture} />
          <input type="text" placeholder="Full Name" ref={username} />
          <input type="text" placeholder="Bio" ref={description} />
          <button>Submit</button>
        </form>
      </div>
      <Link to="/step2">Back</Link>
    </>
  );
}
