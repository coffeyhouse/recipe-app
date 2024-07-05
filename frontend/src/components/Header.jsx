import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {

    const navItems = [
        { to: "/", label: "Home" },
        { to: "/meal-plan/1", label: "Meal plan" },
        { to: "/editor", label: "Recipe editor" },
        { to: "/recipe/0", label: "Recipe details"},
        { to: "/to-do", label: "To-do list"},
    ];

    return (
        <>
            <div className="navbar bg-base-100 shadow z-10 px-6">
                <div className="flex-1">
                    <Link to="/">
                        <a className="text flex gap-2 items-center">                       
                            <span className="font-medium flex gap-1">The<span className="font-bold">Coffey</span>Kitchen</span>
                            <div className="flex justify-center gap-1 absolute mt-7 ml-[35px]">
                                <span className="w-1 h-1 bg-accent rounded-full"></span>
                                <span className="w-1 h-1 bg-secondary rounded-full"></span>
                                <span className="w-1 h-1 bg-primary rounded-full"></span>
                                <span className="w-1 h-1 bg-accent rounded-full"></span>
                                <span className="w-1 h-1 bg-secondary rounded-full"></span>
                                <span className="w-1 h-1 bg-primary rounded-full"></span>
                            </div>
                        </a>
                    </Link>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
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