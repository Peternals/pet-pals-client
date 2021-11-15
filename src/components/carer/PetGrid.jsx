import React, { useState, useEffect } from "react";
import PetCard from "./PetCard";

// uncomment this out
// import axios from "axios";
// const { REACT_APP_SERVER_URL } = process.env;

// TEST DATA - TO BE REMOVED

const PetGrid = () => {
  // TEST DATA - TO BE REMOVED
  const [pets, setPets] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        // const action = await axios.get(`${REACT_APP_SERVER_URL}/pet`, {
        // 	headers: {
        // 		"x-access-token": localStorage.getItem("token"),
        // 	},
        // });
        // console.log(action);
        setPets([
          {
            id: "618df22006b6b5fcd6a800c9",
            name: "Shaka",
            type: "Dog",
            owner_id: "618dd5c226c89552d2609319",
            description: "Doggy",
            questionnaire: ["Question 1", "Question 2", "Question 3"],
          },
          //   {
          //     name: "Kuro",
          // 	type: "Cat",
          // 	owner_id: id,
          //     description: "Black Cat",
          // 	questionnaire: ["Question 1", "Question 2", "Question 3"]
          //   },
          //   {
          //     name: "Fido",
          // 	type: "Dog",
          // 	owner_id: id,
          //     description: "Doggy",
          // 	questionnaire: ["Question 1", "Question 2", "Question 3"]
          //   },
          //   {
          //     name: "Fido",
          // 	type: "Dog",
          // 	owner_id: id,
          //     description: "Doggy",
          // 	questionnaire: ["Question 1", "Question 2", "Question 3"]
          //   },
          //   {
          //     name: "Fido",
          // 	type: "Dog",
          // 	owner_id: id,
          //     description: "Doggy",
          // 	questionnaire: ["Question 1", "Question 2", "Question 3"]
          //   },
          //   {
          //     name: "Fido",
          // 	type: "Dog",
          // 	owner_id: id,
          //     description: "Doggy",
          // 	questionnaire: ["Question 1", "Question 2", "Question 3"]
          //   },
        ]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="row">
        {pets.map((pet) => (
          <PetCard pet={pet} key={pet.id} />
        ))}
      </div>
    </div>
  );
};

export default PetGrid;
