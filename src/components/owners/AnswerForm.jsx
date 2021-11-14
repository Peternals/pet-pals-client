import React from "react";

const AnswerForm = ({ answerFormRef, setCurrentRequest }) => {
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
		<div className="answerFormContainer" ref={answerFormRef}>
			<div className="form">
				<i className="fa fa-close" onClick={closeAnswerForm}></i>
				<h1>Answers</h1>
				<ol>
					{[1, 2, 3, 4, 5, 6, 7, 9].map((_, i) => (
						<li>
							<h2>How would you feed my dog</h2>
							<p>
								Ad duis sunt sunt est et. Minim ullamco ipsum nisi nulla. Dolor
								minim nisi cupidatat proident commodo proident dolore aliqua
								amet ipsum voluptate sint cupidatat minim. Eiusmod eiusmod minim
								consequat occaecat duis laboris.
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
	);
};

export default AnswerForm;
