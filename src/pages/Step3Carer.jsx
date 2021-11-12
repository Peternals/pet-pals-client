import React, { createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getUserName,
  getDescription,
  getProfilePicture,
  changeSuccessStatus,
} from "../slicers/userSlice";
import { signUp } from "../slicers/userSlice";

export default function Step3Carer() {
  const dispatch = useDispatch();
  const signUpInfo = useSelector((state) => state.user);
  const navigate = useNavigate();
  const username = createRef();
  const description = createRef();
  const profile_picture = createRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usernameVal = username.current.value;
    const descriptionVal = description.current.value;
    const profile_pictureVal = profile_picture.current.value;
    dispatch(getUserName({ username: usernameVal }));
    dispatch(getDescription({ description: descriptionVal }));
    dispatch(getProfilePicture({ profile_picture: profile_pictureVal }));

    const submitAction = await dispatch(
      signUp({
        username: usernameVal,
        email: signUpInfo.email,
        password: signUpInfo.password,
        description: descriptionVal,
        profile_picture: profile_pictureVal,
        type: signUpInfo.type,
      })
    );
    dispatch(changeSuccessStatus());
    if (submitAction.payload) {
      navigate("/complete");
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} style={{ marginTop: 200 }}>
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
