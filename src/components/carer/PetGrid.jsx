import React, { useState, useEffect } from "react";
import PetCard from "./PetCard";

// uncomment this out
import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

// TEST DATA - TO BE REMOVED

const PetGrid = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${REACT_APP_SERVER_URL}/pet`, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        });

        setPets(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="row">
        {pets.map((pet) => (
          <PetCard pet={pet} key={pet._id} />
        ))}
      </div>
    </div>
  );
};

export default PetGrid;
