import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import peopleCount from "../../images/peopleCount.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMagnifyingGlassDollar, faIndustry, faSpinner } from "@fortawesome/free-solid-svg-icons"; 

const ProjectData = ({ project, isOwner, isInvestor }) => {
  const { user } = useContext(AuthContext);
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
        <div className="proj-container">
          <div className="project-intro">
            <h3>{project.title}</h3>
            <p>
              <strong>Added by</strong>{" "}
              {isOwner ? (
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
          <div className="project-info">
            <div className="project-info-section">
              <p>
                <strong>
                  <FontAwesomeIcon icon={faSpinner} /> Status{" "}
                </strong>{" "}
                {project.status}
              </p>
              <p>
                <strong>
                  <FontAwesomeIcon icon={faLocationDot} /> Location{" "}
                </strong>{" "}
                {project.location}
              </p>
              <p>
                <strong>
                  <FontAwesomeIcon icon={faMagnifyingGlassDollar} /> Funding
                  needed{" "}
                </strong>{" "}
                {project.fundingNeeded}
              </p>
              <p>
                <strong>
                  <FontAwesomeIcon icon={faIndustry} /> Industry{" "}
                </strong>
                {project.industry.map((elem) => {
                  return (
                    <span
                      key={project.industry.indexOf(elem)}
                      className="industry-tag"
                    >
                      {elem}
                    </span>
                  );
                })}
              </p>
              <p>
                <strong>Investors</strong>{" "}
                {project.investors.length === 0 && "No investors yet."}
                {project.investors.map((investor) => {
                  return (
                    <span key={investor._id}>
                      {(isOwner || isInvestor) && user._id === investor._id && (
                        <Link to="/profile">
                          <img
                            src={investor.image}
                            style={style}
                            alt="Avatar"
                          />
                        </Link>
                      )}
                      {(isOwner || isInvestor) && user._id !== investor._id && (
                        <Link to={`/profile/${investor._id}`}>
                          <img
                            src={investor.image}
                            style={style}
                            alt="Avatar"
                          />
                        </Link>
                      )}
                      {!isInvestor && !isOwner && (
                        <img
                          height="40"
                          src={peopleCount}
                          alt="Investors count"
                        />
                      )}
                    </span>
                  );
                })}
              </p>
            </div>
            <hr />
            <div className="project-info-section">
              <p>{project.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectData;
