import React from "react";
import { FlagIcon } from "react-flag-kit";

function FlagRadio({ country, code, selectedCountry, handleCountryChange }) {
    const id = code.toLowerCase();

    return (
        <li>
            <input
                type="radio"
                id={`country-${id}`}
                name="country"
                value={code}
                className="hidden peer"
                checked={selectedCountry === code}
                onChange={handleCountryChange}
            />
            <label htmlFor={`country-${id}`} className="btn btn-sm inline-flex peer-checked:btn-primary w-full">
                <FlagIcon code={code} size={16} />
                <span className="text-[10px]">{country}</span>
            </label>
        </li>
    );
}

export default FlagRadio;
