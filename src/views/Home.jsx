import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ProjectCard from "../components/project/ProjectCard";
import SearchBar from "../components/search/SearchBar";
import projectService from "../services/projectServices";
import { AuthContext } from "../context/AuthContext";
import landingImage from "../images/landingImage.jpg"

const Home = () => {
  const [projects, setProjects] = useState(null);
  const { isLoggedIn, user } = useContext(AuthContext);
  
  const getRandomProjects = async () => {
    try {
      const response = await projectService.getProjects();
      const randomProjects = response.sort(() => 0.5 - Math.random()).slice(0, 3);
      setProjects(randomProjects);
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    getRandomProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <img src={landingImage} alt="Landing" className="landing-image"/>
      <h1>{user ? `Welcome ${user.firstName}` : null}</h1>
      {isLoggedIn && <SearchBar />}
      {!isLoggedIn && (
        <div>
          <h2>What is investMate?</h2>
          <div className="home-page-articles">
            <article>
              <p>
              InvestMate is the perfect app for anyone looking to invest in
              exciting projects from a range of different industries. With around
              15,050 users from all around the world, our platform connects
              investors with entrepreneurs and helps to turn innovative ideas into
              successful businesses.
              </p>
            </article>
            <article>
              <p>
              We've already helped more than 16,257 projects reach their full
              potential, across 15 different industries, including technology,
              communication, and IT/Tech. Our easy-to-use interface makes it
              simple for investors to browse and invest in projects that match
              their interests and investment goals.
              </p>
            </article>
            <article>
              <p>
              And the best part? InvestMate is completely free, easy to use and
              offers a secure and safe environment for your investments. So
              whether you're a seasoned investor or just getting started,
              InvestMate has everything you need to invest in the future of
              innovative ideas and make a real impact.
              </p>
            </article>
          </div>
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

export default Home;