import { useEffect, useState, useContext, useRef } from "react";
import toast from "react-hot-toast";
import ProfileData from "../../components/profile/ProfileData";
import EditProfileData from "../../components/profile/EditProfileData";
import Loading from "../../components/Loading";
import ProjectCard from "../../components/project/ProjectCard";
import ReviewCard from "../../components/ReviewCard";
import profileService from "../../services/profileServices";
import authService from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Pie } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUserSlash } from "@fortawesome/free-solid-svg-icons"; 

Chart.register(CategoryScale);

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userProjects, setUserProjects] = useState(null);
  const [userReviews, setUserReviews] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [chartData, setChartData] = useState({datasets: []});
  const chartContainer = useRef(null);
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
      setErrorMessage("We could not get your profile.");
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userProjects && userProjects.length > 0 && chartContainer.current) {
      const statuses = [
        ...new Set(userProjects.map((project) => project.status)),
      ];
      const data = statuses.map(
        (status) =>
          userProjects.filter((project) => project.status === status).length
      );
      setChartData({
        labels: statuses,
        datasets: [
          {
            label: "Project by status",
            data,
            backgroundColor: [
              "#3d8dae",
              "#df8453",
              "#a1db9b",
              "#e4a9a8",
              "#accfcb",
              "#dbad4a",
            ],
            borderWidth: 0,
          },
        ],
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProjects]);

  return (
    <div>
      {loading && <Loading />}
      {!isEditing && user && (
        <>
          <ProfileData user={user} />
          <div className="profile-options">
            <button onClick={handleEdit}>
              <FontAwesomeIcon icon={faPenToSquare} /> Edit profile
            </button>
            <button onClick={handleDisable}>
              <FontAwesomeIcon icon={faUserSlash} /> Disable account
            </button>
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
      <hr />
      <h3>Your active projects</h3>
      <div className="projects-section">
        <div className="chart-container">
          {userProjects && chartData ? (
            <>
              <Pie
                className="pie"
                ref={chartContainer}
                data={chartData}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Projects by status",
                      fontsize: 20,
                    },
                  },
                }}
              />
            </>
          ) : (
            "No data to create chart."
          )}
        </div>
        <div className="projects-list">
          {userProjects ? (
            <>
              {userProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </>
          ) : (
            "No projects top show."
          )}
        </div>
      </div>
      <hr />
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
