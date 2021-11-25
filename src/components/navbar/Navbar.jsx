import React from "react";
import "../../styles/navbar/nav.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setRequestSeenState, signOutCleanUp } from "../../slicers/userSlice";
import { signOutPetCleanUp } from "../../slicers/petSlice";
import { signOutMessengerCleanUp } from "../../slicers/messengerSlice";
import { signOutDateCleanUp } from "../../slicers/datePickerSlice";
import Notification from "./Notification";
import { socket } from "../../socket";
import axios from "axios";

const { REACT_APP_SERVER_URL } = process.env;

const Navbar = () => {
  const requests = useSelector((state) => state.user.ownerRequests.length);
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
  const newRequests = useSelector((state) => {
    const Carer = state.user.Carer;
    if (Carer) {
      const request = Carer.requests.filter(
        (request) => request.status !== "Pending" && request.seen === false
      );
      return request.length;
    }
    return 0;
  });

  const handleSignOut = (e) => {
    dispatch(signOutCleanUp());
    dispatch(signOutPetCleanUp());
    dispatch(signOutMessengerCleanUp());
    dispatch(signOutDateCleanUp());
    socket.disconnect();
    window.localStorage.removeItem("token");
  };

  const openNotif = () => {
    const notif = document.querySelector(".notification");
    if (notif.classList.contains("showNotif")) {
      if (newRequests > 0) {
        dispatch(setRequestSeenState());
        try {
          axios.patch(
            `${REACT_APP_SERVER_URL}/requests/carer/`,
            {},
            {
              headers: {
                "x-access-token": localStorage.getItem("token"),
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
    }
    notif.classList.toggle("showNotif");
  };

  return (
    <header className="navHeader">
      <nav className="navMain">
        <Link to="/">
          <h2>Pet Pals</h2>
        </Link>
        <ul className="mainOptions">
          {isLoggedIn === true && (
            <>
              {type === "Owner" ? (
                <>
                  <Link to="/owner/requests">
                    <li>
                      <i className="fa fa-bell"></i>
                      <span>{requests === 0 ? "" : requests}</span>
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
                    <span>{newRequests === 0 ? "" : newRequests}</span>
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
                  <span>{newConversations === 0 ? "" : newConversations}</span>
                </li>
              </Link>
              {/* TODO: change --> /setting/:id after user id is stored in redux */}
              {type === "Owner" ? (
                <>
                  <Link to="/owner/setting">
                    <li>
                      <i className="fa fas fa-cog"></i>
                    </li>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/carer/setting">
                    <li>
                      <i className="fa fas fa-cog"></i>
                    </li>
                  </Link>
                </>
              )}
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
