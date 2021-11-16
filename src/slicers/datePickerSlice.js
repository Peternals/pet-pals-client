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
		signOutDateCleanUp: (state) => {
			state.startDate = null;
			state.endDate = null;
			state.focusedInput = null;
		}
	},
});

export const { updateDate, signOutDateCleanUp } = datePickerSlice.actions;
const dateReducer = datePickerSlice.reducer;
export default dateReducer;
