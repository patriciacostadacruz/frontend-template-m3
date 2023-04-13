import { useState } from "react";

const EditProfileData = ({ user, onUpdate, onCancel }) => {
  const style = { height: "300px", width: "300px", objectFit: "cover" };
  const [formState, setFormState] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    image: user.image,
    email: user.email,
    role: user.role,
    company: user.company,
    industry: user.industry,
    bio: user.bio
  });

  const handleInputChange = (e) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (e) => {
    const options = e.target.options;
    const values = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    setFormState((prev) => ({
      ...prev,
      industry: values,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formState);
  };

  return (
    <>
      <img src={user.image} alt="My avatar" style={style} />
      <form onSubmit={handleSubmit}>
        <div className="profile-data">
          <div className="profile-data-personal">
            <label>First name</label>
            <input
              required
              type="text"
              name="firstName"
              value={formState.firstName}
              onChange={handleInputChange}
            />
            <label>Last name</label>
            <input
              required
              type="text"
              name="lastName"
              value={formState.lastName}
              onChange={handleInputChange}
            />
            <label>Profile image</label>
            <input
              type="text"
              name="image"
              value={formState.image}
              onChange={handleInputChange}
            />
            <label>Email</label>
            <input
              required
              type="email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="profile-data-professional">
            <div>
              <label>Role</label>
              <select
                required
                name="role"
                value={formState.role}
                onChange={handleInputChange}
              >
                <option value="investee">
                  Investee (the person looking for inversions)
                </option>
                <option value="investor">
                  Investor (the person looking to invest)
                </option>
              </select>
              <label>Company</label>
              <input
                type="text"
                name="company"
                value={formState.company}
                onChange={handleInputChange}
              />
              <select
                required
                multiple
                name="industry"
                value={formState.industry}
                onChange={handleSelectChange}
              >
                <option value="">-- Select one or many industries --</option>
                <option value="All" selected={formState.industry === "All"}>
                  All
                </option>
                <option
                  value="Agriculture"
                  selected={formState.industry.includes("Agriculture")}
                >
                  Agriculture
                </option>
                <option
                  value="Chems and materials"
                  selected={formState.industry.includes("Chems and materials")}
                >
                  Chems and materials
                </option>
                <option
                  value="Communication"
                  selected={formState.industry.includes("Communication")}
                >
                  Communication
                </option>
                <option
                  value="Construction"
                  selected={formState.industry.includes("Construction")}
                >
                  Construction
                </option>
                <option
                  value="Consumer goods and retail"
                  selected={formState.industry.includes(
                    "Consumer goods and retail"
                  )}
                >
                  Consumer goods and retail
                </option>
                <option
                  value="Consumer services"
                  selected={formState.industry.includes("Consumer services")}
                >
                  Consumer services
                </option>
                <option
                  value="Energy and environment"
                  selected={formState.industry.includes(
                    "Energy and environment"
                  )}
                >
                  Energy and environment
                </option>
                <option
                  value="Financial services"
                  selected={formState.industry.includes("Financial services")}
                >
                  Financial services
                </option>
                <option
                  value="Infrastructures"
                  selected={formState.industry.includes("Infrastructures")}
                >
                  Infrastructures
                </option>
                <option
                  value="Life science"
                  selected={formState.industry.includes("Life science")}
                >
                  Life science
                </option>
                <option
                  value="Real estate"
                  selected={formState.industry.includes("Real estate")}
                >
                  Real estate
                </option>
                <option
                  value="Transportation"
                  selected={formState.industry.includes("Transportation")}
                >
                  Transportation
                </option>
                <option
                  value="Digital mark"
                  selected={formState.industry.includes("Digital mark")}
                >
                  Digital mark
                </option>
                <option
                  value="IT/Tech"
                  selected={formState.industry.includes("IT/Tech")}
                >
                  IT/Tech
                </option>
                <option
                  value="Electronics"
                  selected={formState.industry.includes("Electronics")}
                >
                  Electronics
                </option>
                <option
                  value="Education"
                  selected={formState.industry.includes("Education")}
                >
                  Education
                </option>
                <option
                  value="Food and beverage"
                  selected={formState.industry.includes("Food and beverage")}
                >
                  Food and beverage
                </option>
                <option
                  value="Other"
                  selected={formState.industry.includes("Other")}
                >
                  Other
                </option>
              </select>
              <textarea
                type="text"
                name="bio"
                value={formState.bio}
                placeholder="Write something about yourself"
                cols="40"
                rows="6"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="profile-edit-options">
          <button type="submit">Save changes</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default EditProfileData;
