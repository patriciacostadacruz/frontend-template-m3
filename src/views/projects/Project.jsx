import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import projectService from "../../services/projectServices";
// import peopleCount from "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";

function Project() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  const getProject = async () => {
    try {
      const oneProject = await projectService.getProject(projectId);
      setProject(oneProject);
      console.log(oneProject)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return (
    <div className="project-detail">
      <h2>Project detail</h2>
      {project ? (
        <div>
          <div>
            <h3>{project.title}</h3>
            <p>Added by: {project.owner.firstName} {project.owner.lastName}</p>
          </div>
          <p><strong>Status:</strong> {project.status}</p>
          <p><strong>Location:</strong> {project.location}</p>
          <p><strong>Funding needed:</strong> {project.findingNeeded}</p>
          <p><strong>Industry: </strong>
            {project.industry.map((elem) => {
              return <span key={project.industry.indexOf(elem)}>{elem}</span>;
            })}</p>
          <p>{project.description}</p>
          <p><strong>Investors:</strong> {project.investors.length}</p>
        </div>
        ) : "No project to show"
      }
    </div> 
  )
}  

export default Project;