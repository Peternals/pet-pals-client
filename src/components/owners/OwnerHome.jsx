import React from "react";
import "../../styles/owners/ownerHome.scss";
import PetInfo from "./PetInfo";
import { Routes, Route } from "react-router-dom";
import Request from "./Request";
import { useSelector } from "react-redux";
import UpdatePetInfo from "./UpdatePetInfo";
const { REACT_APP_SERVER_URL } = process.env;

const OwnerHome = () => {
  const user = useSelector((state) => state.user);

  return (
    <main className="owner">
      <div className="profileContainer">
        <div className="profile">
          <div className="profile2">
            <figure>
              <img
                src={`${REACT_APP_SERVER_URL}/pic/${user.profile_picture}`}
                alt="profile"
              ></img>
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
      <Routes>
        <Route exact path="/" element={<PetInfo />} />
        <Route exact path="/requests" element={<Request />} />
        <Route exact path="/pet-setting" element={<UpdatePetInfo />} />
      </Routes>
    </main>
  );
};

export default OwnerHome;
