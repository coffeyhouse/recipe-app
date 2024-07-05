// src/components/SideBar.jsx

import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaList, FaSitemap, FaLeaf, FaBook, FaUser, FaUtensils, FaCalendarAlt } from "react-icons/fa";

const menuItems = [
  { title: "Ingredients", isTitle: true },
  { title: "Categories", link: "/admin/manage-categories", Icon: FaList },
  { title: "Sub-categories", link: "/admin/manage-sub-categories", Icon: FaSitemap },
  { title: "Ingredients", link: "/admin/manage-ingredients", Icon: FaLeaf },
  { title: "Recipes", isTitle: true },
  { title: "Recipes", link: "/admin/manage-recipes", Icon: FaUtensils },
  { title: "Authors", link: "/admin/manage-authors", Icon: FaUser },
  { title: "Recipe books", link: "/admin/manage-recipe-books", Icon: FaBook },
  { title: "Meal Plans", link: "/admin/manage-meal-plans", Icon: FaCalendarAlt },
];

const MenuItem = ({ item }) => {
  if (item.isTitle) {
    return <li className="menu-title">{item.title}</li>;
  }

  const { Icon } = item;

  return (
    <li>
      <NavLink to={item.link} className={({ isActive }) => (isActive ? "active" : "")}>
        <Icon className="inline mr-2" />
        {item.title}
      </NavLink>
    </li>
  );
};

export default function SideBar() {
  return (
    <aside className="sticky top-0 overflow-y-auto w-60 bg-base-200 p-4 min-w-60">
      <ul className="menu px-0 gap-1">
        {menuItems.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </ul>
    </aside>
  );
}
