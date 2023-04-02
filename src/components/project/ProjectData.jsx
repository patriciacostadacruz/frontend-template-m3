import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

function ProjectData({ project }) {
  const { user } = useContext(AuthContext);

  return (
    <div className="project-detail">
      <h2>Project detail</h2>
      {project ? (
        <div>
          <div>
            <h3>{project.title}</h3>
            {/* <p>
              <strong>Added by:</strong> {project.owner.firstName}{" "}
              {project.owner.lastName}
            </p> */}
          </div>
          <p>
            <strong>Status:</strong> {project.status}
          </p>
          <p>
            <strong>Location:</strong> {project.location}
          </p>
          <p>
            <strong>Funding needed:</strong> {project.fundingNeeded}
          </p>
          <p>
            <strong>Industry: </strong>
            {project.industry.map((elem) => {
              return <span key={project.industry.indexOf(elem)}>{elem}</span>;
            })}
          </p>
          <p>{project.description}</p>
          <p>
            <strong>Investors:</strong> {project.investors.length}
          </p>
        </div>
      ) : (
        "No project to show"
      )}
      {/* {user._id !== project.owner._id && (
        <Link to={``}>Contact {project.owner.firstName}</Link>
      )} */}
    </div>
  );
}

export default ProjectData;
