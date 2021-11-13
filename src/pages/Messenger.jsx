import React from "react";
import Contacts from "../components/messenger/Contacts";
import MessageBox from "../components/messenger/MessageBox";
import "../styles/messenger/messenger.scss";

const Messenger = () => {
	const closeMessengerBox = () => {
		document
			.querySelector(".messageBoxContainer")
			.classList.add("hideMessenger");
		document
			.querySelector(".contactsListContainer")
			.classList.remove("hideMessenger");

		document.querySelector(".messageBoxHeader").classList.add("hideHeader");
		document.querySelector(".contactListHeader").classList.remove("hideHeader");
	};
	return (
		<main className="messengerPage">
			<div className="messengerContainer">
				<div className="messengerHeader">
					<div className="contactListHeader">
						<h2>Contact</h2>
					</div>
					<div className="messageBoxHeader hideHeader">
						<i className="fa fa-angle-left" onClick={closeMessengerBox}></i>
						<h2>Message</h2>
					</div>
				</div>
				<section className="messengerContent">
					<Contacts />
					<MessageBox />
				</section>
			</div>
		</main>
	);
};

export default Messenger;
