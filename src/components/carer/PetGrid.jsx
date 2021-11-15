import React from "react";
import PetCard from "./PetCard";

<<<<<<< HEAD
const PetGrid = ({ pets }) => {
  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="row">
        {pets.map((pet, i) => (
          <PetCard pet={pet} key={i} />
        ))}
      </div>
    </div>
  );
=======
// uncomment this out
// import axios from "axios";
// const { REACT_APP_SERVER_URL } = process.env;

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
						name: "Fido",
						description: "Doggy",
					},
					{
						name: "Ollie",
						description: "Otter",
					},
					{
						name: "Simba",
						description: "Lion",
					},
					{
						name: "Mizugocci",
						description: "Mizugocci",
					},
					{
						name: "Doraemon",
						description: "???",
					},
					{
						name: "Hachiko",
						description: "Dog",
					},
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
					<PetCard />
				))}
			</div>
		</div>
	);
>>>>>>> main
};

export default PetGrid;
