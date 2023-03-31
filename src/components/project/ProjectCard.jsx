import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <h4>{project.title}</h4>
      <p>
        <strong>Status: </strong>
        {project.status}
      </p>
      <p>
        <strong>Location: </strong>
        {project.location}
      </p>
      <p>
        <strong>Industry: </strong>
        {project.industry}
      </p>
      <p>
        <strong>Funding needed: </strong>
        {project.fundingNeeded}
      </p>
      <Link to={`/projects/${project._id}`}>See project's description</Link>
    </div>
  );
}

export default ProjectCard;
