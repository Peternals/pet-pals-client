import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function Step4() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    petName: Yup.string().required("Pet name is required"),
    petType: Yup.string().required("Pet type is required"),
    petDescription: Yup.string().required("Pet bio is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleNext = () => {
    navigate("/step5");
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(handleNext)} style={{ marginTop: 200 }}>
          <input
            name="petName"
            type="text"
            placeholder="PetName"
            {...register("petName")}
          />
          <div>{errors.petName?.message}</div>
          <select name="petType" {...register("petType")}>
            <option value="dog">Select pet type</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="otter">Otter</option>
            <option value="snake">Snake</option>
          </select>
          <div>{errors.petType?.message}</div>
          <input
            name="petDescription"
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
