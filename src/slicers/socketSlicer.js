import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const initialState = {
	socket: io("ws://localhost:4000"),
};

const socketSlicer = createSlice({
	name: "socket",
	initialState,
	reducers: {
		connectSocketAction: (state) => {
			state.socket = io("ws://localhost:4000");
		},
	},
});

export const { connectSocketAction } = socketSlicer.actions;
const socketReducer = socketSlicer.reducer;
export default socketReducer;
