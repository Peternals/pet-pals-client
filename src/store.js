import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "./slicers/socketSlicer";

const store = configureStore({
	reducer: {
		socket: socketReducer,
	},
});

export default store;
