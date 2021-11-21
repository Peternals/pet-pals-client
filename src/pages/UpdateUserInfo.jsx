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

    const modifyData = () => {
      const dirtyKeys = Object.keys(dirtyFields);
      const originalKeys = Object.keys(data);
      const deleteKeys = originalKeys.filter(
        (originalKey) => !dirtyKeys.includes(originalKey)
      );
      for (let key of deleteKeys) {
        delete data[key];
      }
      data.profile_picture = img;
      return data;
    };
    modifyData();

    const updateUserAction = await dispatch(updateUserInfo({ _id, data }));
    if (updateUserAction.payload.err) {
      setErrorMessage("Accout update is falied");
    } else {
      setSuccessMessage("Account is successfully updated");
    }
  };

  return (
    <main style={{ marginTop: 200 }}>
      <h1>Edit profile</h1>
      <div>{errorMessage ? errorMessage : successMessage}</div>
      <div className="update">
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <img src={preview} alt="selectedImg" style={{ width: "50%" }} />
            )}
          </div>
          <input
            type="text"
            placeholder="username"
            onChange
            {...register("username")}
          />
          <div>{errors.username?.message}</div>
          <input type="text" placeholder="email" {...register("email")} />
          <div>{errors.email?.message}</div>
          <input
            type="password"
            placeholder="password"
            {...register("password")}
          />
          <div>{errors.password?.message}</div>
          <input type="type" placeholder="Bio" {...register("description")} />
          <button>Save</button>
        </form>
      </div>
    </main>
  );
};

export default UpdateUserInfo;
