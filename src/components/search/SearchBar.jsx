import { useState, useEffect } from "react";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    setSearchValue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={searchValue} onChange={handleChange} />
        <button type="button">Search</button>
      </form>
    </>
  );
}

export default SearchBar;
