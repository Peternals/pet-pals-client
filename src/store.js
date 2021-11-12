import { configureStore } from "@reduxjs/toolkit";
import dateReducer from "./slicers/datePickerSlice";
import messengerReducer from "./slicers/messengerSlice";
import userReducer from "./slicers/userSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		messenger: messengerReducer,
		datePicker: dateReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
