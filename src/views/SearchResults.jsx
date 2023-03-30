import projectService from "../services/projectServices";
import { useState, useEffect } from "react";
import ProjectCard from "../components/project/ProjectCard";
import UserCard from "../components/project/UserCard";

function SearchResults() {
  const [projects, setProjects] = useState(null);
  const [users, setUsers] = useState(null);

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
      {projects && <h1>Projects</h1>}
      {users && <h1>Users</h1>}
      {projects && users && <h1>Projects and users</h1>}
      {projects
        ? projects.map((project) => {
            return <ProjectCard project={project} key={project._id} />;
          })
        : null}
      {users
        ? users.map((user) => {
            return <UserCard user={user} key={user._id} />;
          })
        : null}
    </>
  );
}

export default SearchResults;
