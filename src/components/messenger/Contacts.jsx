import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversationsAction } from "../../slicers/actions/messageActions";
import ContactCard from "./ContactCard";
import sample from "../../assets/sample.jpg";

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
				{[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => (
					<article className="contact">
						<figure className="contactImg">
							<img src={sample} alt="user" />
						</figure>
						<div className="contactInfo">
							<div className="contactName">
								<p>Yu Takkai</p>
								<p>3 hrs ago</p>
							</div>
							<div className="contactMessageSummary">
								<p>Hello my name is you</p>
							</div>
						</div>
					</article>
				))}
			</div>
		</section>
	);
};

export default Contacts;
