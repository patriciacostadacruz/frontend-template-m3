import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import projectService from "../../services/projectServices";

function Project() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  const getProject = async () => {
    try {
      const oneProject = await projectService.getProject(projectId);
      setProject(oneProject);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return (
    <div className="project-detail">
      <h2>{project.title}</h2>
    </div>
  );
}

export default Project;
