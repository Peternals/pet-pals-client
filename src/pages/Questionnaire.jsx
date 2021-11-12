import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/carer/questionnaire.scss";

const Questionnaire = () => {
	const navigate = useNavigate();
	// Required Inputs: Questions asked by Owner for Pet
	// for each question generate a label for the question and an input for the answers.

	async function onSubmit(data) {
		data.preventDefault();
		const results = data.target; //.value;
		console.log(results);
		for (let input of results) {
			// TODO: How are we going to use inputs?
			console.log("input:", input.value);
		}

		// await axios.post("", {}, {
		//     headers: 'asdasdadas'
		// })
		navigate("/");
	}

	// TEST DATA - TO BE REMOVED
	const testQuestions = [
		"Do you like dogs?",
		"Have you looked after dogs before?",
		"Are you a kind person?",
	];
	return (
		<main className="questionnaireMain">
			<p>Hello</p>
			<form onSubmit={onSubmit}>
				{testQuestions.map((question, index) => {
					return (
						<div key={index} className="input-group">
							<label>
								{question}
								<textarea type="text" className="form-control"></textarea>
							</label>
						</div>
					);
				})}
				<button type="submit">Submit</button>
			</form>
		</main>
	);
};

export default Questionnaire;
