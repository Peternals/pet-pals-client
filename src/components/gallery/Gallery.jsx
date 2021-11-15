import React, { useState } from "react";

import "../../styles/gallery/gallery.scss";

const Gallery = ({ petImg }) => {
	//current index of the image
	const [currImg, setCurrImg] = useState(0);
	//state of the screen if you will view the image in full screen or not
	const [fullScreen, setFullScreen] = useState(false);

	const openImg = (i) => {
		setCurrImg(i);
		setFullScreen(true);
	};

	return (
		<>
			<div className={`fullScreenImg ${fullScreen === true && "hideImage"}`}>
				<img src={petImg[currImg]} alt="img" />
				<i className="fa fa-close" onClick={() => setFullScreen(false)}></i>
			</div>
			<section className="gallerySection">
				{petImg.map((img, i) => (
					<img src={img} alt="pet" onClick={() => openImg(i)} key={i} />
				))}
			</section>
		</>
	);
};

export default Gallery;
