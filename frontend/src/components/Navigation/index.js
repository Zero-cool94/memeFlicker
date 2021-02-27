// frontend/src/components/Navigation/index.js
import React from "react";
import { useSelector } from "react-redux";
import "./Navigation.css";
import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";
import UpLoadModal from "../model/UpLoadModal"

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>

        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }
  return (


    <ul className="nav-bar">
     <li>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink exact to="/upload">
          upload

        </NavLink>

        {isLoaded && sessionLinks}
     </li>
    </ul>


  );
}

export default Navigation;
