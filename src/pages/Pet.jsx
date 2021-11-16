import React from "react";
import DatePicker from "../components/DatePicker";
import { Link, useParams } from "react-router-dom";
import "../styles/carer/pet.scss";
import samplePet from "../assets/sampleDog2.jpeg";
import { useLocation } from "react-router-dom";
import Gallery from "../components/gallery/Gallery";
import img1 from "../assets/sample.jpg";
import img2 from "../assets/sampleDog.jpg";
import img3 from "../assets/sampleDog2.jpeg";
import img4 from "../assets/sampleDog3.jpg";
import img5 from "../assets/sampleDog4.jpg";
import img6 from "../assets/sampleDog5.jpg";
const { REACT_APP_SERVER_URL } = process.env;

// Component that represents the pet view for the carer
// Has the more detailed view of the pet
// Has a date picker for choosing the dates for requested
// Has the button to direct to the questionnaire page
const Pet = () => {
  // const [petInfo, setPetInfo] = useState({});
  // const { id } = useParams();
  const location = useLocation();
  const { pet } = location.state;
  /// sample pet imgae. replace this one by the actual data
  const petImg = [
    img1,
    img2,
    img3,
    img3,
    img4,
    img5,
    img6,
    img2,
    img3,
    img2,
    img3,
    img4,
    img5,
    img6,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
  ];
  return (
    <main className="petMain">
      <div className="container-fluid p-3 align-items-center">
        {/** TODO: Replace PetCard with the actual PetInfo component */}
        <section className="petOptions">
          <DatePicker />
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
