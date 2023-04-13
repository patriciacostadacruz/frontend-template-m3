import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loading from "../../components/Loading";
import AddReview from "../../components/profile/AddReview";
import ReviewCard from "../../components/ReviewCard";
import ProjectCard from "../../components/project/ProjectCard";
import profileServices from "../../services/profileServices";
import reviewService from "../../services/reviewServices";
import messengerServices from "../../services/messengerServices";
import linkedin from "../../images/linkedin.png";


const OtherUserProfile = () => {
  const [otherUser, setOtherUser] = useState(null);
  const [otherUserProjects, setOtherUserProjects] = useState(null);
  const [otherUserReviews, setOtherUserReviews] = useState(null);
  const [isRating, setIsRating] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();
  const style = { height: "300px", width: "300px", objectFit: "cover" };

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await profileServices.getOtherUser(userId);
      if (response.error) {
        toast.error(response.error);
        setLoading(false);
        navigate("/users");
        return;
      } else  {
        setOtherUser(response.otherUser);
        setOtherUserProjects(response.userProjects);
        setOtherUserReviews(response.userReviews);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Sorry, we couldn't get this user's profile. It might be disabled or in maintenance.");
      navigate(-1);
    }
  }

  const handleShowReviewForm = () => {
    setIsRating(true);
  };

  const handleCancel = () => {
    setIsRating(false);
  };

  const handleAddReview = async (review) => {
    try {
      await reviewService.addReview(review);
      setIsRating(false);
      getUser();
      toast.success("Review was added successfully.");
    } catch (error) {
      toast.error(error);
    }
  };

   const handleCreateConversation = async () => {
    const recipientId = userId;
     try {
       const conversation = await messengerServices.createConversation(recipientId);
       if (conversation.existingConversation) {
        toast.success("You already have a conversation with this user.");
        navigate(`/conversations/${conversation.existingConversation._id}`);
        return;
       } else {
        toast.success("Start exchanging with this user by sending a message.");
        navigate(`/messages/${conversation._id}`);
       }
     } catch (error) {
       toast.error("We cannot create this conversation. The user might be inactive.");
     }
   };

   useEffect(() => {
     getUser();
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

  return (
    <>
      {loading && <Loading />}
      {otherUser && (
        <>
          <div className="profile-data">
            <img style={style} src={otherUser.image} alt="Avatar" />
            <div className="profile-data-personal">
              <div className="name-linkedin">
                <h4>
                  {otherUser.firstName} {otherUser.lastName}
                </h4>
                {otherUser.linkedIn && (
                  // using anchor to open page in new tab with blank target
                  <a href={otherUser.linkedIn} target="_blank" rel="noreferrer">
                    <img width="30" src={linkedin} alt="Linkedin profile" />
                  </a>
                )}
              </div>
              <p>
                <strong>Email </strong>
                {otherUser.email}
              </p>
              <p>
                <strong>Role </strong>
                {otherUser.role}
              </p>
            </div>
            <div className="profile-data-professional">
              <p>
                <strong>Company </strong>
                {otherUser.company}
              </p>
              <p>
                <strong>Industry </strong>
                {otherUser.industry.map((elem) => {
                  return (
                    <span
                      key={otherUser.industry.indexOf(elem)}
                      className="industry-tag"
                    >
                      {elem}
                    </span>
                  );
                })}
              </p>
              <p>"{otherUser.bio}"</p>
            </div>
          </div>
          <div className="profile-options">
            <button onClick={handleCreateConversation}>Send message</button>
            {!isRating && otherUser && (
              <button onClick={handleShowReviewForm}>Rate user</button>
            )}
          </div>
          {isRating && otherUser && (
            <AddReview
              personRated={otherUser._id}
              onCreation={handleAddReview}
              onCancel={handleCancel}
            />
          )}
          <div className="profile-projects">
            <h3>Projects {otherUser.firstName} is working on</h3>
            {otherUserProjects.length > 0
              ? otherUserProjects.map((project) => {
                  return (
                    <ProjectCard project={project} key={`${project._id}1`} />
                  );
                })
              : "This user has no active projects."}
          </div>
          <h3>Here's what people think about {otherUser.firstName}</h3>
          <div className="profile-reviews">
            {otherUserReviews.length > 0
              ? otherUserReviews.map((review) => {
                  return <ReviewCard review={review} key={`${review._id}1`} />;
                })
              : "This user has no ratings."}
          </div>
        </>
      )}
    </>
  );
}

export default OtherUserProfile;
