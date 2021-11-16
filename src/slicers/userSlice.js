import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { verifyTokenAction } from "./actions/userAction";
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

export const updateUserInfo = createAsyncThunk(
  "user/update",
  async ({ _id, data }) => {
    try {
      const response = await axios.patch(
        `${REACT_APP_SERVER_URL}/user/${_id}`,
        { _id, data }
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
			}
		},
		[verifyTokenAction.fulfilled]: (state, action) => {
			return {
				...state,
				...action.payload,
				isLoggedIn: "err" in action.payload ? false : true,
			};
		},
		[updateUserInfo.fulfilled]: (state, action) => {
      if (!action.payload.err) {
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.description = action.payload.description;
        state.profile_picture = action.payload.profile_picture;
      }
    },
	},
});

export const {
  getUserName,
  getDescription,
  getProfilePicture,
  getType,
  signOutCleanUp,
} = userSlice.actions;
export default userSlice.reducer;
