import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 

  return (
    <div>
      <h1>Home</h1>
      {user && <p>Hello {user.firstName}</p>}
    </div>
  );
}
