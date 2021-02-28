// frontend/src/components/Navigation/index.js
import React from "react";
import { useSelector } from "react-redux";
import "./Navigation.css";
import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";
import UpLoadModal from "../model/UpLoadModal"
import logo from "../images/git_hub_logo.png"
import logo2 from "../images/flick-logo.png"

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
    <li> <img className="logo2" src={logo2} ></img> </li>

     <li>
      <a href="https://github.com/Zero-cool94/memeFlicker">
      <img className="logo" src={logo} alt="git-logo"></img>
      </a>
     </li>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink exact to="/upload">
          upload
        </NavLink>
        {isLoaded && sessionLinks}

    </ul>


  );
}

export default Navigation;
