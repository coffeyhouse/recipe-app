// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar justify-between bg-base-300">
      <a className="btn btn-ghost text-lg">
        <img alt="Logo" src="../vite.svg" className="w-4" />
        Recipe App
      </a>
      <div className="dropdown dropdown-end sm:hidden">
        <button className="btn btn-ghost">
          <i className="fa-solid fa-bars text-lg"></i>
        </button>

        <ul tabIndex="0" className="dropdown-content menu z-[1] bg-base-200 p-6 rounded-box shadow w-56 gap-2">
          <li><a>About</a></li>
          <li><a>Pricing</a></li>
          <li><a>Blog</a></li>
          <li><a>Contact</a></li>
          <a className="btn btn-sm btn-primary">Log in</a>
        </ul>
      </div>
      <div className="hidden sm:flex gap-2">
        <ThemeSwitcher />       
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="btn btn-primary btn-sm"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/register" className="btn btn-ghost btn-sm">Register</Link>
            <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
