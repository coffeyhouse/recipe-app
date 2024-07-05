import React from "react";
import classNames from 'classnames';

const colorClasses = {
    base: {
        bg: 'bg-base-100',
        text: 'text-base-content'
    },
    primary: {
        bg: 'bg-primary',
        text: 'text-primary-content'
    },
    secondary: {
        bg: 'bg-secondary',
        text: 'text-secondary-content'
    }
    // Add more colors as needed
};

export default function Card({ children, color = 'base', className }) {
    const colors = colorClasses[color] || colorClasses.base;

    return (
        <div className={classNames("card w-full shadow-xl", colors.bg, colors.text, className)}>
            <div className="card-body p-3">
                {children}
            </div>
        </div>
    );
}
