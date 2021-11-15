import React, { createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../slicers/userSlice";
import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

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
    const profile_pictureVal = profile_picture.current.files[0];
    
    const submitPic = async (imageInput) => {
      try {
        const formData = new FormData();
        formData.append("name", Date.now() + imageInput.name);
        formData.append("file", imageInput);
        const response = await axios.post(`${REACT_APP_SERVER_URL}/pic/upload`, formData);
        return response.data.filename;

      } catch (err) {
        console.log(err);
      }
    }

    const img = await submitPic(profile_pictureVal);

    const submitAction = await dispatch(
      signUp({
        username: usernameVal,
        email: signUpInfo.email,
        password: signUpInfo.password,
        description: descriptionVal,
        profile_picture: img,
        type: signUpInfo.type,
      })
    );
    if (submitAction.payload.user) {
      navigate("/");
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} style={{ marginTop: 200 }}>
          <input type="file" placeholder="Picture" ref={profile_picture} />
          <input type="text" placeholder="Full Name" ref={username} />
          <input type="text" placeholder="Bio" ref={description} />
          <button>Submit</button>
        </form>
      </div>
      <Link to="/step2">Back</Link>
    </>
  );
}
