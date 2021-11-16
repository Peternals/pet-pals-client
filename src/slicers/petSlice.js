import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

const initialState = {
  info: {
    type: null,
    name: null,
    owner_id: null,
    description: null,
    pet_pictures: [],
  },
  pet_questions: [],
  initialPets: [],
  filteredPets: [],
  isFiltered: false,
};

export const petDataStore = createAsyncThunk(
  "pet/signUp",
  async (petDataInput) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${REACT_APP_SERVER_URL}/pet/`,
        petDataInput,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      return response.data;
    } catch (err) {
      return { err: err.response.data };
    }
  }
);

export const petQuestionStore = createAsyncThunk(
  "pet/questions",
  async (petDataInput) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${REACT_APP_SERVER_URL}/pet/${petDataInput.pet_id}`,
        petDataInput.questionnaire,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      return response.data;
    } catch (err) {
      return { err: err.response.data };
    }
  }
);

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

export const fetchPetsByType = createAsyncThunk(
  "pet/fetchPetsByType",
  async (type) => {
    try {
      const token = localStorage.getItem("token");
      const { data: response } = await axios.get(
        `${REACT_APP_SERVER_URL}/pet/type/${type}`,
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

export const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {
    getPetType: (state, action) => {
      state.info.type = action.payload;
    },
    getPetName: (state, action) => {
      state.info.name = action.payload;
    },
    getPetDescription: (state, action) => {
      state.info.description = action.payload;
    },
    getPetPicture: (state, action) => {
      state.info.pet_pictures = action.payload;
    },
    getPetQuestions: (state, action) => {
      state.pet_questions = action.payload;
    },

    getOwnerId: (state, action) => {
      state.info.owner_id = action.payload;
    },
    resetFilter: (state, action) => {
      state.filteredPets = state.initialPets;
      state.isFiltered = false;
    },
    signOutPetCleanUp: (state) => {
			state.info.type = null;
			state.info.name = null;
			state.info.owner_id = null;
			state.info.description = null;
			state.info.pet_pictures = [];
      state.pet_questions = [];
      state.initialPets = [];
      state.filteredPets = [];
      state.isFiltered = false;
		},
  },
  extraReducers: {
    [petDataStore.fulfilled]: (state, action) => {
      state.owner_id = action.payload.owner_id;
    },
    [fetchAllPets.fulfilled]: (state, action) => {
      state.initialPets = action.payload;
      state.isFiltered = false;
    },
    [fetchPetsByType.fulfilled]: (state, action) => {
      state.filteredPets = action.payload;
      state.isFiltered = true;
    },
  },
});

export const {
  getPetType,
  getPetName,
  getPetDescription,
  getPetPicture,
  getPetQuestions,
  resetFilter,
  signOutPetCleanUp,
} = petSlice.actions;
export default petSlice.reducer;
