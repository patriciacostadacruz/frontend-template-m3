import projectService from "../services/projectServices";
import { useState, useEffect } from "react";
import ProjectCard from "../components/project/ProjectCard";

function SearchResults({ children }) {
  const [projects, setProjects] = useState(null);

  const getProjects = async () => {
    try {
      const response = await projectService.getProjects();
      setProjects(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      {projects ? (projects.map((project) => {
        return <ProjectCard project={project} key={project._id} />;
        })
      ) : null}
    </>
  );
}

export default SearchResults;
