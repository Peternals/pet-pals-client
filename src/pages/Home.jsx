import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div>
			{/* you can ignore this, this is just a test, you can remove it if you want */}
			<Link to="/messenger">
				<h1>Home</h1>
			</Link>
		</div>
	);
};

export default Home;
