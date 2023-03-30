import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import projectService from "../services/projectServices";
import ProjectCard from "../components/project/ProjectCard";
import SearchBar from "../components/search/SearchBar";

export default function Home() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [projects, setProjects] = useState(null);
  
  const getRandomProjects = async () => {
    try {
      const response = await projectService.getProjects();
      const randomProjects = response.sort(() => 0.5 - Math.random()).slice(0, 3);
      setProjects(randomProjects);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getRandomProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {user && <p>Hello {user.firstName}</p>}
      {isLoggedIn && <SearchBar />}
      {!isLoggedIn && (
        <div>
          <p>Place to put images and graphs/metrics for non logged in users.</p>
        </div>
      )}
      {projects
        ? projects.map((project) => {
            return <ProjectCard project={project} key={project._id} />;
          })
        : null}
    </div>
  );
}
