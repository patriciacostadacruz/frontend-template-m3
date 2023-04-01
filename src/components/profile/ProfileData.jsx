import ReviewCard from "../ReviewCard";

function ProfileData({ user }) {
  return (
    <>
      <h2>{user.firstName} {user.lastName}</h2>
      <img src={user.image} alt="Avatar" />
      {user.reviews && <p>reviews</p>}
    </>
  );
}

export default ProfileData;
