import React from "react";

const Contacts = () => {
	return (
		<section className="contactsListContainer">
			<div className="contactListHeader">
				<h1>Contacts</h1>
			</div>
			<div className="contactList">
				<article className="contact">
					<figure className="contactImg"></figure>
					<content className="contactInfo">
						<div className="contactName">
							<p>Yu Takaki</p>
							<p>3 hrs ago</p>
						</div>
						<div className="contactMessageSummary">
							<p>Hello my name is you</p>
						</div>
					</content>
				</article>
			</div>
		</section>
	);
};

export default Contacts;
