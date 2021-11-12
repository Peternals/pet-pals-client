import React, { createRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getUserName,
  getDescription,
  getProfilePicture,
} from "../slicers/userSlice";

export default function Step3Owner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = createRef();
  const description = createRef();
  const profile_picture = createRef();

  const handleNext = async (e) => {
    e.preventDefault();
    const usernameVal = username.current.value;
    const descriptionVal = description.current.value;
    const profile_pictureVal = profile_picture.current.value;
    await dispatch(getUserName({ username: usernameVal }));
    await dispatch(getDescription({ description: descriptionVal }));
    await dispatch(getProfilePicture({ profile_picture: profile_pictureVal }));
    navigate("/step4");
  };

  return (
    <>
      <div style={{ marginTop: 200 }}>
        <form onSubmit={handleNext}>
          <input type="text" placeholder="Picture" ref={profile_picture} />
          <input type="text" placeholder="username" ref={username} />
          <input type="text" placeholder="Bio" ref={description} />
          <button>Next</button>
        </form>
      </div>
      <Link to="/step2">Back</Link>
    </>
  );
}
