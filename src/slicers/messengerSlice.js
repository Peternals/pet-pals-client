import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	messages: [],
};

const messengerSlice = createSlice({
	name: "messenger",
	initialState,
	reducers: {
		addMessageAction: (state, action) => {
			state.messages.push(action.payload);
		},
	},
});

export const { addMessageAction } = messengerSlice.actions;
const messengerReducer = messengerSlice.reducer;

export default messengerReducer;
