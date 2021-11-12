import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversationsAction } from "../../slicers/actions/messageActions";
import ContactCard from "./ContactCard";

const Contacts = () => {
	const dispatch = useDispatch();
	const conversations = useSelector((state) => state.messenger.conversations);
	useEffect(() => {
		dispatch(getConversationsAction());
	}, [dispatch]);
	return (
		<section className="contactsListContainer">
			{/* <div className="contactListHeader">
				<h1>Contacts</h1>
			</div> */}
			<div className="contactList">
				{conversations.map((conv) => (
					<ContactCard key={conv._id} conversation={conv} />
				))}
			</div>
		</section>
	);
};

export default Contacts;
