import React, { useRef, useState, useEffect } from "react";
import PetGrid from "./PetGrid";
import "../../styles/carer/carer.scss";
import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

// Grid of cards for web view, column for phone view

//TODO: if type is not selected, append all pets
const Carer = () => {
  const [all, setAll] = useState([]);
  const [view, setView] = useState("All");
  const [type, setType] = useState("");
  const [pets, setPets] = useState([]);
  const types = ["Dog", "Cat", "Otter", "Snake"];
  const typeRef = useRef();

  useEffect(() => {
    const fetchAllPets = async () => {
      try {
        const pets = await axios.get(`${REACT_APP_SERVER_URL}/pet`);
        console.log(pets.data);
        setAll(pets.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPets();
  }, [all]);

  useEffect(() => {
    if (type) {
      const fetchPets = async () => {
        const pets = await axios.get(
          `${REACT_APP_SERVER_URL}/pet/type/${type}`
        );
        setPets(pets.data);
        setView("Type");
      };
      fetchPets();
    }
  }, [type]);

  return (
    <main className="carerMain">
      <section>
        <select
          name="type"
          defaultValue=""
          ref={typeRef}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select pet type</option>
          {types.map((type, i) => (
            <option key={i} value={type}>
              {type}
            </option>
          ))}
        </select>
      </section>
      <PetGrid pets={pets} />
    </main>
  );
};

export default Carer;
