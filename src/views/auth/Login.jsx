import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../services/authService";
import profileService from "../../services/profileServices";
import appLogo from "../../images/investMate-blue-logo-black-letter.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; 

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [passwordShown, setPasswordShown] = useState(false);
  const { storeToken, authenticateUser, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    setPasswordShown(false);
    e.preventDefault();
    try {
      const response = await authService.login(user);
      if (response.authToken) {
        storeToken(response.authToken);
        authenticateUser();
        const currentUser = await authService.me();
        if (currentUser.status === "inactive") {
          await profileService.editStatus({ status: "active" });
          toast.success("Welcome back! Your account is active again.");
        } else {
          toast.success("Welcome back!");
        }
        navigate("/");
      } else {
        toast.error("Unable to authenticate user.");
      }
    } catch (error) {
      toast.error("Unable to log in. Please try again later.");
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  return (
    <div>
      <img className="auth-app-logo" src={appLogo} alt="App logo" />
      <h2 className="auth-h2">Log in</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          required
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <label>Password</label>
        <div>
          <input
            required
            type={passwordShown ? "text" : "password"}
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <span
            className="show-pass-icon"
            onClick={togglePassword}
            type="button"
          >
            {passwordShown ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} /> }
            </span>
        </div>
        <button className="basic-button" type="submit">
          <FontAwesomeIcon icon={faRightToBracket} /> Log in
        </button>
        <p className="auth-phrase">
          Don't have an account?
          <Link to="/signup"> Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
