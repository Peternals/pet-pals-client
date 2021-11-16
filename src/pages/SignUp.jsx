import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { validation } from "../slicers/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "../styles/registration/signIn_signUp.scss";

export default function SignUp() {
	const [errorMessage, setErrorMessage] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const validationSchema = Yup.object().shape({
		email: Yup.string().required("Emai is required").email("Email is invalid"),
		password: Yup.string().min(6, "Min is 6").required("Password is required"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	const handleContinue = async (data) => {
		const firstInputAction = await dispatch(
			validation({
				email: data.email,
				password: data.password,
			})
		);

		if (firstInputAction.payload.err === "User already exists. Please Login") {
			setErrorMessage(firstInputAction.payload.err);
		} else {
			navigate("/step2");
		}
	};

	return (
		<>
			<div className="sign-up-container">
				<form onSubmit={handleSubmit(handleContinue)}>
					<h1>Sign Up</h1>
					<div>{errorMessage}</div>
					<input
						name="email"
						type="text"
						placeholder="Email"
						{...register("email")}
					/>
					<div>{errors.email?.message}</div>
					<input
						name="password"
						type="password"
						placeholder="Password"
						{...register("password")}
					/>
					<div>{errors.password?.message}</div>
					<button>Continue</button>
					<div className="sign-up-navigator">
						<Link to="/signin">Have an account?</Link>
					</div>
				</form>
			</div>
		</>
	);
}
