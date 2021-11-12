import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

export const getConversationsAction = createAsyncThunk(
	"messenger/getConversationsAction",
	async () => {
		try {
			const conversations = await axios.get(
				`${REACT_APP_SERVER_URL}/messages/conversations`,
				{
					headers: {
						"x-access-token": localStorage.getItem("token"),
					},
				}
			);
			return conversations.data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const getAllMessagesAction = createAsyncThunk(
	"messenger/getAllMessagesAction",
	async (conversation_id) => {
		try {
			const messages = await axios.get(
				`${REACT_APP_SERVER_URL}/messages/${conversation_id}`
			);

			return messages.data;
		} catch (error) {
			console.log(error);
		}
	}
);
