import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../slicers/userSlice";
import { petDataStore } from "../slicers/petSlice";
import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

export default function Step5() {
  const dispatch = useDispatch();
  const userSignUpInfo = useSelector((state) => state.user);
  const petSignUpInfo = useSelector((state) => state.pet.info);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitPic = async (imageInput) => {
      try {
        const formData = new FormData();
        formData.append("file", imageInput);

        const response = await axios.post(
          `${REACT_APP_SERVER_URL}/pic/upload`,
          formData
        );
        return response.data[0].filename;
      } catch (err) {
        console.log(err);
      }
    };

    const submitPicForPet = async (imageInput) => {
      try {
        const formData = new FormData();
        [...imageInput].forEach((image) => {
          formData.append("file", image);
          formData.append("name", Date.now() + image.name);
        });
        const response = await axios.post(
          `${REACT_APP_SERVER_URL}/pic/upload`,
          formData
        );

        return response.data.map((res) => res.filename);
      } catch (err) {
        console.log(err);
      }
    };

    const userProfilePic = await submitPic(userSignUpInfo.profile_picture);
    const submitAction = await dispatch(
      signUp({
        username: userSignUpInfo.username,
        email: userSignUpInfo.email,
        password: userSignUpInfo.password,
        description: userSignUpInfo.description,
        profile_picture: userProfilePic,
        type: userSignUpInfo.type,
      })
    );

    const petPic = await submitPicForPet(petSignUpInfo.pet_pictures);
    const petDataStoreAction = await dispatch(
      petDataStore({
        type: petSignUpInfo.type,
        name: petSignUpInfo.name,
        owner_id: submitAction.payload.user._id,
        description: petSignUpInfo.description,
        pet_pictures: petPic,
      })
    );
    if (submitAction.payload.user) {
      if (!petDataStoreAction.payload.err) {
        navigate("/");
      }
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
