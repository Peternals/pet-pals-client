import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../slicers/userSlice";
import { submitPic } from "../util/uploadImage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function Step3Carer() {
<<<<<<< HEAD
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
    const profile_pictureVal = inputFile.files[0];

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

=======
  const signUpInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleSubmitAction = async (e) => {
    const inputFile = document.querySelector("#file");
    const usernameVal = e.username;
    const descriptionVal = e.description;
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

        return response.data[0].filename;
      } catch (err) {
        console.log(err);
      }
    };

    const img = await submitPic(profile_pictureVal);

    const submitTags = () => {
      const dirtyKeys = Object.keys(dirtyFields);
      const originalKeys = Object.keys(e);
      const deletedKeys = originalKeys.filter(
        (key) => !dirtyKeys.includes(key)
      );

      for (const key of deletedKeys) {
        delete e[key];
      }
      delete e.username;
      delete e.description;
      delete e.profile_picture;

      const result = Object.values(e);
      return result.flat();
    };

    const submitAction = await dispatch(
      signUp({
        username: usernameVal,
        email: signUpInfo.email,
        password: signUpInfo.password,
        description: descriptionVal,
        profile_picture: img,
        type: signUpInfo.type,
        interests: submitTags(),
      })
    );
    if (submitAction.payload.user) {
      navigate("/");
    }
  };

>>>>>>> main
  return (
    <>
      <div className="step3Carer">
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
          <textarea
            type="text"
            placeholder="Bio"
<<<<<<< HEAD
            {...register("description")}
          ></textarea>
          <div>{errors.description?.message}</div>
=======
            {...register("description")}></textarea>
          <div>{errors.description?.message}</div>
          <select type="text" {...register("petType")}>
            <option>Select Pet Type</option>
            {typeTags.map((type, i) => (
              <option value={type} key={i}>
                {type}
              </option>
            ))}
          </select>
          <select type="text" {...register("petSizeTag")}>
            <option>Select size</option>
            {sizeTags.map((size, i) => (
              <option value={size} key={i}>
                {size}
              </option>
            ))}
          </select>
          <ul>
            {healthTags.map((health, i) => (
              <li>
                <input
                  type="checkbox"
                  value={health}
                  name="health"
                  id={health}
                  {...register("petHealthTag")}
                />
                <label key={i} htmlFor={health}>
                  {health}
                </label>
              </li>
            ))}
          </ul>
          <ul>
            {trainedTags.map((trained, i) => (
              <li key={trained}>
                <input
                  type="checkbox"
                  value={trained}
                  name="trained"
                  id={trained}
                  {...register("petTrainedTag")}
                />
                <label key={i} htmlFor={trained}>
                  {trained}
                </label>
              </li>
            ))}
          </ul>
          <ul>
            {playingTags.map((playing, i) => (
              <li>
                <input
                  type="checkbox"
                  value={playing}
                  name="playing"
                  id={playing}
                  {...register("petPlayingTag")}
                />
                <label key={i} htmlFor={playing}>
                  {playing}
                </label>
              </li>
            ))}
          </ul>
>>>>>>> main
          <button>Submit</button>
          <Link to="/step2">Back</Link>
        </form>
      </div>
    </>
  );
}
