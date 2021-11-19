import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { updatePetInfo, deleteQuestion } from "../../slicers/petSlice";
import { useDispatch, useSelector } from "react-redux";
import { submitPicForPet } from "../../util/uploadImage";

const UpdatePetInfo = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [index, setIndex] = useState();
  const petInfo = useSelector((state) => state.pet.info);
  const questionnaire = useSelector((state) => state.pet.pet_questions);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: petInfo.name,
      description: petInfo.description,
    },
  });

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
    data._id = petInfo._id;
    const handleUpdate = await dispatch(updatePetInfo(data));
    if (handleUpdate.payload.err) {
      setErrorMessage("Failed to update...");
    } else {
      setSuccessMessage("Successfully updated!");
    }
  };

  console.log(index, questionnaire[index]);
  const handleDelete = async (data) => {
    data._id = petInfo._id;
    data.questionnaire = questionnaire[index];
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
      <h1 style={{ marginTop: 10 }}>Update Questionnaire</h1>
      {questionnaire.map((q, i) => (
        <div key={i}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>{q}</label>
            <input type="text" {...register("questionnaire")} />
            <button>Modify</button>
          </form>
          {/* {need to retrieve index of question } */}
          <button
            onClick={() => {
              setIndex(i);
              // handleDelete();
            }}
          >
            Delete
          </button>
        </div>
      ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Add Question"
          {...register("questionnaire")}
        />
        <button>Save</button>
      </form>
    </section>
  );
};

export default UpdatePetInfo;
