import { configureStore } from "@reduxjs/toolkit";
import messengerReducer from "./slicers/messengerSlice";

const store = configureStore({
	reducer: {
		messenger: messengerReducer,
	},
});

export default store;
