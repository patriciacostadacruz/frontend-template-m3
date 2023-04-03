import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import projectService from "../../services/projectServices";
import toast from "react-hot-toast";
import ProjectData from "../../components/project/ProjectData";
import EditProjectData from "../../components/project/EditProjectData";
import { AuthContext } from "../../context/AuthContext";

function Project() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { user } = useContext(AuthContext);
  // only allows project owner to see the edit button
  const isOwner = user && project && user._id === project.owner._id;

  const getProject = async () => {
    try {
      const oneProject = await projectService.getProject(projectId);
      setProject(oneProject);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    getProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    // redirect to confirmation page + then delete project
  };

  const handleMessage = () => {
    // redirect to create conv + message
  };

  const handleUpdate = async (updatedProject) => {
    try {
      await projectService.editProject(projectId, updatedProject);
      setProject(updatedProject);
      setIsEditing(false);
      toast.success("Project data updated successfully.");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      {!isEditing && (
        <>
          <ProjectData project={project} />
          {isOwner && 
          <div>
            <button onClick={handleEdit}>Edit project</button>
            <button onClick={handleDelete}>Delete project</button>
          </div>}
          {!isOwner && 
          <div>
            <button onClick={handleMessage}>Send message</button>
          </div>}
        </>
      )}
      {isEditing && (
        <EditProjectData
          project={project}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
        />
      )}
      {errorMessage ? <p>{errorMessage}</p> : null}
    </>
  );
}  

export default Project;