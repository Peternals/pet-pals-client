import { createSlice } from "@reduxjs/toolkit";
import {
	getAllMessagesAction,
	getConversationsAction,
} from "./actions/messageActions";

const initialState = {
	pending: false,
	messages: [],
	conversations: [],
	currentConversation: "",
	currentChatUser: "",
};

const messengerSlice = createSlice({
	name: "messenger",
	initialState,
	reducers: {
		addMessageAction: (state, action) => {
			state.messages.push(action.payload);
		},

		setCurrentChatAction: (state, action) => {
			state.currentConversation = action.payload.conversation;
			state.currentChatUser = action.payload.chatUser;
		},
	},
	extraReducers: {
		[getConversationsAction.pending]: (state) => {
			state.pending = true;
		},
		[getConversationsAction.fulfilled]: (state, action) => {
			state.conversations = action.payload;
			state.pending = false;
		},
		[getAllMessagesAction.pending]: (state) => {
			state.pending = true;
		},
		[getAllMessagesAction.fulfilled]: (state, action) => {
			state.messages = action.payload;
		},
	},
});

export const { addMessageAction, setCurrentChatAction } =
	messengerSlice.actions;
const messengerReducer = messengerSlice.reducer;

export default messengerReducer;
