import React from "react";
import "../styles/update.scss";
import { updateUserInfo } from "../slicers/userSlice";
import { useDispatch, useSelector } from "react-redux";

const UpdateUserInfo = () => {
  return (
    <main style={{ marginTop: 200 }}>
      <h1>Update user info</h1>
      <div className="update">
        <form>
          {/* <input type="text" placeholder="username" />
          <input type="text" placeholder="email" />
          <input type="password" placeholder="password" /> */}
          <input type="type" placeholder="Bio" />
          {/* <input type="file" placeholder="profile picture" /> */}
        </form>
      </div>
    </main>
  );
};

export default UpdateUserInfo;
