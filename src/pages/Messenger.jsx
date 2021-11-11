import React from "react";
import Contacts from "../components/messenger/Contacts";
import MessageBox from "../components/messenger/MessageBox";
import "../styles/messenger/messenger.scss";

const Messenger = () => {
	return (
		<main className="messengerPage">
			<div className="messengerContainer">
				<Contacts />
				<MessageBox />
			</div>
		</main>
	);
};

export default Messenger;
