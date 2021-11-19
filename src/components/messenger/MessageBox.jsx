import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessageAction } from "../../slicers/messengerSlice";
import { socket } from "../../socket";
import axios from "axios";
import {
  getAllMessagesAction,
  getConversationsAction,
} from "../../slicers/actions/messageActions";
import moment from "moment";

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
  const id = useSelector((state) => state.user._id);
  const scrollRef = useRef();
  const scrollRef2 = useRef();

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      dispatch(getConversationsAction());
      if (currentChatUser._id === data.sender_id) {
        dispatch(addMessageAction(data));
      }
    });
    socket.on("senderTyping", (data) => {
      if (currentChatUser._id === data.sender_id) {
        setSenderTyping(data.current);
      }
    });
    return () => {
      socket.off("receiveMessage");
      socket.off("senderTyping");
    };
  }, [dispatch, currentChatUser]);
  useEffect(() => {
    if (currentConversation !== "") {
      dispatch(getAllMessagesAction(currentConversation));
    }
  }, [currentConversation, dispatch]);

  useEffect(() => {
    if (messageList.length > 0) scrollRef?.current.scrollIntoView();
    if (senderTyping) scrollRef2?.current.scrollIntoView();
  }, [messageList, senderTyping]);

  useEffect(() => {
    socket.emit("senderTyping", {
      current: message.length ? true : false,
      receiver_id: currentChatUser._id,
      sender_id: id,
    });
  }, [message, currentChatUser, id]);

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
          sender_id: id,
        };
        await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/messages`,
          {
            conversation_id: currentConversation,
            text: message,
            sender_id: id,
            receiver_id: currentChatUser._id,
          },
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        );
        socket.emit("sendMessage", data);
        await dispatch(addMessageAction(data));
        await dispatch(getConversationsAction());
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="messageBoxContainer hideMessenger">
      <main className="messageBox">
        {currentConversation !== "" && (
          <>
            <section className="messages">
              {messageList?.map((msg, i) => (
                <div
                  key={msg._id || i}
                  className={msg.sender_id !== id ? "sender" : "receiver"}
                  ref={scrollRef}>
                  <p className="msgBody">{msg.text}</p>
                  <p className="date">{moment(msg.createdAt).fromNow()}</p>
                </div>
              ))}
              {senderTyping && (
                <p ref={scrollRef2}>{currentChatUser.username} is typing...</p>
              )}
            </section>
            <form className="messageForm" onSubmit={sendMessageSubmit}>
              <textarea
                placeholder="message..."
                value={message}
                onChange={setMessageAction}></textarea>
              <input type="submit" value="send" />
            </form>
          </>
        )}
      </main>
    </section>
  );
};

export default MessageBox;
