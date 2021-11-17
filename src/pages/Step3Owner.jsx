import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
	getUserName,
	getDescription,
	getProfilePicture,
} from "../slicers/userSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "../styles/registration/step.scss";

export default function Step3Owner() {
	const dispatch = useDispatch();
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

	const handleNext = async (e) => {
		const inputFile = document.querySelector("#file");
		const usernameVal = e.username;
		const descriptionVal = e.description;
		const profile_pictureVal = inputFile.files[0];
		await dispatch(getUserName({ username: usernameVal }));
		await dispatch(getDescription({ description: descriptionVal }));
		await dispatch(getProfilePicture({ profile_picture: profile_pictureVal }));
		navigate("/step4");
	};

	return (
		<>
			<div className="step3Owner">
				<form onSubmit={handleSubmit(handleNext)}>
					<input
						type="file"
						id="file"
						placeholder="Picture"
						{...register("profile_picture")}
					/>
					<div>{errors.profile_picture?.message}</div>
					<input type="text" placeholder="username" {...register("username")} />
					<div>{errors.username?.message}</div>
					<textarea
						type="text"
						placeholder="Bio"
						{...register("description")}></textarea>
					<div>{errors.description?.message}</div>
					<button>Next</button>
					<Link className="backBtn" to="/step2">
						Back
					</Link>
				</form>
			</div>
		</>
	);
}
