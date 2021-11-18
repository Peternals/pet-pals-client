import React from "react";
import "../styles/owners/ownerHome.scss";
import { useSelector } from "react-redux";
const { REACT_APP_SERVER_URL } = process.env;

const UserProfile = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="profileContainer">
      <div className="profile">
        <div className="profile2">
          <figure>
            <img
              src={`${REACT_APP_SERVER_URL}/pic/${user.profile_picture}`}
              alt="profile"></img>
          </figure>
          <h2>{user.username}</h2>
          <div className="profileInfo">
            <p className="summaryTitle">Bio:</p>
            <p className="summary">{user.description}</p>
            <p className="summaryTitle">Email:</p>
            <p className="summary">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
