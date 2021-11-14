import React, { useEffect, useState } from "react";
import DatePicker from "../components/DatePicker";
import { Link, useParams } from "react-router-dom";
import "../styles/carer/pet.scss";
import samplePet from "../assets/sampleDog2.jpeg";
import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

// Component that represents the pet view for the carer
// Has the more detailed view of the pet
// Has a date picker for choosing the dates for requested
// Has the button to direct to the questionnaire page
const Pet = () => {
  const [petInfo, setPetInfo] = useState({});
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const pet = await axios.get(`${REACT_APP_SERVER_URL}/pet/${id}`);
        setPetInfo(pet.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  return (
    <main className="petMain">
      <div className="container-fluid p-3 align-items-center">
        <section className="petOptions">
          <DatePicker />
          <Link to="/carer/questionnaire">
            <button className="card-button">Book Date</button>
          </Link>
        </section>
        <section className="petFlexBox">
          <figure>
            <div className="mainPic">
              {petInfo.pet_pictures ? (
                <img
                  src={`${REACT_APP_SERVER_URL}/pic/${petInfo.pet_pictures}`}
                  alt="pet pic"
                />
              ) : (
                <img src={samplePet} alt="pet" />
              )}
            </div>
          </figure>

          <div className="petBio">
            <h1>This is {petInfo.name}</h1>
            <h3>Bio</h3>
            <p>{petInfo.description}</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Pet;
