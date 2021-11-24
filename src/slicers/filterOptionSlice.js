import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

const initialState = {
  tags: [],
  allPets: [],
  filteredPets: [],
  isFiltered: false,
};

export const fetchAllPets = createAsyncThunk("pet/fetchPets", async () => {
  try {
    const token = localStorage.getItem("token");
    const { data: response } = await axios.get(`${REACT_APP_SERVER_URL}/pet`, {
      headers: {
        "x-access-token": token,
      },
    });
    return response;
  } catch (err) {
    return { err: err.response.data };
  }
});

export const defaultFetchPetsByTag = createAsyncThunk(
  "pet/defaultFetchPetsByTag",
  async (tags) => {
    try {
      const token = localStorage.getItem("token");
      const { data: response } = await axios.get(
        `${REACT_APP_SERVER_URL}/pet/tag/single?name=[${tags.map(
          (tag) => `"${tag}"`
        )}]`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      return response;
    } catch (err) {
      return { err: err.response.data };
    }
  }
);

export const fetchPetsByTag = createAsyncThunk(
  "pet/fetchPetsByTag",
  async (tags) => {
    try {
      const token = localStorage.getItem("token");
      const { data: response } = await axios.get(
        `${REACT_APP_SERVER_URL}/pet/tag/all?value=[${tags.map(
          (tag) => `"${tag}"`
        )}]`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      return response;
    } catch (err) {
      return { err: err.response.data };
    }
  }
);

const filterOptionSlice = createSlice({
  name: "filterOptions",
  initialState,
  reducers: {
    clearFilteredPets: (state) => {
      state.filteredPets = [];
    },
    resetFilter: (state, action) => {
      state.tags = [];
      state.isFiltered = true;
    },
    addFilter: (state, action) => {
      const added = action.payload;
      state.tags.push(added);
    },
    removeFilter: (state, action) => {
      const removed = action.payload;
      state.tags.splice(state.tags.indexOf(removed), 1);
    },
  },
  extraReducers: {
    [fetchAllPets.fulfilled]: (state, action) => {
      state.allPets = action.payload;
      state.isFiltered = false;
    },
    [defaultFetchPetsByTag.fulfilled]: (state, action) => {
      state.filteredPets = action.payload;
      state.isFiltered = true;
    },
    [fetchPetsByTag.fulfilled]: (state, action) => {
      state.filteredPets = action.payload;
      state.isFiltered = true;
    },
  },
});

export const {
  clearFilteredPets,
  resetFilter,
  addFilter,
  removeFilter,
} = filterOptionSlice.actions;
export default filterOptionSlice.reducer;
