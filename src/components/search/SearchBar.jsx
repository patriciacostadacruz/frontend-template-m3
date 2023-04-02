import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchIndustry, setSearchIndustry] = useState([]);
  const navigate = useNavigate();

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleIndustryChange = (e) => {
    setSearchIndustry(
      Array.from(e.target.selectedOptions, (option) => option.value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchType === "projects") {
      navigate(
        `/projects?search=${searchValue}&industry=${searchIndustry.join(",")}`
      );
    } else {
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
          <select value={searchType} onChange={handleSearchTypeChange}>
            <option value="projects">Projects</option>
            <option value="users">Users</option>
          </select>
        </label>
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          placeholder={
            searchType === "users"
              ? "Search users by first name or last name."
              : "Search projects by title or description."
          }
        />
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
