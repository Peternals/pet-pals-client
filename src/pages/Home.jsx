import React from "react";
import { Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import petCover from "../assets/pet.png";
import "../styles/home.scss";
import splash from "../assets/splash.png";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const type = useSelector((state) => state.user.type);
  return (
    <>
      {isLoggedIn === true ? (
        <>
          {type === "Owner" ? (
            <Navigate to="/owner" />
          ) : (
            <Navigate to="/carer" />
          )}
        </>
      ) : (
        <main className="homeMain">
          <div className="banner">
            <section>
              <h1>Borrow my Bestfriend</h1>

              <Link to="/signin">
                <button className="signin">Sign in</button>
              </Link>
              <Link to="/signup">
                <button className="signup">Sign up</button>
              </Link>
            </section>
            <figure>
              <img className="donNCat" src={petCover} alt="pets"></img>
              <img className="splash" src={splash} alt="splash"></img>
            </figure>
          </div>
        </main>
      )}
    </>
  );
};

export default Home;
