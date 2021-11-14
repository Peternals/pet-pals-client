import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../slicers/userSlice";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const { REACT_APP_SERVER_URL } = process.env;

export default function Step3Carer() {
  const dispatch = useDispatch();
  const signUpInfo = useSelector((state) => state.user);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Full Name is required"),
    description: Yup.string().required("Bio is required"),
    profile_picture: Yup.mixed()
      .required("Profile picture is required")
      .test("fileLength", "Profile picture is required", (value) => {
        return value.length > 0;
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleSubmitAction = async (e) => {
    const inputFile = document.querySelector("#file");
    const usernameVal = e.username;
    const descriptionVal = e.description;
    console.log(inputFile.files[0]);
    // const profile_pictureVal = profile_picture.current.files[0];
    const profile_pictureVal = inputFile.files[0];

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
      <div style={{ marginTop: 200 }}>
        <form onSubmit={handleSubmit(handleSubmitAction)}>
          <input
            type="file"
            id="file"
            placeholder="Picture"
            {...register("profile_picture")}
          />
          <div>{errors.profile_picture?.message}</div>
          <input
            type="text"
            placeholder="Full Name"
            {...register("username")}
          />
          <div>{errors.username?.message}</div>
          <input type="text" placeholder="Bio" {...register("description")} />
          <div>{errors.description?.message}</div>
          <button>Submit</button>
        </form>
      </div>
      <Link to="/step2">Back</Link>
    </>
  );
}
