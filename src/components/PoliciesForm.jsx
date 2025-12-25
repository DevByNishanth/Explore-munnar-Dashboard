import React, { useState } from "react";

const initialPolicies = [
  { key: "General Policies", title: "", description: "" },
  { key: "Prohibited Activities", title: "", description: "" },
  { key: "Property Usage", title: "", description: "" },
  { key: "Payment & Cancellation", title: "", description: "" },
  { key: "Guest Guidelines", title: "", description: "" },
];

const PoliciesForm = ({ setFormData, formData }) => {
  const [policies, setPolicies] = useState(initialPolicies);

  const handleChange = (index, field, value) => {
    const updated = [...policies];
    updated[index][field] = value;
    setPolicies(updated);
    formData.rules = updated
  };
  // console.log("Policies form data : ", formData)

  return (
    <div className="space-y-6">
      <h1 className="text-gray-800 font-medium">Rules and Regulations</h1>
      {policies.map((item, index) => (
        <div
          key={item.key}
          className="border-b border-gray-600 pb-6 flex gap-6"
        >
          {/* Static Key */}
          <div className="w-[30%] font-semibold text-gray-800">{item.key}</div>

          {/* Inputs */}
          <div className="w-[70%] space-y-3">
            <input
              type="text"
              placeholder="Enter title"
              value={item.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              className="w-full border border-gray-400 rounded-md p-3 text-sm"
            />

            <textarea
              rows={3}
              placeholder="Enter description"
              value={item.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              className="w-full border border-gray-400 rounded-md p-3 text-sm"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PoliciesForm;
