import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import whiteLogoBlackLetter from "../images/investMate-white-logo-black-letter.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const { isLoggedIn, logOutUser } = useContext(AuthContext); 
  const navigate = useNavigate();

  return (
    <div className="navbar-container">
      <ul>
        <img width="150" className="navbar-app-logo" src={whiteLogoBlackLetter} alt="" />
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {!isLoggedIn && (
          <li>
            <NavLink to="/signup">Sign up</NavLink>
          </li>
        )}
        {!isLoggedIn && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}

        {isLoggedIn && (
          <li>
            <NavLink to="/users">Users</NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink to="/projects">Projects</NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink to="/projects/new">Create a project</NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink to="/conversations">Conversations</NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={() => logOutUser()}>Log out</button>
          </li>
        )}
      </ul>
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
}

export default Navbar;
