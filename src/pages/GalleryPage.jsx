import React from "react";
import Gallery from "../components/gallery/Gallery";
import img1 from "../assets/sample.jpg";
import img2 from "../assets/sampleDog.jpg";
import img3 from "../assets/sampleDog2.jpeg";
import img4 from "../assets/sampleDog3.jpg";
import img5 from "../assets/sampleDog4.jpg";
import img6 from "../assets/sampleDog5.jpg";

const GalleryPage = () => {
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
		<main style={{ padding: "70px 0px", margin: "10px" }}>
			<h1>Gallery</h1>
			<Gallery petImg={petImg} />
		</main>
	);
};

export default GalleryPage;
