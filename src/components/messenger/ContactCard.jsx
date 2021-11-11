import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCurrentChatAction } from "../../slicers/messengerSlice";

const ContactCard = (props) => {
	const { conversation } = props;
	const [userinfo, setUserInfo] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		const receiver = conversation.members.filter(
			(member) => member !== localStorage.getItem("pet")
		);

		(async () => {
			try {
				const userRequest = await axios.get(
					`${process.env.REACT_APP_SERVER_URL}/users/${receiver}`
				);
				setUserInfo(userRequest.data);
			} catch (error) {
				console.log(error.response);
			}
		})();
	}, [conversation]);

	const setCurrentChat = () => {
		try {
			dispatch(
				setCurrentChatAction({
					conversation: conversation._id,
					chatUser: userinfo._id,
				})
			);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<article className="contact" onClick={setCurrentChat}>
			<figure className="contactImg"></figure>
			<div className="contactInfo">
				<div className="contactName">
					<p>{userinfo.username}</p>
					<p>3 hrs ago</p>
				</div>
				<div className="contactMessageSummary">
					<p>Hello my name is you</p>
				</div>
			</div>
		</article>
	);
};

export default ContactCard;
