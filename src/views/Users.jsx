import indexService from "../services/indexServices";
import { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import Loading from "../../components/Loading";

function Users() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await indexService.getUsers();
      setUsers(response.users);
      setLoading(false);
    } catch (error) {
      setErrorMessage("Sorry, we couldn't retrieve users.");
    }
  };
  
  useEffect(() => {
    getUsers();
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
