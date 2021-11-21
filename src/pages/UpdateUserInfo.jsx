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

  const typeTags = [
    "Dog",
    "Cat",
    "Otter",
    "Snake",
    "Rabbit",
    "Hamster",
    "Marmot",
    "Parakeet",
    "Hedgehog",
    "Ferret",
    "Iguana",
    "Mini pig",
    "Turtle",
    "Fish",
  ];
  const sizeTags = ["Small", "Medium", "Large", "Giant"];
  const healthTags = ["Vaccinated", "Neutered", "Need supplements"];
  const trainedTags = ["Litter trained", "Child friendly", "House trained"];
  const playingTags = ["Outside", "Inside"];

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
      const profileDirtyKeys = dirtyKeys.filter((key) => {
        return (
          key !== "petType" &&
          key !== "petSizeTag" &&
          key !== "petHealthTag" &&
          key !== "petTrainedTag" &&
          key !== "petPlayingTag"
        );
      });
      for (let key of profileDirtyKeys) {
        updateProfileData[key] = data[key];
      }

      updateProfileData.profile_picture = img;
      return updateProfileData;
    };
    const updateProfileData = modifyProfileData();

    const modifyInterstsData = () => {
      const updateInterestsData = [];
      const dirtyKeys = Object.keys(dirtyFields);
      const interestsDirtyKeys = dirtyKeys.filter((key) => {
        return (
          key !== "username" &&
          key !== "email" &&
          key !== "password" &&
          key !== "description" &&
          key !== "profile_picture"
        );
      });
      for (let key of interestsDirtyKeys) {
        updateInterestsData.push(data[key]);
      }

      return updateInterestsData.flat();
    };
    const updateInterstsData = modifyInterstsData();

    const updateData = updateProfileData;
    updateData.interests = updateInterstsData;

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
              <img src={preview} alt="selectedImg" style={{ width: "20%" }} />
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
          <div>Interests</div>
          <select type="text" {...register("petType")}>
            <option>Select Pet Type</option>
            {typeTags.map((type, i) => (
              <option value={type} key={i}>
                {type}
              </option>
            ))}
          </select>
          <select type="text" {...register("petSizeTag")}>
            <option>Select Pet Size</option>
            {sizeTags.map((size, i) => (
              <option value={size} key={i}>
                {size}
              </option>
            ))}
          </select>
          <div>
            {healthTags.map((health, i) => (
              <label key={i}>
                <input
                  type="checkbox"
                  value={health}
                  name="health"
                  {...register("petHealthTag")}
                />
                {health}
              </label>
            ))}
          </div>
          <div>
            {trainedTags.map((trained, i) => (
              <label key={i}>
                <input
                  type="checkbox"
                  value={trained}
                  name="trained"
                  {...register("petTrainedTag")}
                />
                {trained}
              </label>
            ))}
          </div>
          <div>
            {playingTags.map((playing, i) => (
              <label key={i}>
                <input
                  type="checkbox"
                  value={playing}
                  name="playing"
                  {...register("petPlayingTag")}
                />
                {playing}
              </label>
            ))}
          </div>
          <button>Save</button>
        </form>
      </div>
    </main>
  );
};

export default UpdateUserInfo;
