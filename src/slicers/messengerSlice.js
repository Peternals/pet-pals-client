import { createSlice } from "@reduxjs/toolkit";
import { getConversationsAction } from "./actions/messageActions";

const initialState = {
	pending: false,
	messages: [],
	conversations: [],
	currentChat: "",
};

const messengerSlice = createSlice({
	name: "messenger",
	initialState,
	reducers: {
		addMessageAction: (state, action) => {
			state.messages.push(action.payload);
		},

		setCurrentChatAction: (state, action) => {
			state.currentChat = action.payload;
		},
	},
	extraReducers: {
		[getConversationsAction.pending]: (state) => {
			state.pending = false;
		},
		[getConversationsAction.fulfilled]: (state, action) => {
			state.conversations = action.payload;
		},
	},
});

export const { addMessageAction, setCurrentChatAction } =
	messengerSlice.actions;
const messengerReducer = messengerSlice.reducer;

export default messengerReducer;
