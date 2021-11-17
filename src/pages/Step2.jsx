import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getType } from "../slicers/userSlice";

export default function Step2() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleTypeUser = (e) => {
		dispatch(getType(e.target.value));
		const userType =
			e.target.value === "Owner" ? "/step3/owner" : "/step3/carer";
		navigate(userType);
	};

	return (
		<>
			<div className="sign-up-container">
				<h2>What are you?</h2>
				<button
					className="OwnerBtn"
					type="button"
					value="Owner"
					onClick={handleTypeUser}>
					Owner
				</button>
				<button
					className="CarerBtn"
					type="button"
					value="Carer"
					onClick={handleTypeUser}>
					Carer
				</button>
				<Link className="backBtn" to="/signup">
					Back
				</Link>
			</div>
		</>
	);
}
