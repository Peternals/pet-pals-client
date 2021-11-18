import React from "react";
import "../../styles/navbar/nav.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutCleanUp } from "../../slicers/userSlice";
import { signOutPetCleanUp } from "../../slicers/petSlice";
import { signOutMessengerCleanUp } from "../../slicers/messengerSlice";
import { signOutDateCleanUp } from "../../slicers/datePickerSlice";
import Notification from "./Notification";

const Navbar = () => {
  const type = useSelector((state) => state.user.type);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const handleSignOut = (e) => {
    dispatch(signOutCleanUp());
    dispatch(signOutPetCleanUp());
    dispatch(signOutMessengerCleanUp());
    dispatch(signOutDateCleanUp());
    window.localStorage.removeItem("token");
  };

  const openNotif = () => {
    document.querySelector(".notification").classList.toggle("showNotif");
  };

  return (
    <header className="navHeader">
      <nav className="navMain">
        <Link to="/">
          <h2>Pet Rental</h2>
        </Link>
        <ul className="mainOptions">
          {isLoggedIn === true && (
            <>
              {type === "Owner" ? (
                <>
                  <Link to="/owner/requests">
                    <li>
                      <i className="fa fa-bell"></i>
                    </li>
                  </Link>
                </>
              ) : (
                <>
                  <li onClick={openNotif}>
                    <i className="fa fa-bell"></i>
                    <Notification />
                  </li>
                  <Link to="/carer/profile">
                    <li>
                      <i className="fa fa-user"></i>
                    </li>
                  </Link>
                </>
              )}
              <Link to="/messenger">
                <li>
                  <i className="fa fa-wechat"></i>
                </li>
              </Link>
              {/* TODO: change --> /setting/:id after user id is stored in redux */}
              <Link to="/setting">
                <li>
                  <i className="fa fas fa-cog"></i>
                </li>
              </Link>
              <Link to="/signin" onClick={handleSignOut}>
                <li>
                  <i className="fa fa-sign-out"></i>
                </li>
              </Link>
            </>
          )}

          {isLoggedIn === false && (
            <>
              <Link to="/signin">
                <li>
                  <i>log in</i>
                </li>
              </Link>
              <Link to="/signup">
                <li>
                  <i>sign up</i>
                </li>
              </Link>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
