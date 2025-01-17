import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import whiteLogoBlackLetter from "../images/investMate-white-logo-black-letter.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"; 

const Navbar = () => {
  const { isLoggedIn, logOutUser } = useContext(AuthContext); 
  const navigate = useNavigate();

  return (
    <div className="navbar-container">
      <ul className="navbar-items">
        <li>
          <NavLink to="/" className="navbar-options">
            <img
              className="navbar-app-logo"
              src={whiteLogoBlackLetter}
              alt=""
            />
          </NavLink>
        </li>
        {!isLoggedIn && (
          <li>
            <NavLink to="/signup" className="navbar-options">
              Sign up
            </NavLink>
          </li>
        )}
        {!isLoggedIn && (
          <li>
            <NavLink to="/login" className="navbar-options">
              <FontAwesomeIcon icon={faRightToBracket} />
            </NavLink>
          </li>
        )}

        {isLoggedIn && (
          <li>
            <NavLink to="/users" className="navbar-options">
              Users
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink to="/projects" className="navbar-options">
              Projects
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink to="/projects/new" className="navbar-options">
              Create project
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink to="/conversations" className="navbar-options">
              Conversations
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink to="/profile" className="navbar-options">
              Profile
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={() => logOutUser()} className="logout-button">
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          </li>
        )}
      </ul>
      <button className="go-back-button" onClick={() => navigate(-1)}>
        Go back
      </button>
    </div>
  );
}

export default Navbar;
