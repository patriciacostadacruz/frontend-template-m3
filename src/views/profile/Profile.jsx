import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import ProfileData from "../../components/profile/ProfileData";
import EditProfileData from "../../components/profile/EditProfileData";
import Loading from "../../components/Loading";
import ProjectCard from "../../components/project/ProjectCard";
import ReviewCard from "../../components/ReviewCard";
import profileService from "../../services/profileServices";
import authService from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userProjects, setUserProjects] = useState(null);
  const [userReviews, setUserReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { storeToken, removeToken, authenticateUser, logOutUser } =
    useContext(AuthContext);

  const getProfile = async () => {
    setLoading(true);
    try {
      const response = await profileService.getProfile();
      setUser(response.user);
      setUserProjects(response.userProjects);
      setUserReviews(response.userReviews);
      setLoading(false);
    } catch (error) {
      toast.error("Sorry, we couldn't retrieve your profile data. Please try again.");
    }
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUpdate = async (updatedUser) => {
    try {
      const updatedMe = await profileService.editProfile(updatedUser);
      setUser(updatedMe);
      if (updatedMe.authToken) {
        removeToken();
        storeToken(updatedMe.authToken);
        authenticateUser();
        await authService.me();
        setIsEditing(false);
        getProfile();
        toast.success("Profile updated successfully.");
      }
    } catch (error) {
      toast.error("Couldn't update your data. Try again later.");
    }
  };

  const handleDisable = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to disable your account? Your profile won't appear in the search results anymore, but your projects will still be visible. You can re-enable your account by trying to log in again."
    );
    if (confirmation) {
      try {
        await profileService.editStatus({ status: "inactive" });
        removeToken();
        authenticateUser();
        logOutUser();
        toast.success("Account successfully disabled!");
      } catch (error) {
        toast.error("We could not disable your account, try again later.");
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      {loading && <Loading />}
      {!isEditing && user && (
        <>
          <ProfileData user={user} />
          <div className="profile-options">
            <button onClick={handleEdit}>Edit profile</button>
            <button onClick={handleDisable}>Disable account</button>
          </div>
        </>
      )}
      {isEditing && user && (
        <EditProfileData
          user={user}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
        />
      )}
      <div className="profile-projects">
        <h3>Your active projects</h3>
        {userProjects && userProjects.length > 0
          ? userProjects.map((project) => {
              return <ProjectCard project={project} key={`${project._id}1`} />;
            })
          : "You haven't added any project yet."}
      </div>
      <h3>What people think about you</h3>
      <div className="profile-reviews">
        {userReviews && userReviews.length > 0 
          ? userReviews.map((review) => {
              return <ReviewCard review={review} key={`${review._id}1`} />;
            })
          : "You haven't been reviewed by other users yet."}
      </div>
    </div>
  );
}

export default Profile;
