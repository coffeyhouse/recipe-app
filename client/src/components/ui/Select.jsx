// src/components/ui/Select.jsx
import React from 'react';

const Select = ({ label, value, onChange, required, options, defaultOption, disabled }) => {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select
        className="select select-bordered"
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      >
        <option value="" disabled>{defaultOption}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
