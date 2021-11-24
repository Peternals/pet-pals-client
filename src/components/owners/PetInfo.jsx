import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { useSelector } from "react-redux";
import PetSchedule from "./PetSchedule";
const { REACT_APP_SERVER_URL } = process.env;

const PetInfo = () => {
  const user = useSelector((state) => state.user);
  const [ownersPet, setOwnersPet] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const pet = await axios.get(`${REACT_APP_SERVER_URL}/pet/owner`, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        });
        setOwnersPet(pet.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  return (
    <section className="homeSection">
      <figure className="petPic">
        {ownersPet.pet_pictures && (
          <img
            src={`${REACT_APP_SERVER_URL}/pic/${ownersPet.pet_pictures[0]}`}
            alt="Pet"
          ></img>
        )}
      </figure>
      <div className="petSchedule">
        <section className="petInfo">
          <h2>This is {ownersPet.name}</h2>
          <p className="summaryTitle">Bio:</p>
          <p className="summary">{ownersPet.description}</p>
        </section>
        <PetSchedule />
      </div>
    </section>
  );
};

export default PetInfo;
