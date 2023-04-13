import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/projects/${project._id}`}>
      <div className="project-card">
        <h4>{project.title}</h4>
        <p>
          <strong>Location </strong>
          {project.location}
        </p>
        <p>
          <strong>Industry </strong>
          {project.industry.map((elem) => {
            return (
              <span key={project.industry.indexOf(elem)} className="industry-tag">
                {elem}
              </span>
            );
          })}
        </p>
        <p>
          <strong>Funding needed </strong>
          {project.fundingNeeded}
        </p>
      </div>
    </Link>
  );
}

export default ProjectCard;
