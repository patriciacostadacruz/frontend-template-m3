import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import projectService from "../../services/projectServices";

function AddProject() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
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
          <textarea name="description" value={formData.description} onChange={handleInputChange} />
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
          </div>
        </div>
        <button type="submit">Create project</button>
      </form>
    </div>
  );
}

export default AddProject;