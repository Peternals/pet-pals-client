import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../slicers/userSlice";
import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

export default function Step5() {
  const dispatch = useDispatch();
  const signUpInfo = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(signUpInfo);
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
    const img = await submitPic(signUpInfo.profile_picture)
    const submitAction = await dispatch(
      signUp({
        username: signUpInfo.username,
        email: signUpInfo.email,
        password: signUpInfo.password,
        description: signUpInfo.description,
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
          <h2>Questionnaire</h2>
          <input type="text" placeholder="Question" />
          <button>Submit</button>
        </form>
      </div>
      <Link to="/step4">Back</Link>
    </>
  );
}
