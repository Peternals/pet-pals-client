import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_SERVER_URL } = process.env;
export const verifyTokenAction = createAsyncThunk(
  "user/verifyTokenAction",
  async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const action = await axios.get(`${REACT_APP_SERVER_URL}/auth`, {
          headers: {
            "x-access-token": token,
          },
        });
        return action.data;
      } else {
        //not logged in
        return { err: "token not available" };
      }
    } catch (error) {
      console.log(error);
      //something wrong with token
      return { err: error.response.data };
    }
  }
);

export const getOwnerRequest = createAsyncThunk(
  "user/getOwnerRequest",
  async () => {
    try {
      const request = await axios.get(
        `${REACT_APP_SERVER_URL}/requests/owner/Pending`,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      return request.data;
    } catch (error) {
      console.log(error);
    }
  }
);
