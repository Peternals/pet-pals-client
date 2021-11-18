import React, { useState, useEffect } from "react";
import DatePicker from "../components/DatePicker";
import "../styles/carer/pet.scss";
import samplePet from "../assets/sampleDog2.jpeg";
import { useLocation, Link } from "react-router-dom";
import Gallery from "../components/gallery/Gallery";
import axios from "axios";

const { REACT_APP_SERVER_URL } = process.env;

// Component that represents the pet view for the carer
// Has the more detailed view of the pet
// Has a date picker for choosing the dates for requested
// Has the button to direct to the questionnaire page

const Pet = () => {
  const location = useLocation();
  const { pet } = location.state;
  const petImg = pet.pet_pictures;
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const requestsData = await axios.get(
          `${REACT_APP_SERVER_URL}/requests/Approved/${pet._id}`,
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        );
        setRequests(requestsData.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [pet._id]);

  const isDateInApprovedRequest = (momentDate) => {
    const convertedDate = momentDate.toDate();
    let dates = [];

    const getDatesBetweenDates = function (start, end) {
      // start and end must be JS Dates
      let dates = [];
      let currentDate = start;
      while (currentDate.getDate() <= end.getDate()) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    };

    requests.forEach((request) => {
      dates = dates.concat(
        getDatesBetweenDates(
          new Date(request.request.start),
          new Date(request.request.end)
        )
      );
    });
    return dates.some((date) => date.getDate() === convertedDate.getDate());
  };

  return (
    <main className="petMain">
      <div className="container-fluid p-3 align-items-center">
        {/** TODO: Replace PetCard with the actual PetInfo component */}
        <section className="petOptions">
          <DatePicker isDateBlocked={isDateInApprovedRequest} />
          {/*TODO: Pet , Pet Questions, selected dates required to the Link*/}
          <Link to="/carer/questionnaire" state={{ pet: pet }}>
            <button className="card-button">Book Date</button>
          </Link>
        </section>
        <section className="petFlexBox">
          <figure>
            <div className="mainPic">
              {pet.pet_pictures && pet.pet_pictures.length >= 1 ? (
                <img
                  src={`${REACT_APP_SERVER_URL}/pic/${pet.pet_pictures[0]}`}
                  alt="pet pic"
                />
              ) : (
                <img src={samplePet} alt="pet" />
              )}
            </div>
          </figure>

          <div className="petBio">
            <h1>This is {pet.name}</h1>
            <h3>Bio</h3>
            <p>{pet.description}</p>
          </div>
        </section>
        <h1>Gallery</h1>

        <Gallery petImg={petImg} />
      </div>
    </main>
  );
};

export default Pet;
