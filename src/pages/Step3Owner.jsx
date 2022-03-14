import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getUserName,
  getDescription,
  getProfilePicture,
} from "../slicers/userSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "../styles/registration/step.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Step3Owner() {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const dispatch = useDispatch();
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

  const imageField = register("profile_picture", { required: true });

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const handleNext = async (e) => {
    const inputFile = document.querySelector("#file");
    const usernameVal = e.username;
    const descriptionVal = e.description;
    const profile_pictureVal = inputFile.files[0];
    await dispatch(getUserName({ username: usernameVal }));
    await dispatch(getDescription({ description: descriptionVal }));
    await dispatch(getProfilePicture({ profile_picture: profile_pictureVal }));
    navigate("/step4");
  };

  return (
    <>
      <div className="step3Owner">
        <form onSubmit={handleSubmit(handleNext)}>
          <h1>User Info</h1>
          <div>
            <label htmlfor="file" className="fileBtn">
              Select Profile Picture
              <input
                type="file"
                id="file"
                placeholder="Picture"
                {...imageField}
                onChange={(e) => {
                  imageField.onChange(e);
                  onSelectFile(e);
                }}
              />
            </label>
          </div>
          {selectedFile && (
            <figure className="profilePic">
              <LazyLoadImage src={preview} alt="selectedImg" />
            </figure>
          )}
          <div className="error">{errors.profile_picture?.message}</div>
          <input
            type="text"
            placeholder="Full Name"
            {...register("username")}
          />
          <div className="error">{errors.username?.message}</div>
          <textarea
            type="text"
            placeholder="Bio"
            {...register("description")}></textarea>
          <div className="error">{errors.description?.message}</div>
          <button>Next</button>
          <Link className="backBtn" to="/step2">
            Back
          </Link>
        </form>
      </div>
    </>
  );
}
