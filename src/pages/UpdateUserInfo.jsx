import React, { useState } from "react";
import "../styles/update.scss";
import { updateUserInfo } from "../slicers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { submitPic } from "../util/uploadImage";

const UpdateUserInfo = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  const onSubmit = async (data) => {
    console.log(_id, data);

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
    console.log(updateUserAction);
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
          <input
            type="file"
            placeholder="profile picture"
            {...register("profile_picture")}
          />
          <button>Save</button>
        </form>
      </div>
    </main>
  );
};

export default UpdateUserInfo;
