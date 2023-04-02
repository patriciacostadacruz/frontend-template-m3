import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import projectService from "../../services/projectServices";
import toast from "react-hot-toast";
import ProjectData from "../../components/project/ProjectData";

function Project() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  const getProject = async () => {
    try {
      const oneProject = await projectService.getProject(projectId);
      setProject(oneProject);
      console.log(oneProject)
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    getProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProjectData project={project}/>
  );
}  

export default Project;