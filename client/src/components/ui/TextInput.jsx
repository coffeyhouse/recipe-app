import React from 'react';

const TextInput = ({ label, type = 'text', value, onChange, required = false, placeholder = '', className = 'input input-bordered', min, max }) => {
  return (
    <label className="form-control">
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <input
        type={type}
        className={className}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
      />
    </label>
  );
};

export default TextInput;
