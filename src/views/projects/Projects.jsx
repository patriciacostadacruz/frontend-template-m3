import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProjectCard from "../../components/project/ProjectCard";
import Loading from "../../components/Loading";
import projectService from "../../services/projectServices";

const Projects = () => {
  const [projects, setProjects] = useState(null);
  const [sortBy, setSortBy] = useState("title");
  const [sortDirection, setSortDirection] = useState("title");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { search } = useLocation();

  const getProjects = async () => {
    setLoading(true);
    try {
      // gets params form URL path
      const params = new URLSearchParams(search);
      const response = await projectService.getProjects(
        params.get("search"),
        params.get("industry")
      );
      setProjects(response);
      setLoading(false);
    } catch (error) {
      setErrorMessage("Sorry we couldn't retrieve any project.");
    }
  };

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

  useEffect(() => {
    getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Projects</h1>
      {loading && <Loading />}
      <div>
        <label><strong>Sort by </strong></label>
        <select
          onChange={handleSortChange}
          value={`${sortBy}_${sortDirection}`}
        >
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
        : null}
      {errorMessage ? <p>{errorMessage}</p> : null}
    </>
  );
}

export default Projects;
