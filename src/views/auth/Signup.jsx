import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

export default function Signup() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    image:
      "https://www.atomos.co.uk/getmedia/ec2d2ef0-71ea-40b8-a76c-6eb00c0cc210/portrait_placeholder_6.png?width=600&height=600&ext=.png",
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
    setUser(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  useEffect(() => {
    if (password !== passwordConfirmation) {
      setErrorMessage("Passwords don't match");
    } else {
      setErrorMessage(undefined);
    }
  }, [passwordConfirmation, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signup({
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
      navigate('/login');
    } catch (error) {
      console.error(error)
      setErrorMessage('Unable to create user account.')
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <>
          <h2>Personal data:</h2>
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
            <h2>Professional data:</h2>
            <div>
              <label>Role</label>
              <select required>
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
              <select required multiple>
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
                placeholder="Write about yourself."
                column="30"
                rows="10"
                onChange={handleChange}
              />
            </div>
          </div>
        </>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
