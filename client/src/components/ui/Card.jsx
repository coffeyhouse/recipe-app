// src/components/ui/Card.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Card = ({ title, count, link, children }) => {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                {count && <p className="text-2xl font-bold">{count}</p>}
                {children}
                <div className="card-actions justify-end">
                    <Link to={link}>
                        <Button
                            variant='secondary'
                            outline={true}
                        >
                            Manage
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;
