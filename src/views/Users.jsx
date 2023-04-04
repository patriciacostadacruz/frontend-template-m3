import indexService from "../services/indexServices";
import { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import Loading from "../components/Loading";
import { useLocation } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
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

  return (
    <>
      <h1>Users</h1>
      {loading && <Loading />}
      {users &&
        users.map((user) => {
          return <UserCard user={user} key={user._id} />;
        })}
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}

export default Users;
