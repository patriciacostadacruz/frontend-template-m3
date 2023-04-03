import { useState } from "react";

function EditProjectData({ project, onUpdate, onCancel }) {
  const [formState, setFormState] = useState({
    title: project.title,
    status: project.status,
    location: project.location,
    fundingNeeded: project.fundingNeeded,
    industry: project.industry,
    description: project.description,
  });

  const handleInputChange = (e) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit project</h2>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formState.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Status</label>
        <select
          name="status"
          value={formState.status}
          onChange={handleInputChange}
        >
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
          value={formState.location}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Funding needed</label>
        <select
          name="fundingNeeded"
          value={formState.fundingNeeded}
          onChange={handleInputChange}
        >
          <option value="pre-seed">Pre-seed</option>
          <option value="angel">Angel</option>
          <option value="seed">Seed</option>
          <option value="serie A, B or C">Serie A, B or C</option>
          <option value="none">None</option>
        </select>
      </div>
      <div>
        <label>Industry</label>
        <select
          name="industry"
          value={formState.industry}
          onChange={handleInputChange}
          multiple
        >
          <option value="">-- Select an option --</option>
          <option value="All" selected={formState.industry === "All"}>
            All
          </option>
          <option
            value="Agriculture"
            selected={formState.industry.includes("Agriculture")}
          >
            Agriculture
          </option>
          <option
            value="Chems and materials"
            selected={formState.industry.includes("Chems and materials")}
          >
            Chems and materials
          </option>
          <option
            value="Communication"
            selected={formState.industry.includes("Communication")}
          >
            Communication
          </option>
          <option
            value="Construction"
            selected={formState.industry.includes("Construction")}
          >
            Construction
          </option>
          <option
            value="Consumer goods and retail"
            selected={formState.industry.includes("Consumer goods and retail")}
          >
            Consumer goods and retail
          </option>
          <option
            value="Consumer services"
            selected={formState.industry.includes("Consumer services")}
          >
            Consumer services
          </option>
          <option
            value="Energy and environment"
            selected={formState.industry.includes("Energy and environment")}
          >
            Energy and environment
          </option>
          <option
            value="Financial services"
            selected={formState.industry.includes("Financial services")}
          >
            Financial services
          </option>
          <option
            value="Infrastructures"
            selected={formState.industry.includes("Infrastructures")}
          >
            Infrastructures
          </option>
          <option
            value="Life science"
            selected={formState.industry.includes("Life science")}
          >
            Life science
          </option>
          <option
            value="Real estate"
            selected={formState.industry.includes("Real estate")}
          >
            Real estate
          </option>
          <option
            value="Transportation"
            selected={formState.industry.includes("Transportation")}
          >
            Transportation
          </option>
          <option
            value="Digital mark"
            selected={formState.industry.includes("Digital mark")}
          >
            Digital mark
          </option>
          <option
            value="IT/Tech"
            selected={formState.industry.includes("IT/Tech")}
          >
            IT/Tech
          </option>
          <option
            value="Electronics"
            selected={formState.industry.includes("Electronics")}
          >
            Electronics
          </option>
          <option
            value="Education"
            selected={formState.industry.includes("Education")}
          >
            Education
          </option>
          <option
            value="Food and beverage"
            selected={formState.industry.includes("Food and beverage")}
          >
            Food and beverage
          </option>
          <option value="Other" selected={formState.industry.includes("Other")}>
            Other
          </option>
        </select>
      </div>
      <div>
        <label>Description:</label>
        <textarea
          column="30"
          rows="10"
          name="description"
          value={formState.description}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Save changes</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default EditProjectData;
