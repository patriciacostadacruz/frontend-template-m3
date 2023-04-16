import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMagnifyingGlassDollar, faIndustry } from "@fortawesome/free-solid-svg-icons";

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/projects/${project._id}`}>
      <div className="project-card">
        <h4>{project.title}</h4>
        <p>
          <strong>
            <FontAwesomeIcon icon={faLocationDot} /> Location{" "}
          </strong>
          {project.location}
        </p>
        <p>
          <strong>
            <FontAwesomeIcon icon={faIndustry} /> Industry{" "}
          </strong>
          {project.industry.map((elem) => {
            return (
              <div>
                <span
                  key={project.industry.indexOf(elem)}
                  className="industry-tag"
                >
                  {elem}
                </span>
                <br/>
              </div>
            );
          })}
        </p>
        <p>
          <strong>
            <FontAwesomeIcon icon={faMagnifyingGlassDollar} /> Funding needed{" "}
          </strong>
          {project.fundingNeeded}
        </p>
      </div>
    </Link>
  );
}

export default ProjectCard;
