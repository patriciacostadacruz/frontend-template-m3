import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [searchIndustry, setSearchIndustry] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleIndustryChange = (e) => {
    // needs to be an array as per DB model 
    setSearchIndustry(
      Array.from(e.target.selectedOptions, (option) => option.value)
    );
  };

  const handleUserCheckboxChange = (e) => {
    setSelectedUsers(e.target.checked);
  };

  const handleProjectCheckboxChange = (e) => {
    setSelectedProjects(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProjects) {
      navigate(
        `/projects?search=${searchValue}&industry=${searchIndustry.join(",")}`
      );
    } else if (selectedUsers) {
      navigate(
        `/users?search=${searchValue}&industry=${searchIndustry.join(",")}`
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Search for:
          <label>
            <input
              type="checkbox"
              value="projects"
              checked={selectedProjects}
              onChange={handleProjectCheckboxChange}
            />
            Projects
          </label>
          <label>
            <input
              type="checkbox"
              value="users"
              checked={selectedUsers}
              onChange={handleUserCheckboxChange}
            />
            Users
          </label>
        </label>
        <input type="text" value={searchValue} onChange={handleChange}>
        </input>
        <label>
          Industry:
          <select
            multiple
            value={searchIndustry}
            onChange={handleIndustryChange}
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
            <option value="Education">Education</option>
            <option value="Food and beverage">Food and beverage</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <button type="submit">Search</button>
      </form>
    </>
  );
}

export default SearchBar;
