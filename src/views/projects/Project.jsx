import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import ProjectData from "../../components/project/ProjectData";
import EditProjectData from "../../components/project/EditProjectData";
import Loading from "../../components/Loading";
import projectService from "../../services/projectServices";
import indexServices from "../../services/indexServices";
import messengerServices from "../../services/messengerServices";
import profileService from "../../services/profileServices";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import {
  faPenToSquare,
  faTrash,
  faComments,
} from "@fortawesome/free-solid-svg-icons"; 

const Project = () => {
  const [project, setProject] = useState(null);
  const [investors, setInvestors] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isInvestor, setIsInvestor] = useState(null);
  const [loading, setLoading] = useState(false);
  const { projectId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // only allows project owner to see the edit button
  const isOwner = user && project && user._id === project.owner._id;

  const getProject = async () => {
    setLoading(true);
    try {
      const oneProject = await projectService.getProject(projectId);
      setProject(oneProject);
      setLoading(false);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Sorry, we couldn't find this project.");
    }
  };

  const getInvestors = async () => {
    try {
      const usersList = await indexServices.getUsers();
      const investorsList = usersList.filter(user => user.role === "investor" && user.status !== "inactive");
      setInvestors(investorsList);
      setIsInvestor(
        project.investors.some(
          (investor) => investor._id.toString() === user._id.toString()
        )
      );
    } catch (error) {
      setErrorMessage("We could not retrieve the investors.");
    }
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const confirmation = window.confirm("Are you sure you want to delete this project?");
    if (confirmation) {
      try {
        const deletedProject = await projectService.deleteProject(projectId);
        toast.success(`Project named "${deletedProject.title}" deleted successfully.`);
        navigate("/");
      } catch (error) {
        toast.error("We could not delete this project, sorry. Try again later.");
      }
    }
  };

  const handleCreateConversation = async () => {
    const recipientId = project.owner._id;
    try {
      const recipient = await profileService.getOtherUser(recipientId);
      if (recipient.status === "inactive") {
        toast.error("You cannot reach out to this user, this account is disabled or in maintenance.")
      } else {
        const conversation = await messengerServices.createConversation(
          recipientId
        );
        if (conversation.existingConversation) {
          toast.success("You already have a conversation with this user.");
          navigate(`/conversations/${conversation.existingConversation._id}`);
          return;
        } else {
          toast.success(
            "Start exchanging with this user by sending a message."
          );
          navigate(`/messages/${conversation._id}`);
        }
      }
    } catch (error) {
      toast.error(
        "We cannot create this conversation. The user might be inactive."
      );
    }
  };

  const handleUpdate = async (updatedProject) => {
    try {
      const updatedProj = await projectService.editProject(projectId, updatedProject);
      setProject(updatedProj);
      setIsEditing(false);
      getProject();
      toast.success("Project data updated successfully.");
    } catch (error) {
      toast.error("We could not update this project's data, try again later.");
    }
  };

  useEffect(() => {
    getProject();
    getInvestors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!isEditing && project && (
        <>
          <ProjectData
            project={project}
            isOwner={isOwner}
            isInvestor={isInvestor}
          />
          {isOwner && (
            <div className="proj-options">
              <button onClick={handleEdit}>
                <FontAwesomeIcon icon={faPenToSquare} /> Edit project
              </button>
              <button onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} /> Delete project
              </button>
            </div>
          )}
          {!isOwner && (
            <div className="proj-options">
              <button onClick={handleCreateConversation}>
                <FontAwesomeIcon icon={faComments} /> Send message
              </button>
            </div>
          )}
        </>
      )}
      {isEditing && project && (
        <EditProjectData
          project={project}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
          investors={investors}
        />
      )}
      {errorMessage ? <p>{errorMessage}</p> : null}
    </>
  );
}  

export default Project;