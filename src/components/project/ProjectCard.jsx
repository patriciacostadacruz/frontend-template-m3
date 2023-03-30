function projectData({ project }) {
  return (
    <div classname="project-card">
      <h2>{project.title}</h2>
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
      <p><strong>Project description: </strong>{project.description}</p>
      <p>Investors: {project.investors.length}</p>
    </div>
  );
}

export default projectData;
