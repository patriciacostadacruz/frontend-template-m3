import projectService from "../../services/projectServices";
import { useState, useEffect } from "react";
import ProjectCard from "../../components/project/ProjectCard";
import toast from "react-hot-toast";

function Projects() {
  const [projects, setProjects] = useState(null);
  const [sortBy, setSortBy] = useState("title");
  const [sortDirection, setSortDirection] = useState("title");

  const getProjects = async () => {
    try {
      const response = await projectService.getProjects();
      setProjects(response);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const sortProjects = (projects) => {
    const sortedProjects = [...projects];
    if (sortBy === "date") {
      sortedProjects.sort((a, b) =>
        sortByDate(a.createdAt, b.createdAt, sortDirection)
      );
    } else {
      sortedProjects.sort((a, b) =>
        sortByTitle(a.title, b.title, sortDirection)
      );
    }
    return sortedProjects;
  };


  const sortByDate = (a, b, direction) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    if (direction === "asc") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  };

  const sortByTitle = (a, b, direction) => {
    if (direction === "asc") {
      return a.localeCompare(b);
    } else {
      return b.localeCompare(a);
    }
  };

  const handleSortChange = (e) => {
    const value = e.target.value.split("_");
    setSortBy(value[0]);
    setSortDirection(value[1]);
  };

  return (
    <>
      <h1>Projects</h1>
      <div>
      <label>Sort by:</label>
      <select onChange={handleSortChange} value={`${sortBy}_${sortDirection}`}>
        <option value="title_asc">Title (A-Z)</option>
        <option value="title_desc">Title (Z-A)</option>
        <option value="date_asc">Creation date (oldest first)</option>
        <option value="date_desc">Creation date (newest first)</option>
      </select>
    </div>
      {projects
        ? sortProjects(projects).map((project) => {
            return <ProjectCard project={project} key={project._id} />;
          })
        : "There are no projects to be displayed."}
    </>
  );
}

export default Projects;
