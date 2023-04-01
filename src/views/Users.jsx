import indexService from "../services/indexServices";
import { useState, useEffect } from "react";
import UserCard from "../components/UserCard";

function Users() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await indexService.getUsers();
      console.log(response.users)
      setUsers(response.users);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <h1>Users</h1>
      {users && <p>users</p>}
      {users &&
        users.map((user) => {
          return <UserCard user={user} key={user._id} />;
        })}
    </>
  );
}

export default Users;
