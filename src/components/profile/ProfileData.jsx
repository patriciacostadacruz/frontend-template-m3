function ProfileData({ user }) {
  return (
    <>
      <h2>{user.firstName} {user.lastName}</h2>
      <img src={user.image} alt="Avatar" />
      {user.userProjects ? <p>projects</p> : "You havent added any project yet."}
      {user.userReviews ? <p>reviews</p> : "You haven't been reviewed by other users yet."}
    </>
  );
}

export default ProfileData;
