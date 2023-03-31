import projectService from "../../services/projectServices";
import { useState, useEffect } from "react";
import ProjectCard from "../../components/project/ProjectCard";

function Projects() {
  const [projects, setProjects] = useState(null);

  const getProjects = async () => {
    try {
      const response = await projectService.getProjects();
      setProjects(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <h1>Projects</h1>
      {projects
        ? projects.map((project) => {
            return <ProjectCard project={project} key={project._id} />;
          })
        : "There are no projects to be displayed."}
    </>
  );
}

export default Projects;
