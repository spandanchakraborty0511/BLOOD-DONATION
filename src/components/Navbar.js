import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <h1>🩸 Blood Donation Management System</h1>
      <nav>
        <Link to="/">Donor</Link>
        <Link to="/hospital">Hospital</Link>
        <Link to="/admin">Admin</Link>
      </nav>
    </header>
  );
};

export default Navbar;
