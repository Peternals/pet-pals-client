import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getOwnerRequest, verifyTokenAction } from "./actions/userAction";
const { REACT_APP_SERVER_URL } = process.env;

const initialState = {
  isLoggedIn: null,
  isSuccess: false,
  username: null,
  email: null,
  password: null,
  description: null,
  profile_picture: null,
  type: null,
  _id: null,
  Carer: null,
  interests: [],
  ownerRequests: [],
};

export const validation = createAsyncThunk(
  "signUp/validate",
  async (firstInfo) => {
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER_URL}/auth/validation`,
        firstInfo
      );
      return response.data;
    } catch (err) {
      return { err: err.response.data };
    }
  }
);

export const signUp = createAsyncThunk("auth/signUp", async (signUpInput) => {
  try {
    const response = await axios.post(
      `${REACT_APP_SERVER_URL}/auth/sign-up`,
      signUpInput
    );
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (err) {
    return { err: err.response.data };
  }
});

export const signIn = createAsyncThunk("auth/signIn", async (signInInput) => {
  try {
    const response = await axios.post(
      `${REACT_APP_SERVER_URL}/auth/sign-in`,
      signInInput
    );
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (err) {
    return { err: err.response.data };
  }
});

export const fetchUserInfo = createAsyncThunk("user/fetch", async (_id) => {
  try {
    const response = await axios.get(`${REACT_APP_SERVER_URL}/user/${_id}`);
    return response.data;
  } catch (err) {
    return { err: err.response.data };
  }
});

export const updateUserInfo = createAsyncThunk(
  "user/update",
  async ({ _id, updateData }) => {
    try {
      const response = await axios.patch(
        `${REACT_APP_SERVER_URL}/user/${_id}`,
        { _id, updateData }
      );
      return response.data;
    } catch (err) {
      return { err: err.response.data };
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getType: (state, action) => {
      state.type = action.payload;
    },
    getUserName: (state, action) => {
      state.username = action.payload.username;
    },
    getDescription: (state, action) => {
      state.description = action.payload.description;
    },
    getProfilePicture: (state, action) => {
      state.profile_picture = action.payload.profile_picture;
    },
    updateRequest: (state, action) => {
      const reqId = action.payload._id;

      let filter;
      if (state.Carer.requests.length > 0) {
        filter = state.Carer.requests.filter((req) => req._id !== reqId);
      } else {
        filter = [];
      }
      state.Carer.requests = [...filter, action.payload];
    },
    signOutCleanUp: (state) => {
      state.isLoggedIn = false;
      state.isSuccess = false;
      state.username = null;
      state.email = null;
      state.password = null;
      state.description = null;
      state.profile_picture = null;
      state.type = null;
      state._id = null;
      state.Carer = null;
      state.ownerRequests = [];
      state.interests = [];
    },
    setRequestSeenState: (state) => {
      console.log("hello");
      if (state.Carer && state.Carer.requests.length > 0) {
        state.Carer.requests = state.Carer.requests.map((req) => {
          req.seen = true;
          return req;
        });
      }
    },
  },
  extraReducers: {
    [validation.fulfilled]: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    [signUp.fulfilled]: (state, action) => {
      if (action.payload.user) {
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.password = null;
        state.username = action.payload.user.username;
        state.email = action.payload.user.email;
        state.description = action.payload.user.description;
        state.profile_picture = action.payload.user.profile_picture;
        state.type = action.payload.user.type;
        state._id = action.payload.user._id;
        state.Carer = action.payload.user.Carer;
        state.interests = action.payload.user.interests;
      }
    },
    [signIn.fulfilled]: (state, action) => {
      if (action.payload.user) {
        state.isLoggedIn = true;
        state.username = action.payload.user.username;
        state.email = action.payload.user.email;
        state.description = action.payload.user.description;
        state.profile_picture = action.payload.user.profile_picture;
        state.type = action.payload.user.type;
        state._id = action.payload.user._id;
        state.Carer = action.payload.user.Carer;
        state.interests = action.payload.user.interests;
      }
    },
    [verifyTokenAction.fulfilled]: (state, action) => {
      return {
        ...state,
        ...action.payload,
        isLoggedIn: "err" in action.payload ? false : true,
      };
    },
    [fetchUserInfo.fulfilled]: (state, action) => {
      state.interests = action.payload.interests;
    },
    [updateUserInfo.fulfilled]: (state, action) => {
      if (!action.payload.err) {
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.description = action.payload.description;
        state.profile_picture = action.payload.profile_picture;
        state.interests = action.payload.interests;
      }
    },
    [getOwnerRequest.fulfilled]: (state, action) => {
      state.ownerRequests = action.payload;
    },
  },
});

export const {
  getUserName,
  getDescription,
  getProfilePicture,
  getType,
  signOutCleanUp,
  updateRequest,
  setRequestSeenState,
} = userSlice.actions;
export default userSlice.reducer;
