import React from "react";

const MessageBox = () => {
	return (
		<section className="messageBoxContainer">
			<div className="messageBoxHeader">
				<h1>Message</h1>
			</div>
			<main className="messageBox">
				<section className="messages">
					<div className="receiver">
						<p>
							Deserunt est ad laboris sint. Do elit ipsum elit duis. Ut enim id
							laboris aute irure. Aute labore et adipisicing nisi ut mollit
							irure non incididunt nulla duis duis laboris.
						</p>
					</div>

					<div className="sender">
						<p>
							Deserunt est ad laboris sint. Do elit ipsum elit duis. Ut enim id
							laboris aute irure. Aute labore et adipisicing nisi ut mollit
							irure non incididunt nulla duis duis laboris.
						</p>
					</div>
				</section>
				<form className="messageForm">
					<textarea></textarea>
					<input type="submit" value="send" />
				</form>
			</main>
		</section>
	);
};

export default MessageBox;
