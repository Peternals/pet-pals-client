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
    _id: null,
    tag: [],
  },
  pet_questions: [],
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

// Just in case, will keep this codes
// export const petQuestionStore = createAsyncThunk(
//   "pet/questions",
//   async (petDataInput) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.patch(
//         `${REACT_APP_SERVER_URL}/pet/${petDataInput.pet_id}`,
//         petDataInput.questionnaire,
//         {
//           headers: {
//             "x-access-token": token,
//           },
//         }
//       );
//       return response.data;
//     } catch (err) {
//       return { err: err.response.data };
//     }
//   }
// );

export const deleteQuestion = createAsyncThunk(
  "pet/deleteQuestion",
  async (data) => {
    try {
      console.log(data);
      console.log(data._id);
      console.log(data.questionnaire);
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${REACT_APP_SERVER_URL}/pet/${data._id}/question`,
        data.questionnaire,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      return { err: err.response.data };
    }
  }
);

export const getPetInfo = createAsyncThunk("pet/getInfo", async () => {
  try {
    const token = localStorage.getItem("token");
    const pet = await axios.get(`${REACT_APP_SERVER_URL}/pet/owner`, {
      headers: {
        "x-access-token": token,
      },
    });
    console.log(pet.data);
    return pet.data;
  } catch (err) {
    return { err: err.response.data };
  }
});

export const updatePetInfo = createAsyncThunk("pet/update", async (data) => {
  try {
    console.log(data);
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `${REACT_APP_SERVER_URL}/pet/${data._id}`,
      data,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    return { err: err.response.data };
  }
});

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
    getPetTag: (state, action) => {
      state.info.tag = action.payload;
    },
    signOutPetCleanUp: (state) => {
      state.info.type = null;
      state.info.name = null;
      state.info.owner_id = null;
      state.info.description = null;
      state.info.pet_pictures = [];
      state.info._id = null;
      state.pet_questions = [];
    },
  },
  extraReducers: {
    [petDataStore.fulfilled]: (state, action) => {
      state.info.owner_id = action.payload.owner_id;
      state.info._id = action.payload._id;
      state.pet_questions = action.payload.questionnaire;
    },
    [getPetInfo.fulfilled]: (state, action) => {
      state.info.type = action.payload.type;
      state.info.name = action.payload.name;
      state.info.owner_id = action.payload.owner_id;
      state.info.description = action.payload.description;
      state.info.pet_pictures = action.payload.pet_pictures;
      state.info._id = action.payload._id;
      state.pet_questions = action.payload.questionnaire;
    },
    [updatePetInfo.fulfilled]: (state, action) => {
      if (!action.payload.err) {
        state.info.name = action.payload.name;
        state.info.description = action.payload.description;
        state.pet_questions = action.payload.questionnaire;

        if (action.payload.pet_pictures !== undefined) {
          state.info.pet_pictures = [
            ...state.info.pet_pictures,
            ...action.payload.pet_pictures,
          ];
        }
      }
    },
    [deleteQuestion.fulfilled]: (state, action) => {
      state.pet_questions = action.payload.questionnaire;
    },
  },
});

export const {
  getPetType,
  getPetName,
  getPetDescription,
  getPetPicture,
  getPetQuestions,
  getPetTag,
  signOutPetCleanUp,
} = petSlice.actions;
export default petSlice.reducer;
