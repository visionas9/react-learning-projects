import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <header>
      <Link className="site-logo" to="/">
        Eir Gym
      </Link>
      <div className="right-links">
        <NavLink
          to="/about"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          About
        </NavLink>

        <NavLink
          to="/equipments"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Equipments
        </NavLink>
      </div>
    </header>
  );
}
