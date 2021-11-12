import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	return (
		<>
			{isLoggedIn === true && children}
			{isLoggedIn === false && <Navigate to="/about" />}
		</>
	);
};

export default PrivateRoute;
