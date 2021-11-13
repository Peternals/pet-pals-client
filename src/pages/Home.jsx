import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const type = useSelector((state) => state.user.type);
	return (
		<div>
			{isLoggedIn === true ? (
				<>
					{type === "Owner" ? (
						<Navigate to="/owner" />
					) : (
						<Navigate to="/carer" />
					)}
				</>
			) : (
				<div>Nothing</div>
			)}
		</div>
	);
};

export default Home;
