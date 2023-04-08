import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
import peopleCount from "../../images/peopleCount.png";

function ProjectData({ project }) {
  const { user } = useContext(AuthContext);
  const isInvestor = project.investors.some(
    (investor) => investor._id.toString() === user._id.toString()
  );

  const style = {
    height: "70px",
    width: "70px",
    objectFit: "cover",
    borderRadius: "50px",
  };

  return (
    <div className="project-detail">
      <h2>Project detail</h2>
      {project && (
        <div>
          <div>
            <h3>{project.title}</h3>
            <p>
              <strong>Added by:</strong>{" "}
              {user._id === project.owner._id ? (
                <Link to="/profile">
                  <img src={project.owner.image} style={style} alt="Avatar" />
                  {project.owner.firstName} {project.owner.lastName}
                </Link>
              ) : (
                <Link to={`/profile/${project.owner._id}`}>
                  <img src={project.owner.image} style={style} alt="Avatar" />
                  {project.owner.firstName} {project.owner.lastName}
                </Link>
              )}
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
            {project.investors.length === 0 && "No investors yet."}
            {project.investors.map((investor) => {
              return (
                <span key={investor._id}>
                  {isInvestor && user._id === investor._id && (
                    <Link to="/profile">
                      <img src={investor.image} style={style} alt="Avatar" />
                    </Link>
                  )}
                  {isInvestor && user._id !== investor._id && (
                    <Link to={`/profile/${investor._id}`}>
                      <img src={investor.image} style={style} alt="Avatar" />
                    </Link>
                  )}
                  {!isInvestor && (
                    <img height="40" src={peopleCount} alt="Investors count" />
                  )}
                </span>
              );
            })}
          </p>
        </div>
      )}
    </div>
  );
}

export default ProjectData;
