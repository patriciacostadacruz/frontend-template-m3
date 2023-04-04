import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import wrongWay from "../images/wrongway.jpg";

export default function ErrorPath() {
  const location = useLocation();
 
  return (
    <div>
      <img height="300" src={wrongWay} alt="GIF" />
      <p>
        There is no URL called <strong>{location.pathname}</strong> in this website.<br/>You might want to go back to the{" "}
        <Link to="/">home page</Link>.
      </p>
    </div>
  );
}
