import React, { useState } from "react";
import "../../styles/gallery/gallery.scss";
import samplePet from "../../assets/sampleDog2.jpeg";
import { LazyLoadImage } from "react-lazy-load-image-component";
const { REACT_APP_SERVER_URL } = process.env;

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
        {petImg.length ? (
          <LazyLoadImage 
            effect="blur"
            src={`${REACT_APP_SERVER_URL}/pic/${petImg[currImg]}`}
            alt="img"
          />
        ) : (
          <LazyLoadImage effect="blur" src={samplePet} alt="pet" />
        )}

        <i className="fa fa-close" onClick={() => setFullScreen(false)}></i>
      </div>
      <section className="gallerySection">
        {petImg.length ? (
          petImg.map((img, i) => (
            <LazyLoadImage 
              effect="blur"
              src={`${REACT_APP_SERVER_URL}/pic/${img}`}
              alt="pet"
              onClick={() => openImg(i)}
              key={i}
            />
          ))
        ) : (
          <LazyLoadImage effect="blur" src={samplePet} alt="pet" />
          
        )}
      </section>
    </>
  );
};

export default Gallery;
