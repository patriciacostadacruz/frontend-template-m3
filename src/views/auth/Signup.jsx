import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { useNavigate, Link } from 'react-router-dom';
import authService from "../../services/authService";
import appLogo from "../../images/investMate-blue-logo-black-letter.png";

const Signup = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    image: "",
    email: "",
    role: "",
    linkedIn: "",
    company: "",
    industry: [],
    bio: "",
    status: "active",
  });
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]:
        // need to use this Array.from as industries must be an array so the data pulled from the form must be sent as such
          e.target.name === "industry"
            ? Array.from(e.target.selectedOptions, (option) => option.value)
            : e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await authService.signup({
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      email: user.email,
      password,
      passwordConfirmation,
      role: user.role,
      linkedIn: user.linkedIn,
      company: user.company,
      industry: user.industry,
      bio: user.bio,
      status: user.status
    });
    if (!newUser.error) {
      navigate('/login');
      toast.success("Account created successfully!");
    } else {
      toast.error("There was an issue when creating your account. Please try again.");
    }
    } catch (error) {
      toast.error('Unable to create user account.')
    }
  }

  useEffect(() => {
    if (password !== passwordConfirmation) {
      setErrorMessage("Passwords don't match.");
    } else {
      setErrorMessage(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordConfirmation, password]);

  return (
    <div className="form-container">
      <img src={appLogo} alt="App logo" />
      <h2>Create your account to enjoy investMate's features!</h2>
      <p>It's completely free!</p>
      <form onSubmit={handleSubmit}>
        <>
          <h3>Personal data:</h3>
          <div>
            <label>First name</label>
            <input
              required
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
            <label>Last name</label>
            <input
              required
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
            <label>Profile image</label>
            <input
              type="text"
              name="image"
              value={user.image}
              onChange={handleChange}
            />
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Repeat the password</label>
            <input
              required
              type="password"
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
        </>
        <>
          <div>
            <h3>Professional data:</h3>
            <div>
              <label>Role</label>
              <select
                required
                name="role"
                value={user.role}
                onChange={handleChange}
              >
                <option value="">-- Select your role --</option>
                <option value="investee">
                  Investee (the person looking for inversions)
                </option>
                <option value="investor">
                  Investor (the person looking to invest)
                </option>
              </select>
              <label>LinkedIn page</label>
              <input
                type="text"
                name="linkedIn"
                value={user.linkedIn}
                onChange={handleChange}
              />
              <label>Company</label>
              <input
                type="text"
                name="company"
                value={user.company}
                onChange={handleChange}
              />
              <label>Industry</label>
              <select
                required
                multiple
                name="industry"
                value={user.industry}
                onChange={handleChange}
              >
                <option value="All">All</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Chems and materials">Chems and materials</option>
                <option value="Communication">Communication</option>
                <option value="Construction">Construction</option>
                <option value="Consumer goods and retail">
                  Consumer goods and retail
                </option>
                <option value="Consumer services">Consumer services</option>
                <option value="Energy and environment">
                  Energy and environment
                </option>
                <option value="Financial services">Financial services</option>
                <option value="Infrastructures">Infrastructures</option>
                <option value="Life science">Life science</option>
                <option value="Real estate">Real estate</option>
                <option value="Transportation">Transportation</option>
                <option value="Digital mark">Digital mark</option>
                <option value="IT/Tech">IT/Tech</option>
                <option value="Electronics">Electronics</option>
                <option value="Other">Other</option>
              </select>
              <label>Biography</label>
              <textarea
                type="text"
                name="bio"
                value={user.bio}
                placeholder="Write something about yourself"
                column="30"
                rows="10"
                onChange={handleChange}
              />
            </div>
          </div>
        </>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">Sign up</button>
        <p>
          Don't have an account?
          <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
