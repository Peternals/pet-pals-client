import React from "react";

import PetInfo from "./PetInfo";
import { Routes, Route } from "react-router-dom";
import Request from "./Request";
import UserProfile from "../UserProfile";
import FilterTagSection from "../FilterTagSection";

const OwnerHome = () => {
  return (
    <main className="owner">
      <UserProfile />
      <FilterTagSection />
      <Routes>
        <Route exact path="/" element={<PetInfo />} />
        <Route exact path="/requests" element={<Request />} />
      </Routes>
    </main>
  );
};

export default OwnerHome;
