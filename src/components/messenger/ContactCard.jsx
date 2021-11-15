import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
	setCurrentChatAction,
	setSeenStateAction,
} from "../../slicers/messengerSlice";
import moment from "moment";
const { REACT_APP_SERVER_URL } = process.env;

const ContactCard = (props) => {
	const { conversation } = props;
	const [userInfo, setUserInfo] = useState({});
	const [lastMsg, setLastMsg] = useState("");
	const dispatch = useDispatch();
	const id = useSelector((state) => state.user._id);
	const currentChatUser = useSelector(
		(state) => state.messenger.currentChatUser
	);

	useEffect(() => {
		const receiver = conversation.members.filter((member) => member !== id);

		(async () => {
			try {
				if (receiver.length === 1) {
					const userRequest = await axios.get(
						`${process.env.REACT_APP_SERVER_URL}/user/${receiver[0]}`
					);
					setUserInfo(userRequest.data);
					const lastMsgrequest = await axios.get(
						`${process.env.REACT_APP_SERVER_URL}/messages/last/${conversation._id}`,
						{
							headers: {
								"x-access-token": localStorage.getItem("token"),
							},
						}
					);
					setLastMsg(lastMsgrequest.data);
				}
			} catch (error) {
				console.log(error.response);
			}
		})();
	}, [conversation, id]);

	const setCurrentChat = () => {
		try {
			dispatch(
				setCurrentChatAction({
					conversation: conversation._id,
					chatUser: userInfo,
				})
			);
			dispatch(
				setSeenStateAction({
					conversation_id: conversation._id,
					user_id: id,
				})
			);

			document
				.querySelector(".messageBoxContainer")
				.classList.remove("hideMessenger");
			document
				.querySelector(".contactsListContainer")
				.classList.add("hideMessenger");

			document
				.querySelector(".messageBoxHeader")
				.classList.remove("hideHeader");
			document.querySelector(".contactListHeader").classList.add("hideHeader");
		} catch (error) {
			console.log(error);
		}
	};

	const checkSeen = () => {
		console.log(conversation);
		const seen = conversation.seen.find((seen) => seen.userId === id);
		return `contact ${userInfo._id === currentChatUser._id && `current`} ${
			!seen.state && "notSeen"
		}`;
	};

	return (
		<article className={checkSeen()} onClick={setCurrentChat}>
			<div className="imgContainer">
				<figure className="contactImg">
					<img
						src={
							userInfo.profile_picture
								? `${REACT_APP_SERVER_URL}/pic/${userInfo.profile_picture}`
								: ""
						}
						alt="user"
					/>
				</figure>
			</div>
			<div className="contactInfo">
				<div className="contactName">
					<p className="username">{userInfo.username}</p>
					<p>{moment(conversation.updatedAt).fromNow()}</p>
				</div>
				<div className="contactMessageSummary">
					<p>{lastMsg}</p>
				</div>
			</div>
		</article>
	);
};

export default ContactCard;
