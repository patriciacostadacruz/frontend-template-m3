import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import projectService from "../services/projectServices";
import ProjectCard from "../components/project/ProjectCard";

export default function Home() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {user && <p>Hello {user.firstName}</p>}
      {projects
        ? projects.map((project) => {
            return <ProjectCard project={project} key={project._id} />;
          })
        : null}
    </div>
  );
}
