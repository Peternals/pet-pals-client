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
} from "../slicers/petSlice";

export default function Step4() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleNext = async (e) => {
    const peNameVal = e.petName;
    const petTypeVal = e.petType;
    const petDescriptionVal = e.petDescription;
    const inputFile = document.querySelector("#file");
    const pet_pictureVal = inputFile.files[0];
    await dispatch(getPetType(petTypeVal));
    await dispatch(getPetName(peNameVal));
    await dispatch(getPetDescription(petDescriptionVal));
    await dispatch(getPetPicture(pet_pictureVal));
    navigate("/step5");
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(handleNext)} style={{ marginTop: 200 }}>
          <input
            type="file"
            id="file"
            placeholder="Picture"
            {...register("pet_picture")}
          />
          <div>{errors.pet_picture?.message}</div>
          <input type="text" placeholder="PetName" {...register("petName")} />
          <div>{errors.petName?.message}</div>
          <select type="text" {...register("petType")}>
            <option>Select pet type</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="otter">Otter</option>
            <option value="snake">Snake</option>
          </select>
          <div>{errors.petType?.message}</div>
          <input
            type="text"
            placeholder="Bio"
            {...register("petDescription")}
          />
          <div>{errors.petDescription?.message}</div>
          <button>Next</button>
        </form>
      </div>
      <Link to="/step3/owner">Back</Link>
    </>
  );
}
