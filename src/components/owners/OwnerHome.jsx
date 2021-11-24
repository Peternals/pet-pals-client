import React from "react";
import PetInfo from "./PetInfo";
import { Routes, Route } from "react-router-dom";
import Request from "./Request";
import UpdatePetInfo from "./UpdatePetInfo";
import UserProfile from "../UserProfile";

const OwnerHome = () => {
  return (
    <main className="owner">
      <UserProfile />
      <Routes>
        <Route exact path="/" element={<PetInfo />} />
        <Route exact path="/requests" element={<Request />} />
        <Route exact path="/pet-setting" element={<UpdatePetInfo />} />
      </Routes>
    </main>
  );
};

export default OwnerHome;
