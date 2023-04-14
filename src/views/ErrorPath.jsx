import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import wrongPath from "../images/wrongway.jpg";

const ErrorPath = () => {
  const location = useLocation();
 
  return (
    <div className="error-content">
      <img height="300" src={wrongPath} alt="GIF" />
      <p>
        There is no URL called <strong>{location.pathname}</strong> in this
        website.
        <br />
        You might want to go back to the <Link to="/">home page</Link>.
      </p>
    </div>
  );
}

export default ErrorPath;
