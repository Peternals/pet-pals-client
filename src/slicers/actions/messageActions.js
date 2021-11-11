import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;
export const getConversationsAction = createAsyncThunk(
	"messenger/getConversationsAction",
	async () => {
		try {
			const conversations = await axios.get(
				`${REACT_APP_SERVER_URL}/messages/conversations`
			);
			return conversations.data;
		} catch (error) {
			console.log(error);
		}
	}
);
