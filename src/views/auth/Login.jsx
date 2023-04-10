import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../services/authService";
import profileService from "../../services/profileServices";
import appLogo from "../../images/investMate-blue-logo-black-letter.png";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
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

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  return (
    <div>
      <img src={appLogo} alt="App logo" />
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          required
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          required
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <button type="submit">Log in </button>
        <p>
          Don't have an account?
          <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
