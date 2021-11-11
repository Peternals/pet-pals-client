import React from "react";
import "../../styles/navbar/nav.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<header className="navHeader">
			<nav className="navMain">
				<Link to="/">
					<h1>Pet Rental</h1>
				</Link>
				<ul className="mainOptions">
					<li>
						<i className="fa fa-bell"></i>
					</li>
					<Link to="/messenger">
						<li>
							<i className="fa fa-wechat"></i>
						</li>
					</Link>
					<li>
						<i className="fa fa-sign-out"></i>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
