import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
import peopleCount from "../../images/peopleCount.png";

function ProjectData({ project }) {
  // eslint-disable-next-line no-unused-vars
  const { user } = useContext(AuthContext);

  return (
    <div className="project-detail">
      <h2>Project detail</h2>
      {project ? (
        <div>
          <div>
            <h3>{project.title}</h3>
            <p>
              <strong>Added by:</strong>{" "}
              <Link to={`/profile/${project.owner._id}`}>
                {project.owner.firstName} {project.owner.lastName}
              </Link>
            </p>
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
            <strong>Investors:</strong>
            {project.investors.length === 0
              ? "No investors yet."
              : project.investors.map((person) => {
                  return (
                    <img
                      key={`${project._id}${project.investors.length}`}
                      height="40"
                      src={peopleCount}
                      alt="Investors count"
                    />
                  );
                })}
          </p>
        </div>
      ) : (
        "No project to show"
      )}
    </div>
  );
}

export default ProjectData;
