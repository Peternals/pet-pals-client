import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../slicers/userSlice";
import { petQuestionStore } from "../slicers/petSlice";
import { petDataStore } from "../slicers/petSlice";
import axios from "axios";
import QuestionForm from "../components/owners/QuestionForm";

const { REACT_APP_SERVER_URL } = process.env;

export default function Step5() {
  const dispatch = useDispatch();
  const userSignUpInfo = useSelector((state) => state.user);
  const petSignUpInfo = useSelector((state) => state.pet);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle questions
    const questions = Array.from(e.target.elements)
      .filter((input) => input.type === "text")
      .map((input) => input.value);

    const submitPic = async (imageInput) => {
      try {
        const formData = new FormData();
        formData.append("name", Date.now() + imageInput.name);
        formData.append("file", imageInput);
        const response = await axios.post(
          `${REACT_APP_SERVER_URL}/pic/upload`,
          formData
        );

        return response.data.filename;
      } catch (err) {
        console.log(err);
      }
    };
    const img = await submitPic(userSignUpInfo.profile_picture);
    const submitAction = await dispatch(
      signUp({
        username: userSignUpInfo.username,
        email: userSignUpInfo.email,
        password: userSignUpInfo.password,
        description: userSignUpInfo.description,
        profile_picture: img,
        type: userSignUpInfo.type,
      })
    );
    const petDataStoreAction = await dispatch(
      petDataStore({
        type: petSignUpInfo.type,
        name: petSignUpInfo.name,
        owner_id: submitAction.payload.user._id,
        description: petSignUpInfo.description,
        pet_picture: petSignUpInfo.pet_picture,
      })
    );

    // Not completed yet.
    const saveQuestionnaire = await dispatch(
      petQuestionStore({
        questions: questions,
      }) // Need pet ID
    );

    if (submitAction.payload.user && saveQuestionnaire.payload) {
      console.log(saveQuestionnaire.payload);
      navigate("/");
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} style={{ marginTop: 200 }}>
          <h2>Questionnaire</h2>
          <QuestionForm />
          <button>Submit</button>
        </form>
      </div>
      <Link to="/step4">Back</Link>
    </>
  );
}
