import React, { useContext, useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import projectService from "../services/projectServices";
import ProjectCard from "../components/project/ProjectCard";
import SearchBar from "../components/search/SearchBar";
const landingImage =
  "https://cloudinary.hbs.edu/hbsit/image/upload/s--EmT0lNtW--/f_auto,c_fill,h_375,w_750,/v20200101/6978C1C20B650473DD135E5352D37D55.jpg";

export default function Home() {
  const { isLoggedIn, user } = useContext(AuthContext);
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
      <img src={landingImage} alt="Landing" />
      <h1>Welcome {user ? user.firstName : null}</h1>
      {isLoggedIn && <SearchBar />}
      {!isLoggedIn && (
        <div>
          <h3>What is investMate?</h3>
          <article>
            InvestMate is the perfect app for anyone looking to invest in
            exciting projects from a range of different industries. With around
            15,050 users from all around the world, our platform connects
            investors with entrepreneurs and helps to turn innovative ideas into
            successful businesses.
          </article>
          <article>
            We've already helped more than 16,257 projects reach their full
            potential, across 15 different industries, including technology,
            communication, and IT/Tech. Our easy-to-use interface makes it
            simple for investors to browse and invest in projects that match
            their interests and investment goals.
          </article>
          <article>
            And the best part? InvestMate is completely free, easy to use and offers a secure and safe environment for your investments. So whether you're a seasoned investor or just getting started, InvestMate has everything you need to invest in the future of innovative ideas and
            make a real impact.
          </article>
        </div>
      )}
      <h3>Active projects</h3>
      {projects
        ? projects.map((project) => {
            return <ProjectCard key={project._id} project={project} />;
          })
        : null}
    </div>
  );
}
