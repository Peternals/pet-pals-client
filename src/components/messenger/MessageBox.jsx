import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessageAction } from "../../slicers/messengerSlice";
import { socket } from "../../socket";

const MessageBox = () => {
	const [message, setMessage] = useState("");
	const [senderTyping, setSenderTyping] = useState(false);
	const dispatch = useDispatch();
	const messageList = useSelector((state) => state.messenger.messages);
	const currentChat = useSelector((state) => state.messenger.currentChat);
	const scrollRef = useRef();

	useEffect(() => {
		socket.on("receiveMessage", (data) => {
			dispatch(addMessageAction(data));
		});
		socket.on("senderTyping", (data) => {
			setSenderTyping(data.current);
		});
	}, [dispatch]);

	useEffect(() => {
		if (messageList.length > 0)
			scrollRef?.current.scrollIntoView({ behavior: "smooth" });
	}, [messageList]);

	useEffect(() => {
		socket.emit("senderTyping", {
			current: message.length ? true : false,
			receiver_id: localStorage.getItem("pet2"),
		});
	}, [message]);

	const setMessageAction = (e) => {
		setMessage(e.target.value);
	};

	const sendMessageSubmit = async (e) => {
		e.preventDefault();
		try {
			if (message.length > 0) {
				const data = {
					message,
					receiver_id: localStorage.getItem("pet2"),
				};
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
			<div className="messageBoxHeader">
				<h1>Message</h1>
			</div>
			<main className="messageBox">
				{currentChat !== "" && (
					<>
						<section className="messages">
							{messageList?.map((msg, i) => (
								<div
									className={i % 2 === 0 ? "receiver" : "sender"}
									ref={scrollRef}>
									<p>{msg.message}</p>
								</div>
							))}
							{senderTyping && <p>yu is typing...</p>}
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
