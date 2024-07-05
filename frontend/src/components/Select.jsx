import React from "react";

export default function Select({ label, options, disabled, value, onChange }) {
    return (
        <label className="form-control w-full">
            {label && (
                <div className="label">
                    <span className="label-text text-sm font-medium">{label}</span>
                </div>
            )}
            <select
                className="select select-bordered w-full truncate"
                value={value}
                disabled={disabled}
                onChange={onChange}
            >
                <option value="">Pick one</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id} className="truncate">{option.label}</option>
                ))}
            </select>
        </label>
    );
}
