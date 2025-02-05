import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Fitness Scheduling App</Link>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="navbar-link">Users</Link>
        </li>
        <li>
          <Link to="/classes" className="navbar-link">Classes</Link>
        </li>
        <li>
          <Link to="/bookings" className="navbar-link">Bookings</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;