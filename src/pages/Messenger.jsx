import React from "react";
import Contacts from "../components/messenger/Contacts";
import MessageBox from "../components/messenger/MessageBox";
import "../styles/messenger/messenger.scss";

const Messenger = () => {
	return (
		<main className="messengerPage">
			<div className="messengerContainer">
				<div className="messengerHeader">
					<div className="contactListHeader">
						<h1>Contact</h1>
					</div>
					<div className="messageBoxHeader">
						<h1>Message</h1>
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
