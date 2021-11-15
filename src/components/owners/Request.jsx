// import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import sampleImg from "../../assets/sample.jpg";
import AnswerForm from "./AnswerForm";

const Request = () => {
	const answerFormRef = useRef();
	// const [requests, setrequests] = useState([]);
	const [currentRequest, setCurrentRequest] = useState({});
	useEffect(() => {
		try {
			//get all request of the user
			console.log(currentRequest);
		} catch (error) {}
		//gonna remove this dependency
	}, [currentRequest]);

	const openAnswerForm = (id) => {
		// const action = axios.get("")
		// setCurrentRequest(action.data);
		answerFormRef.current.classList.add("showAnswerForm");
	};

	return (
		<section className="requestSection">
			<h1>Requests</h1>
			<div className="gridRequest">
				{[1, 2, 3, 4, 5, 6, 7].map(() => (
					<div className="request">
						<img src={sampleImg} alt="img" />
						<div className="requestInfo">
							<h3>Andrew</h3>
							<p>Request for max</p>
							<p>
								<span>from:</span> march 5
							</p>
							<p>
								<span>to:</span> a march 8
							</p>
							<button onClick={() => openAnswerForm("should be an id")}>
								Review
							</button>
						</div>
					</div>
				))}
			</div>
			<AnswerForm
				answerFormRef={answerFormRef}
				setCurrentRequest={setCurrentRequest}
			/>
		</section>
	);
};

export default Request;
