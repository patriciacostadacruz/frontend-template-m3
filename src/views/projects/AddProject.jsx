import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import projectService from "../../services/projectServices";

function AddProject() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showFunding, setShowFunding] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    status: "",
    location: "",
    description: "",
    industry: [],
    fundingNeeded: ""
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleStatusChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };

  const handleSelectChange = (e) => {
    const options = e.target.options;
    const values = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    setFormData((prev) => ({
      ...prev,
      industry: values,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProject = await projectService.createProject({
        ...formData,
        owner: user._id,
        investors: [],
      });
      navigate(`/projects/${newProject._id}`);
    } catch (error) {
      toast.error("Error creating project, please review the form and ensure you have added all the fields needed.");
    }
  };

  const handleToggleFunding = () => {
    setShowFunding(!showFunding);
  };

  return (
    <div>
      <h2>Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Status</label>
          <select value={formData.status} onChange={handleStatusChange}>
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="initiation">Initiation</option>
            <option value="planning">Planning</option>
            <option value="execution">Execution</option>
            <option value="on hold">On hold</option>
            <option value="closure stage">Closure stage</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            column="30"
            rows="10"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Add your project description with as many details as you wish to share with potential investors."
          />
        </div>
        <div>
          <label>Industry</label>
          <select
            value={formData.industry}
            onChange={handleSelectChange}
            multiple
          >
            <option value="">-- Select an option --</option>
            <option value="All">All</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Chems and materials">Chems and materials</option>
            <option value="Communication">Communication</option>
            <option value="Construction">Construction</option>
            <option value="Consumer goods and retail">
              Consumer goods and retail
            </option>
            <option value="Consumer services">Consumer services</option>
            <option value="Energy and environment">
              Energy and environment
            </option>
            <option value="Financial services">Financial services</option>
            <option value="Infrastructures">Infrastructures</option>
            <option value="Life science">Life science</option>
            <option value="Real estate">Real estate</option>
            <option value="Transportation">Transportation</option>
            <option value="Digital mark">Digital mark</option>
            <option value="IT/Tech">IT/Tech</option>
            <option value="Electronics">Electronics</option>
            <option value="Education">Education</option>
            <option value="Food and beverage">Food and beverage</option>
            <option value="Other">Other</option>
          </select>
          <div>
            <label>Funding needed</label>
            <select
              name="fundingNeeded"
              value={formData.fundingNeeded}
              onChange={handleInputChange}
            >
              <option value="">Select funding</option>
              <option value="pre-seed">Pre-seed</option>
              <option value="angel">Angel</option>
              <option value="seed">Seed</option>
              <option value="serie A, B or C">Serie A, B or C</option>
              <option value="none">None</option>
            </select>
            {!showFunding && (
              <button onClick={handleToggleFunding}>
                Read more about funding
              </button>
            )}
            {showFunding && (
              <>
                <button onClick={handleToggleFunding}>
                  Hide funding section
                </button>
                <p>
                  In the context of startups and entrepreneurship, funding refers to
                  the process of raising money to finance a new business or project.
                  <br />
                  Pre-seed funding typically involves small amounts of capital
                  raised from friends and family, or from the founders' own savings.
                  This funding is usually used to develop an idea into a viable
                  business plan and prototype. <br />
                  Angel funding is usually the first external funding raised by a
                  startup, and comes from individual investors, or groups of
                  investors, who believe in the potential of the business. This
                  funding can range from tens of thousands to a few hundred thousand
                  dollars, and is usually used to build out a product and start
                  generating revenue. <br />
                  Seed funding is the next stage of funding, and typically comes
                  from venture capital firms or angel investors. Seed funding can
                  range from a few hundred thousand dollars to a few million
                  dollars, and is usually used to scale the business and grow the
                  team. <br />
                  Series A, B, and C funding rounds are later-stage funding rounds
                  for startups that have already achieved significant growth and
                  revenue. Series A funding usually ranges from $2-15 million,
                  Series B from $10-60 million, and Series C from $30-100 million or
                  more. These funding rounds are used to fuel continued growth,
                  expand into new markets, and potentially prepare for an IPO or
                  acquisition.
                </p>
              </>
            )}
          </div>
        </div>
        <button type="submit">Create project</button>
      </form>
    </div>
  );
}

export default AddProject;