import { configureStore } from "@reduxjs/toolkit";
import messengerReducer from "./slicers/messengerSlice";
import userReducer from "./slicers/userSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		messenger: messengerReducer,
	},
});

export default store;
