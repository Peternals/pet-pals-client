import React, { useEffect } from "react";
import DatePicker from "../components/DatePicker";
import { Link } from "react-router-dom";
import "../styles/carer/pet.scss";
import samplePet from "../assets/sampleDog2.jpeg";
import Gallery from "../components/gallery/Gallery";
import img1 from "../assets/sample.jpg";
import img2 from "../assets/sampleDog.jpg";
import img3 from "../assets/sampleDog2.jpeg";
import img4 from "../assets/sampleDog3.jpg";
import img5 from "../assets/sampleDog4.jpg";
import img6 from "../assets/sampleDog5.jpg";
// import axios from "axios"
// const { REACT_APP_SERVER_URL } = process.env;

// Component that represents the pet view for the carer
// Has the more detailed view of the pet
// Has a date picker for choosing the dates for requested
// Has the button to direct to the questionnaire page

const Pet = () => {
	// const [petInfo, setPetInfo] = useState({});
	// const { id } = useParams();
	useEffect(() => {
		// (async () => {
		// 	try {
		// 		// just setting the info of the pet
		// 		const pet = await axios.get(`${REACT_APP_SERVER_URL}/pet/${id}`, {
		// 			headers: {
		// 				"x-access-token": localStorage.getItem("token"),
		// 			},
		// 		});
		// 		setPetInfo(pet.data)
		// 	} catch (error) {
		// 		console.log(error);
		// 	}
		// })();
	}, []);

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
					<Link to="/carer/questionnaire">
						<button className="card-button">Book Date</button>
					</Link>
				</section>
				<section className="petFlexBox">
					<figure>
						<div className="mainPic">
							<img src={samplePet} alt="pet" />
						</div>
					</figure>

					<div className="petBio">
						<h1>This is Max</h1>
						<h3>Bio</h3>
						<p>
							Dolor ex incididunt dolor qui ad. Veniam amet nisi dolor velit
							nulla aliqua ad fugiat pariatur dolor ex. Ad proident commodo
							dolore ut ut. Deserunt in sint ea voluptate eu ad tempor mollit
							enim. Dolor ex incididunt dolor qui ad. Veniam amet nisi dolor
							velit nulla aliqua ad fugiat pariatur dolor ex. Ad proident
							commodo dolore ut ut. Deserunt in sint ea voluptate eu ad tempor
							mollit enim. Dolor ex incididunt dolor qui ad. Veniam amet nisi
							dolor velit nulla aliqua ad fugiat pariatur dolor ex. Ad proident
							commodo dolore ut ut. Deserunt in sint ea voluptate eu ad tempor
							mollit enim.Dolor ex incididunt dolor qui ad. Veniam amet nisi
							dolor velit nulla aliqua ad fugiat pariatur dolor ex. Ad proident
						</p>
					</div>
				</section>
				<h1>Gallery</h1>

				<Gallery petImg={petImg} />
			</div>
		</main>
	);
};

export default Pet;
