import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { updatePetInfo } from "../../slicers/petSlice";
import { useDispatch, useSelector } from "react-redux";
import { submitPicForPet } from "../../util/uploadImage";

const UpdatePetInfo = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const _id = useSelector((state) => state.pet.info._id);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    let images;
    if (data.pet_pictures.length >= 1) {
      images = await submitPicForPet(data.pet_pictures);
    }

    const updateInfo = () => {
      for (const key in data) {
        if (data[key] === "") delete data[key];
      }
      data.pet_pictures = images;
      return data;
    };
    updateInfo();
    data._id = _id;
    const update = await dispatch(updatePetInfo({ data }));
    if (update.payload.err) {
      setErrorMessage("Pet info is failed to update...");
    } else {
      setSuccessMessage("Pet info is successfully updated!");
    }
  };

  return (
    <section style={{ margin: 200 }}>
      <h1>Update Pet Info</h1>
      <h2>{errorMessage ? errorMessage : successMessage}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="name" {...register("name")} />
        <input type="text" placeholder="Bio" {...register("description")} />
        <input type="file" multiple {...register("pet_pictures")} />
        <button>Save</button>
      </form>
    </section>
  );
};

export default UpdatePetInfo;
