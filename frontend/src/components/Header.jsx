import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export default function Header() {

    const navItems = [
        { to: "/", label: "Home" },
        { to: "/recipe-search", label: "Recipe search" },
        { to: "/meal-plan/1", label: "Meal plan (ID: 1)" },
        { to: "/editor", label: "Recipe editor (new)" },
        { to: "/editor/1", label: "Recipe editor (ID: 1)" },
        { to: "/recipe/1", label: "Recipe details (ID: 1)" },
        { to: "/ingredient-editor/1", label: "Ingredient editor (ID: 1)" },
        { to: "/meal-plans", label: "Meal plans" },
        { to: "/to-do", label: "To-do list" },
    ];

    return (
        <>
            <div className="navbar bg-base-100 shadow z-10 px-6">
                <div className="flex-1">
                    <Link to="/">
                        <a className="text flex gap-1 items-start font-medium mt-1">
                            <span>The</span>
                            <span className="flex flex-col font-bold">
                                Coffey
                                <div className="flex justify-center gap-1">
                                <span className="w-1 h-1 bg-accent rounded-full"></span>
                                <span className="w-1 h-1 bg-secondary rounded-full"></span>
                                <span className="w-1 h-1 bg-primary rounded-full"></span>
                                <span className="w-1 h-1 bg-accent rounded-full"></span>
                                <span className="w-1 h-1 bg-secondary rounded-full"></span>
                                <span className="w-1 h-1 bg-primary rounded-full"></span>
                            </div>
                            </span>
                            <span>Kitchen</span>                            
                        </a>
                    </Link>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <FaBars />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                {navItems.map((item, index) => (
                                    <NavLink key={index} to={item.to}>
                                        {item.label}
                                    </NavLink>
                                ))}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}