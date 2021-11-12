import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import dateReducer from "./slicers/datePickerSlice";
import messengerReducer from "./slicers/messengerSlice";

const store = configureStore({
	reducer: {
		messenger: messengerReducer,
		datePicker: dateReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
