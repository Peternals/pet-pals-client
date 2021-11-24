import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  updatePetInfo,
  deleteQuestion,
  getPetInfo,
} from "../../slicers/petSlice";
import { useDispatch, useSelector } from "react-redux";
import { submitPicForPet } from "../../util/uploadImage";

const UpdatePetInfo = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const petInfo = useSelector((state) => state.pet.info);
  const questions = useSelector((state) => state.pet.pet_questions);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(getPetInfo());
  }, [dispatch]);

  const onSubmit = async (data, e) => {
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
    data._id = petInfo._id;
    const handleUpdate = await dispatch(updatePetInfo(data));
    if (handleUpdate.payload.err) {
      setErrorMessage("Failed to update...");
    } else {
      setSuccessMessage("Successfully updated!");
    }
    e.target.reset();
  };

  const handleDelete = async (index) => {
    const data = {
      _id: petInfo._id,
      questionnaire: questions[index],
    };
    await dispatch(deleteQuestion(data));
  };

  return (
    <section style={{ margin: 100 }}>
      <h1>Update Pet Info</h1>
      <h2>{errorMessage ? errorMessage : successMessage}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name:</label>
        <input type="text" placeholder={petInfo.name} {...register("name")} />
        <label>Bio:</label>
        <input
          type="text"
          placeholder={petInfo.description}
          {...register("description")}
        />
        <input type="file" multiple {...register("pet_pictures")} />
        <button>Save</button>
      </form>
      <h2 style={{ marginTop: 30 }}>Update Questionnaire</h2>
      {questions &&
        questions.map((q, i) => (
          <div key={i}>
            <p>{q}</p>
            <button onClick={() => handleDelete(i)}>Delete</button>
          </div>
        ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Add Question"
          defaultValue=""
          {...register("questionnaire")}
        />
        <button>Add</button>
      </form>
    </section>
  );
};

export default UpdatePetInfo;
