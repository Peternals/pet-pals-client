import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../slicers/userSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "../styles/registration/signIn_signUp.scss";
import Loader from "../components/Loader";

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  // this code is for validation
  // validation rule
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Emai is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
  });

  // pass the validation rule to the useForm func
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // when the form is valid and submitted, this method is called
  const handleSignIn = async (data) => {
    setLoader(true);
    const signInAction = await dispatch(
      signIn({
        email: data.email,
        password: data.password,
      })
    );
    if (signInAction.payload.err === "Invalid Credentials") {
      setErrorMessage(signInAction.payload.err);
    } else {
      navigate("/");
    }
    setLoader(false);
  };

  return (
    <>
      <div className="sign-in-container">
        {loader && (
          <Loader />
        )}
        <form onSubmit={handleSubmit(handleSignIn)} className="signInForm">
          <h1>Sign In</h1>
          <div className="error">{errorMessage}</div>
          <input
            name="email"
            type="text"
            placeholder="Email"
            {...register("email")}
          />
          <div className="error">{errors.email?.message}</div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <div className="error">{errors.password?.message}</div>
          <button>Sign In</button>
          <div className="sign-up-navigator">
            <Link to="/signup">Don't have an account yet? signup</Link>
          </div>
        </form>
      </div>
    </>
  );
}
