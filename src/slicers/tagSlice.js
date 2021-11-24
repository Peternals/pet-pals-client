import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

const initialState = {
  allTags: [],
  options: [],
};

export const getAllTags = createAsyncThunk("tag/getAllTags", async () => {
  try {
    const action = await axios.get(`${REACT_APP_SERVER_URL}/tag`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    return action.data;
  } catch (error) {
    console.log(error);
  }
});

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    mapOptionsFromTags: (state) => {
      state.options = state.allTags.map((tag) => {
        return {
          value: tag.value,
          label: tag.value,
        };
      });
    },
  },
  extraReducers: {
    [getAllTags.fulfilled]: (state, action) => {
      state.allTags = action.payload;
    },
  },
});

export const { mapOptionsFromTags } = tagSlice.actions;
export default tagSlice.reducer;
