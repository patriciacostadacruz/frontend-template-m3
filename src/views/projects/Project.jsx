// eslint-disable-next-line no-unused-vars
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import projectService from "../../services/projectServices";
import toast from "react-hot-toast";
import ProjectData from "../../components/project/ProjectData";
import EditProjectData from "../../components/project/EditProjectData";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading";
import indexServices from "../../services/indexServices";

function Project() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [investors, setInvestors] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // only allows project owner to see the edit button
  const isOwner = user && project && user._id === project.owner._id;

  const getProject = async () => {
    setLoading(true);
    try {
      const oneProject = await projectService.getProject(projectId);
      setProject(oneProject);
      setErrorMessage(null);
      setLoading(false);
    } catch (error) {
      setErrorMessage("Sorry, we couldn't find this project.");
    }
  };

  const getInvestors = async () => {
    try {
      const usersList = await indexServices.getUsers();
      const investorsList = usersList.filter(user => user.role === "investor" && user.status !== "inactive");
      setInvestors(investorsList);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProject();
    getInvestors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        toast.error("We could not deete this project, sorry. Try again later.");
      }
    }
  };

  const handleMessage = () => {
    // redirect to create conv + message
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

  return (
    <>
      {loading && <Loading />}
      {!isEditing && project && (
        <>
          <ProjectData project={project} />
          {isOwner && (
            <div>
              <button onClick={handleEdit}>Edit project</button>
              <button onClick={handleDelete}>Delete project</button>
            </div>
          )}
          {!isOwner && (
            <div>
              <button onClick={handleMessage}>Send message</button>
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