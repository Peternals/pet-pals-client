import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import sample from "../../assets/sample.jpg";
import { setCurrentChatAction } from "../../slicers/messengerSlice";

const ContactCard = (props) => {
	const { conversation } = props;
	const [userInfo, setUserInfo] = useState({});
	const dispatch = useDispatch();
	const id = useSelector((state) => state.user._id);

	useEffect(() => {
		const receiver = conversation.members.filter((member) => member !== id);

		(async () => {
			try {
				const userRequest = await axios.get(
					`${process.env.REACT_APP_SERVER_URL}/user/${receiver}`
				);
				setUserInfo(userRequest.data);
			} catch (error) {
				console.log(error.response);
			}
		})();
	}, [conversation, id]);

	const setCurrentChat = () => {
		try {
			console.log(userInfo);
			dispatch(
				setCurrentChatAction({
					conversation: conversation._id,
					chatUser: userInfo,
				})
			);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<article className="contact" onClick={setCurrentChat}>
			<figure className="contactImg">
				<img src={sample} alt="user" />
			</figure>
			<div className="contactInfo">
				<div className="contactName">
					<p>{userInfo.username}</p>
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
