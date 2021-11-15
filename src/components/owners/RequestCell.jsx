import React from "react";
import profilePic from "../../assets/sample.jpg";

const RequestCell = () => {
	return (
		<li className="request">
			<figure>
				<img alt="img" src={profilePic} />
			</figure>

			<div>
				<h4>Andrew</h4>
				<p>
					<span>from:</span> march 5
				</p>
				<p>
					<span>to:</span> a march 8
				</p>
			</div>
		</li>
	);
};

export default RequestCell;
