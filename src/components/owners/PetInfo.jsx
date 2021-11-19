import React, { useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import { useSelector, useDispatch } from "react-redux";
import PetSchedule from "./PetSchedule";
import { getPetInfo } from "../../slicers/petSlice";
const { REACT_APP_SERVER_URL } = process.env;

const PetInfo = () => {
  const pet = useSelector((state) => state.pet.info);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPetInfo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="homeSection">
      <figure className="petPic">
        {pet.pet_pictures.length ? (
          <img
            src={`${REACT_APP_SERVER_URL}/pic/${pet.pet_pictures[0]}`}
            alt="Pet"
          ></img>
        ) : (
          <h1>Loading...</h1>
        )}
      </figure>
      <div className="petSchedule">
        <section className="petInfo">
          <h2>This is {pet.name}</h2>
          <p className="summaryTitle">Bio:</p>
          <p className="summary">{pet.description}</p>
        </section>
        <PetSchedule />
      </div>
    </section>
  );
};

export default PetInfo;
