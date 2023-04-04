import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import profileService from "../../services/profileServices";

export default function Login() {
  const { storeToken, authenticateUser, isLoggedIn } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
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
      </form>
    </div>
  );
}
