import React from "react";

export default function Input({ label, disabled, type = "text", value, onChange, required }) {
    return (
        <label className="form-control w-full">
            {label && (
                <div className="label">
                    <span className="label-text text-sm font-medium">{label}</span>
                </div>
            )}
            <input
                type={type}
                placeholder="Type here"
                className="input input-bordered w-full "
                disabled={disabled}
                value={value}
                onChange={onChange}
                required={required}
                {...(type === "number" && {
                    min: "0",
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    title: "Non-negative integral number"
                })}
            />
        </label>
    );
}
