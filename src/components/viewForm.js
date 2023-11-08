import React, { useState } from "react";

function Viewform({ fields, updateValue }) {
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (fieldId, value) => {
    setInputValues({
      ...inputValues,
      [fieldId]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputValues);
  };

  return (
    <div>
      <h2>View Form</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.id}>
            <label>{field.label}</label>
            <label>({field.type})</label>
            {field.type === "textarea" ? (
              <textarea
                value={inputValues[field.id] || field.value}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
              />
            ) : (
              <input
                type={field.type}
                value={inputValues[field.id] || field.value}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
              />
            )}
            {field.type === "select" && (
              <select
                value={inputValues[field.id] || field.value}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
              >
                {field.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Viewform;
