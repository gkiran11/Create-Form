import React, { useState } from "react";
import ViewForm from "./viewForm";

function CreateForms() {
  const [fields, setFields] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [viewData, setViewData] = useState(false);

  const addField = () => {
    setFields([
      ...fields,
      { id: nextId, type: "text", label: "", options: [] },
    ]);
    setNextId(nextId + 1);
  };

  const handleInputChange = (id, name, value) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, [name]: value } : field
    );
    setFields(updatedFields);
  };

  const handleTypeChange = (id, type) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, type, options: [] } : field
    );
    setFields(updatedFields);
  };

  const addOption = (id, option) => {
    const updatedFields = fields.map((field) =>
      field.id === id
        ? { ...field, options: [...field.options, option] }
        : field
    );
    setFields(updatedFields);
  };

  const handleViewData = () => {
    setViewData(true);
  };

  return (
    <div>
      <form>
        {fields.map((field) => (
          <div key={field.id}>
            <label>
              Label:
              <input
                type="text"
                value={field.label}
                onChange={(e) =>
                  handleInputChange(field.id, "label", e.target.value)
                }
              />
            </label>
            <select
              value={field.type}
              onChange={(e) => handleTypeChange(field.id, e.target.value)}
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
              <option value="textarea">Textarea</option>{" "}
              <option value="select">Select</option>
            </select>
            {field.type === "select" && (
              <div>
                <label>
                  New Option:
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) =>
                      handleInputChange(field.id, "value", e.target.value)
                    }
                  />
                </label>
                <button
                  type="button"
                  onClick={() => addOption(field.id, field.value)}
                >
                  Add Option
                </button>
                <ul>
                  {field.options.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}{" "}
                </ul>
              </div>
            )}
            {field.type === "textarea" && (
              <div>
                <label>Textarea:</label>
                <textarea
                  value={field.value}
                  onChange={(e) =>
                    handleInputChange(field.id, "value", e.target.value)
                  }
                />
              </div>
            )}
          </div>
        ))}
        <button type="button" onClick={addField}>
          Add Field
        </button>
        <button type="button" onClick={handleViewData}>
          Create Form
        </button>
      </form>

      {viewData && <ViewForm fields={fields} />}
    </div>
  );
}

export default CreateForms;
