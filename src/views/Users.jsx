import indexService from "../services/indexServices";
import { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import Loading from "../components/Loading";
import { useLocation } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [sortBy, setSortBy] = useState("firstName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [loading, setLoading] = useState(false);
  const { search } = useLocation();

  const getUsers = async () => {
    setLoading(true);
    try {
      // gets params form URL path
      const params = new URLSearchParams(search);
      const response = await indexService.getUsers(
        params.get("search"),
        params.get("industry")
      );
      setUsers(response);
      setLoading(false);
    } catch (error) {
      setErrorMessage("Sorry, we couldn't retrieve users.");
    }
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortUsers = (users) => {
    const sortedUsers = [...users];
    if (sortBy === "firstName") {
      sortedUsers.sort((a, b) =>
        sortByName(a.firstName, b.firstName, sortDirection)
      );
    } else if (sortBy === "lastName") {
      sortedUsers.sort((a, b) =>
        sortByName(a.lastName, b.lastName, sortDirection)
      );
    }
    return sortedUsers;
  };

  const sortByName = (a, b, direction) => {
    if (direction === "asc") {
      return a.localeCompare(b);
    } else {
      return b.localeCompare(a);
    }
  };

  const handleSortChange = (e) => {
    const value = e.target.value.split("_");
    setSortBy(value[0]);
    setSortDirection(value[1]);
  };

  return (
    <>
      <h1>Users</h1>
      {loading && <Loading />}
      <div>
        <label>Sort by:</label>
        <select
          onChange={handleSortChange}
          value={`${sortBy}_${sortDirection}`}
        >
          <option value="firstName_asc">First Name (A-Z)</option>
          <option value="firstName_desc">First Name (Z-A)</option>
          <option value="lastName_asc">Last Name (A-Z)</option>
          <option value="lastName_desc">Last Name (Z-A)</option>
        </select>
      </div>
      {users
        ? sortUsers(users).map((user) => {
            return <UserCard user={user} key={user._id} />;
          })
        : null}
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}

export default Users;
