import React from "react";
import "../../styles/navbar/nav.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutCleanUp } from "../../slicers/userSlice";

const Navbar = () => {
  const type = useSelector((state) => state.user.type);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const handleSignOut = (e) => {
    dispatch(signOutCleanUp());
    window.localStorage.removeItem("token");
  };

  return (
    <header className="navHeader">
      <nav className="navMain">
        <Link to="/">
          <h2>Pet Rental</h2>
        </Link>
        <ul className="mainOptions">
          {type === "Owner" && (
            <>
              <Link to="/owner/requests">
                <li>
                  <i className="fa fa-bell"></i>
                </li>
              </Link>
            </>
          )}
          {isLoggedIn === true && (
            <>
              <Link to="/messenger">
                <li>
                  <i className="fa fa-wechat"></i>
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
