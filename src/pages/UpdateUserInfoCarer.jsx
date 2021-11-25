import React, { useState, useEffect } from "react";
import "../styles/update.scss";
import { updateUserInfo } from "../slicers/userSlice";
import { fetchUserInfo } from "../slicers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;
// import { submitPic } from "../util/uploadImage";

const UpdateUserInfo = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [currentInterests, setCurrentInterests] = useState();

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

  useEffect(() => {
    (async () => {
      const result = await dispatch(fetchUserInfo(_id));
      setCurrentInterests(result.payload.interests);
    })();
  }, [_id, dispatch]);

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
    updateInterstsData.length === 0
      ? (updateData.interests = undefined)
      : (updateData.interests = updateInterstsData);

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

          <div>
            <label className="fileBtn">
              Profile Picture
              <input
                type="file"
                placeholder="profile picture"
                {...imageField}
                onChange={(e) => {
                  imageField.onChange(e);
                  onSelectFile(e);
                }}
              />
            </label>
            {selectedFile && (
              <figure>
                <img src={preview} alt="selectedImg" style={{ width: "20%" }} />
              </figure>
            )}
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="username"
              className="input"
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
              className="input"
              placeholder="Bio"
              {...register("description")}></textarea>
          </div>
          <h3>Interest</h3>
          <h5>Pet Type:</h5>
          <ul>
            {typeTags.map((type, i) => (
              <li key={i}>
                <input
                  type="checkbox"
                  value={type}
                  id={type}
                  name="petType"
                  {...register("petType")}
                />
                <label className="tag is-coral" htmlFor={type}>
                  {type}
                </label>
              </li>
            ))}
          </ul>
          <h5>Pet Size:</h5>
          <ul>
            {sizeTags.map((size, i) => (
              <li key={i}>
                <input
                  type="checkbox"
                  value={size}
                  name="petSizeTag"
                  id={size}
                  {...register("petSizeTag")}
                />
                <label className="tag is-warning" htmlFor={size}>
                  {size}
                </label>
              </li>
            ))}
          </ul>
          <h5>Pet Health :</h5>
          <ul>
            {healthTags.map((health, i) => (
              <li key={i}>
                <input
                  type="checkbox"
                  value={health}
                  name="health"
                  id={health}
                  {...register("petHealthTag")}
                />
                <label className="tag is-success" htmlFor={health}>
                  {health}
                </label>
              </li>
            ))}
          </ul>
          <h5>Trained :</h5>
          <ul>
            {trainedTags.map((trained, i) => (
              <li key={i}>
                <input
                  type="checkbox"
                  value={trained}
                  id={trained}
                  name="trained"
                  {...register("petTrainedTag")}
                />
                <label className="tag is-danger" htmlFor={trained}>
                  {trained}
                </label>
              </li>
            ))}
          </ul>
          <h5>Where to play? :</h5>
          <ul>
            {playingTags.map((playing, i) => (
              <li key={i}>
                <input
                  type="checkbox"
                  value={playing}
                  name="playing"
                  id={playing}
                  {...register("petPlayingTag")}
                />
                <label className="tag is-info" htmlFor={playing}>
                  {playing}
                </label>
              </li>
            ))}
          </ul>
          <br />
          <h3>The Current Interests </h3>
          <div>
            {currentInterests
              ? currentInterests.map((interest, i) => (
                  <span className="tag" key={i}>
                    {interest}
                  </span>
                ))
              : ""}
          </div>
          <button className="btn btn-primary saveBtn">Save</button>
          <div>{errorMessage ? errorMessage : successMessage}</div>
        </form>
      </div>
    </main>
  );
};

export default UpdateUserInfo;
