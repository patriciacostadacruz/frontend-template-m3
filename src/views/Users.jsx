import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserCard from "../components/UserCard";
import Loading from "../components/Loading";
import indexService from "../services/indexServices";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [sortBy, setSortBy] = useState("firstName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);
  const { search } = useLocation();

  const getUsers = async () => {
    setLoading(true);
    try {
      // gets params form URL path
      const params = new URLSearchParams(search);
      const response = await indexService.getUsers(
        params.get("search"),
        params.get("industry"),
        selectedRole
      );
      setUsers(response);
      setLoading(false);
    } catch (error) {
      setErrorMessage("Sorry, we couldn't retrieve any user.");
    }
  };

  const sortUsers = (users) => {
    const filteredUsers = selectedRole
      ? users.filter((user) => user.role === selectedRole)
      : users;
    const sortedUsers = [...filteredUsers];
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

  const handleRoleChange = (e) => {
    // adds sort filter if there's a value so if box is checked for investee or investor
    setSelectedRole(e.target.checked ? e.target.value : "");
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Users</h1>
      {loading && <Loading />}
      <div>
        <label>
          <strong>Sort by </strong>
        </label>
        <select
          onChange={handleSortChange}
          value={`${sortBy}_${sortDirection}`}
        >
          <option value="firstName_asc">First Name (A-Z)</option>
          <option value="firstName_desc">First Name (Z-A)</option>
          <option value="lastName_asc">Last Name (A-Z)</option>
          <option value="lastName_desc">Last Name (Z-A)</option>
        </select>
        <label>
          <strong> Filter by </strong>
        </label>
        <input
          type="checkbox"
          value="investee"
          checked={selectedRole === "investee"}
          onChange={handleRoleChange}
        />
        <label> Investee </label>
        <input
          type="checkbox"
          value="investor"
          checked={selectedRole === "investor"}
          onChange={handleRoleChange}
        />
        <label> Investor </label>
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
