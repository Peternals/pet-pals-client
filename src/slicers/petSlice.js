import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

const initialState = {
  type: null,
  name: null,
  description: null,
  pet_picture: null,
  pet_questions: null,
};

export const petDataStore = createAsyncThunk(
  "pet/signUp",
  async (petDataInput) => {
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER_URL}/pet/`,
        petDataInput
      );
      return response.data;
    } catch (err) {
      return { err: err.response.data };
    }
  }
);

export const petQuestionStore = createAsyncThunk(
  "pet/questions",
  async (petDataInput, pet_Id) => {
    try {
      const response = await axios.patch(
        `${REACT_APP_SERVER_URL}/pet/${pet_Id}`,
        petDataInput
      );
      return response.data;
    } catch (err) {
      return { err: err.response.data };
    }
  }
);

export const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {
    getPetType: (state, action) => {
      state.type = action.payload;
    },
    getPetName: (state, action) => {
      state.name = action.payload;
    },
    getPetDescription: (state, action) => {
      state.description = action.payload;
    },
    getPetPicture: (state, action) => {
      state.pet_picture = action.payload;
    },
    getPetQuestions: (state, action) => {
      state.pet_questions = action.payload;
    },
  },
});

export const {
  getPetType,
  getPetName,
  getPetDescription,
  getPetPicture,
  getPetQuestions,
} = petSlice.actions;
export default petSlice.reducer;
