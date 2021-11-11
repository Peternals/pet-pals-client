import React, { useRef } from "react";
import { Link } from "react-router-dom";
import sampleImg from "../../assets/sample.jpg";

const Request = () => {
	const answerFormRef = useRef();

	const openAnswerForm = () => {
		answerFormRef.current.classList.add("showAnswerForm");
	};
	const closeAnswerForm = () => {
		answerFormRef.current.classList.remove("showAnswerForm");
	};
	return (
		<section className="requestSection">
			<div className="gridRequest">
				{[1, 2, 3, 4, 5, 6, 7].map(() => (
					<div className="request">
						<img src={sampleImg} alt="img" />
						<div className="requestInfo">
							<h1>Name</h1>
							<p>Request for max</p>
							<p>from: march 5</p>
							<p>to: march 8</p>
							<button onClick={openAnswerForm}>Review</button>
						</div>
					</div>
				))}
			</div>
			<div className="answerFormContainer" ref={answerFormRef}>
				<form>
					<i className="fa fa-close" onClick={closeAnswerForm}></i>
					<h1>Answers</h1>
					<ol>
						{[1, 2, 3, 4, 5, 6, 7, 9].map(() => (
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
					<input type="submit" />
				</form>
			</div>
		</section>
	);
};

export default Request;
