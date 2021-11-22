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
  const { type, _id } = useSelector((state) => state.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const newConversations = useSelector((state) => {
    const conversations = state.messenger.conversations;
    if (conversations.length === 0) return 0;
    return conversations.filter((conv) => {
      const user = conv.seen.find((seen) => seen.userId === _id);
      if (user.state === false) {
        return true;
      }
      return false;
    }).length;
  });

  const handleSignOut = (e) => {
    dispatch(signOutCleanUp());
    dispatch(signOutPetCleanUp());
    dispatch(signOutMessengerCleanUp());
    dispatch(signOutDateCleanUp());
    window.localStorage.removeItem("token");
  };

  const openNotif = () => {
    const notif = document.querySelector(".notification");
    notif.classList.toggle("showNotif");
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
                  <Link to="/owner/pet-setting">
                    <li>
                      <i className="fa fas fa-paw"></i>
                    </li>
                  </Link>
                </>
              ) : (
                <>
                  <li onMouseUp={openNotif}>
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
                  <i className="fa fa-wechat">
                    {newConversations === 0 ? "" : newConversations}
                  </i>
                </li>
              </Link>
              <Link to="/setting">
                <li>
                  <i className="fa fas fa-cog"></i>
                </li>
              </Link>
              <Link to="/" onClick={handleSignOut}>
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
