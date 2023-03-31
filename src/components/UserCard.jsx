import { Link } from "react-router-dom";

function UserCard({ user }) {
  return (
    <div className="user-card">
      <img src={user.image} alt={user.firstName}/>
      <Link to={`/profile/${user._id}`}>
        {user.firstName} {user.lastName}
      </Link>
    </div>
  );
}

export default UserCard;