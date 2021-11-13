// import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import sampleImg from "../../assets/sample.jpg";

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
	const closeAnswerForm = () => {
		setCurrentRequest({});
		answerFormRef.current.classList.remove("showAnswerForm");
	};

	const requestAction = async (action) => {
		try {
			// const action = await axios.post("")
			// const filterRequest = requests.filter(req => req._id !== id)
			// setRequest(filterRequest)
			closeAnswerForm();
		} catch (error) {
			console.log(error);
		}
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
			<div className="answerFormContainer" ref={answerFormRef}>
				<div className="form">
					<i className="fa fa-close" onClick={closeAnswerForm}></i>
					<h1>Answers</h1>
					<ol>
						{[1, 2, 3, 4, 5, 6, 7, 9].map((_, i) => (
							<li>
								<h2>How would you feed my dog</h2>
								<p>
									Ad duis sunt sunt est et. Minim ullamco ipsum nisi nulla.
									Dolor minim nisi cupidatat proident commodo proident dolore
									aliqua amet ipsum voluptate sint cupidatat minim. Eiusmod
									eiusmod minim consequat occaecat duis laboris.
								</p>
							</li>
						))}
					</ol>
					<div className="answerFormButtons">
						<button onClick={() => requestAction("accept")}>Accept</button>
						<button onClick={() => requestAction("reject")}>Decline</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Request;
