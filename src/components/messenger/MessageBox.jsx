import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessageAction } from "../../slicers/messengerSlice";
import { socket } from "../../socket";
import axios from "axios";
import { getAllMessagesAction } from "../../slicers/actions/messageActions";

const MessageBox = () => {
	const [message, setMessage] = useState("");
	const [senderTyping, setSenderTyping] = useState(false);
	const dispatch = useDispatch();
	const messageList = useSelector((state) => state.messenger.messages);
	const currentConversation = useSelector(
		(state) => state.messenger.currentConversation
	);
	const currentChatUser = useSelector(
		(state) => state.messenger.currentChatUser
	);
	const scrollRef = useRef();
	const scrollRef2 = useRef();

	useEffect(() => {
		socket.on("receiveMessage", (data) => {
			if (currentChatUser._id === data.sender_id) {
				dispatch(addMessageAction(data));
			}
		});
		socket.on("senderTyping", (data) => {
			console.log(data);
			if (currentChatUser._id === data.sender_id) {
				setSenderTyping(data.current);
			}
		});
	}, [dispatch, currentChatUser]);
	useEffect(() => {
		if (currentConversation !== "") {
			dispatch(getAllMessagesAction(currentConversation));
		}
	}, [currentConversation, dispatch]);

	useEffect(() => {
		if (messageList.length > 0)
			scrollRef?.current.scrollIntoView({ behavior: "smooth" });
		if (senderTyping)
			scrollRef2?.current.scrollIntoView({ behavior: "smooth" });
	}, [messageList, senderTyping]);

	useEffect(() => {
		socket.emit("senderTyping", {
			current: message.length ? true : false,
			receiver_id: currentChatUser._id,
			sender_id: localStorage.getItem("pet"),
		});
	}, [message, currentChatUser]);

	const setMessageAction = (e) => {
		setMessage(e.target.value);
	};

	const sendMessageSubmit = async (e) => {
		e.preventDefault();
		try {
			if (message.length > 0) {
				const data = {
					text: message,
					receiver_id: currentChatUser._id,
					sender_id: localStorage.getItem("pet"),
				};
				await axios.post(`${process.env.REACT_APP_SERVER_URL}/messages`, {
					conversation_id: currentConversation,
					text: message,
					sender_id: localStorage.getItem("pet"),
				});
				socket.emit("sendMessage", data);
				dispatch(addMessageAction(data));

				setMessage("");
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<section className="messageBoxContainer">
			{/* <div className="messageBoxHeader">
				<h1>Message</h1>
			</div> */}
			<main className="messageBox">
				{currentConversation !== "" && (
					<>
						<section className="messages">
							{messageList?.map((msg, i) => (
								<div
									key={msg._id || i}
									className={
										msg.sender_id !== localStorage.getItem("pet")
											? "sender"
											: "receiver"
									}
									ref={scrollRef}>
									<p>{msg.text}</p>
								</div>
							))}
							{senderTyping && (
								<p ref={scrollRef2}>{currentChatUser.username} is typing...</p>
							)}
						</section>
						<form className="messageForm" onSubmit={sendMessageSubmit}>
							<textarea value={message} onChange={setMessageAction}></textarea>
							<input type="submit" value="send" />
						</form>
					</>
				)}
			</main>
		</section>
	);
};

export default MessageBox;
