import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  getPetType,
  getPetName,
  getPetDescription,
  getPetPicture,
  getPetTag,
} from "../slicers/petSlice";
import "../styles/registration/step.scss";

export default function Step4() {
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
    petName: Yup.string().required("Pet name is required"),
    petType: Yup.string().required("Pet type is required"),
    petDescription: Yup.string().required("Pet bio is required"),
    pet_picture: Yup.mixed()
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

  const handleNext = async (e) => {
    const petNameVal = e.petName;
    const petTypeVal = e.petType;
    const petDescriptionVal = e.petDescription;
    const inputFile = document.querySelector("#file");
    const pet_pictureVal = inputFile.files;

    const submitTags = () => {
      const dirtyKeys = Object.keys(dirtyFields);
      const originalKeys = Object.keys(e);
      const deletedKeys = originalKeys.filter(
        (key) => !dirtyKeys.includes(key)
      );

      for (const key of deletedKeys) {
        delete e[key];
      }
      delete e.petName;
      delete e.petDescription;
      delete e.pet_picture;

      const result = Object.values(e);
      return result.flat();
    };

    await dispatch(getPetType(petTypeVal));
    await dispatch(getPetName(petNameVal));
    await dispatch(getPetDescription(petDescriptionVal));
    await dispatch(getPetPicture(pet_pictureVal));
    await dispatch(getPetTag(submitTags()));
    navigate("/step5");
  };

  return (
    <>
      <div className="step4">
        <form onSubmit={handleSubmit(handleNext)}>
          <input
            type="file"
            id="file"
            multiple
            placeholder="Picture"
            {...register("pet_picture")}
          />
          <div>{errors.pet_picture?.message}</div>
          <input type="text" placeholder="PetName" {...register("petName")} />
          <div>{errors.petName?.message}</div>
          <select type="text" {...register("petType")}>
            <option>Select pet type</option>
            {typeTags.map((type, i) => (
              <option value={type} key={i}>
                {type}
              </option>
            ))}
          </select>
          <select {...register("petSizeTag")}>
            <option>Select size</option>
            {sizeTags.map((size, i) => (
              <option value={size} key={i}>
                {size}
              </option>
            ))}
          </select>
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
                <label htmlFor={health}>{health}</label>
              </li>
            ))}
          </ul>
          <ul>
            {trainedTags.map((trained, i) => (
              <li key={i}>
                <input
                  type="checkbox"
                  value={trained}
                  name="trained"
                  id={trained}
                  {...register("petTrainedTag")}
                />
                <label htmlFor={trained}>{trained}</label>
              </li>
            ))}
          </ul>
          <ul>
            {playingTags.map((playing, i) => (
              <li key={i}>
                <input
                  id={playing}
                  type="checkbox"
                  value={playing}
                  name="playing"
                  {...register("petPlayingTag")}
                />
                <label htmlFor={playing}>{playing}</label>
              </li>
            ))}
          </ul>
          <div>{errors.petType?.message}</div>
          <textarea
            type="text"
            placeholder="Bio"
            {...register("petDescription")}
          ></textarea>
          <div>{errors.petDescription?.message}</div>
          <button>Next</button>
          <Link to="/step3/owner">Back</Link>
        </form>
      </div>
    </>
  );
}
