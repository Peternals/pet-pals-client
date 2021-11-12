import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	startDate: null,
	endDate: null,
	focusedInput: null,
};

const datePickerSlice = createSlice({
	name: "datePicker",
	initialState,
	reducers: {
		updateDate: (state, action) => {
			state[action.payload.key] = action.payload.data;
		},
	},
});

export const { updateDate } = datePickerSlice.actions;
const dateReducer = datePickerSlice.reducer;
export default dateReducer;
