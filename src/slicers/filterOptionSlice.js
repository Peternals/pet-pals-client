import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  size: [],
  type: [],
  petHealth: [],
  trained: [],
  playing: [],
};

const filterOptionSlice = createSlice({
  name: "filterOptions",
  initialState,
  reducers: {
    resetFilter: () => {
      return initialState;
    },
    addFilter: (state, action) => {
      const { key, value } = action.payload;
      state[key].push(value);
    },
    removeFilter: (state, action) => {
      const { key, value } = action.payload;
      state[key] = state[key].filter((val) => val !== value);
    },
  },
});

export const {
  resetFilter,
  addFilter,
  removeFilter,
} = filterOptionSlice.actions;
export default filterOptionSlice.reducer;
