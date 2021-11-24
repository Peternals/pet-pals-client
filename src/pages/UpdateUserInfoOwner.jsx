import React, { useState, useEffect } from "react";
import "../styles/update.scss";
import { updateUserInfo } from "../slicers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

const UpdateUserInfo = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const _id = useSelector((state) => state.user._id);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    username: Yup.string(),
    email: Yup.string().email("Email is invalid"),
    description: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
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

  const onSubmit = async (data) => {
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

    let img;
    if (data.profile_picture[0] !== undefined) {
      img = await submitPic(data.profile_picture[0]);
    }

    const modifyProfileData = () => {
      const updateProfileData = {};
      const dirtyKeys = Object.keys(dirtyFields);
      for (let key of dirtyKeys) {
        updateProfileData[key] = data[key];
      }

      updateProfileData.profile_picture = img;
      return updateProfileData;
    };
    const updateProfileData = modifyProfileData();

    const updateData = updateProfileData;

    const updateUserAction = await dispatch(
      updateUserInfo({ _id, updateData })
    );
    if (updateUserAction.payload.err) {
      setErrorMessage("Accout update is falied");
    } else {
      setSuccessMessage("Account is successfully updated");
    }
  };

  return (
    <main className="updateUser">
      <div className="update">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Edit profile</h1>
          <div>{errorMessage ? errorMessage : successMessage}</div>
          <div>
            <input
              type="file"
              placeholder="profile picture"
              {...imageField}
              onChange={(e) => {
                imageField.onChange(e);
                onSelectFile(e);
              }}
            />
            {selectedFile && (
              <img src={preview} alt="selectedImg" style={{ width: "20%" }} />
            )}
          </div>
          <input
            type="text"
            className="input"
            placeholder="username"
            onChange
            {...register("username")}
          />
          <div>{errors.username?.message}</div>
          <input
            type="text"
            placeholder="email"
            className="input"
            {...register("email")}
          />
          <div>{errors.email?.message}</div>
          <input
            type="password"
            className="input"
            placeholder="password"
            {...register("password")}
          />
          <div>{errors.password?.message}</div>
          <textarea
            type="type"
            placeholder="Bio"
            className="input"
            {...register("description")}></textarea>

          <button className="btn btn-primary saveBtn">Save</button>
        </form>
      </div>
    </main>
  );
};

export default UpdateUserInfo;
