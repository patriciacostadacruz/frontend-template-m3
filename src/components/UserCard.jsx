import { Link } from "react-router-dom";

function UserCard({ user }) {
  return (
    <div className="user-card">
      <img width="200" src={user.image} alt={user.firstName}/>
      <Link to={`/profile/${user._id}`}>
        {user.firstName} {user.lastName}
      </Link>
      <p><strong>Role: </strong>{user.role}</p>
    </div>
  );
}

export default UserCard;
