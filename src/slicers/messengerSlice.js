import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
});

export const { addMessageAction, setCurrentChatAction } =
	messengerSlice.actions;
const messengerReducer = messengerSlice.reducer;

export default messengerReducer;
