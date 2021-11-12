import React from "react";
import Carer from "../components/carer/Carer";
import OwnerHome from "../components/owners/OwnerHome";
import { useSelector } from "react-redux";

const Home = () => {
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const type = useSelector((state) => state.user.type);
	return (
		<div>
			{isLoggedIn === true ? (
				<>{type === "Owner" ? <OwnerHome /> : <Carer />}</>
			) : (
				<div>Nothing</div>
			)}
		</div>
	);
};

export default Home;
