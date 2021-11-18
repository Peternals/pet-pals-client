import React from "react";
import UserProfile from "../components/UserProfile";
import "../styles/carer/profile.scss";
import UpcommingRequests from "../components/carer/UpcommingRequests";
import PendingRequests from "../components/carer/PendingRequests";

const CarerProfilePage = () => {
  return (
    <main className="profileMain">
      <UserProfile />
      <section className="requestSection">
        <UpcommingRequests />
        <PendingRequests />
      </section>
    </main>
  );
};

export default CarerProfilePage;
